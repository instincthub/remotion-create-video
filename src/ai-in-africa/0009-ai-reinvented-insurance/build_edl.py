#!/usr/bin/env python3
"""
Radio-edit EDL generator for 0009-ai-reinvented-insurance.

Input:
  - KEEP_SPANS below: coarse [start, end] wall-clock-second ranges, each the
    BEST take of a line (flubbed retakes already excluded by choosing ranges).
  - /tmp/silences.txt: ffmpeg silencedetect output (the real speech/silence map).

Process:
  - For each keep span, trim its edges inward to real speech, then split it at
    every internal silence longer than SPLIT_MIN, dropping the dead air. This is
    a true jump-cut radio edit: only speech survives, joins land on silence.

Output:
  - edl.json: flat list of source segments {start,end,label,section,broll}
  - /tmp/roughcut_filter.txt: ffmpeg select/aselect expression for a fast preview
"""
import json
import re

FPS = 30
SPLIT_MIN = 0.45   # silences longer than this are cut out
EDGE_PAD = 0.06    # keep a sliver of lead/tail around each speech chunk
MIN_CHUNK = 0.30   # discard speech slivers shorter than this (clicks/breaths)

# (start_sec, end_sec, section, label, broll_key_or_None)
# Times are wall-clock seconds = SRT timestamp - 3600. Best take per line.
KEEP_SPANS = [
    (0.000,   9.544, "insurance", "Now let's talk about insurance. Insurance is the sector where AI is changing the customer experience most visibly.", None),
    (13.820, 19.236, "insurance", "Two companies are setting the pace. The first is Naked Insurance in South Africa.", None),
    (20.125, 26.910, "insurance", "Naked uses machine learning for risk pricing and computer vision for damage assessment.", None),
    (28.003, 29.994, "insurance", "A user gets binding car", None),
    (40.300, 48.187, "insurance", "insurance quotes in under 90 seconds from their phone, with no human agent.", "phone_quote"),
    (49.206, 66.600, "insurance", "In January 2025, Naked closed the largest insurance raise in African history at 38 million dollars.", "raise"),
    # Editor note 15-21: every "November ... inside ChatGPT" take is garbled
    # ("chargibility") and none is clean — cut the whole claim. The clean
    # payoff line below carries the ChatGPT integration; visuals show ChatGPT.
    (110.900, 117.500, "insurance", "You can now ask ChatGPT for an insurance quote, and Naked will price it for you.", "chatgpt"),
    (118.600, 122.900, "insurance", "The second is Pineapple, also South Africa.", None),
    (132.000, 139.100, "insurance", "Pineapple uses image recognition to assess damage and machine learning for dynamic pricing.", None),
    (150.100, 162.100, "insurance", "They partner with Old Mutual on telematics-based insurance, where careful drivers get up to 30 percent of their premium back at the end of the year.", "telematics"),
    (163.590, 209.480, "insurance", "What both companies show is that insurance, which used to mean phone calls and paperwork, can now become an API call. That is a fundamental shift in a category that had barely changed in 50 years.", "apicall"),

    (211.500, 216.700, "service", "Now let's talk about AI in customer service at scale.", None),
    (217.300, 223.000, "service", "The traditional banks are not standing still.", None),
    (225.500, 235.100, "service", "Two examples from South Africa stand out.", None),
    (237.500, 241.500, "service", "The first is Nedbank's NB.", None),
    (241.900, 256.600, "service", "NB is a conversational digital assistant powered by Kasisto.", None),
    (257.200, 273.600, "service", "As of August 2025, four years after launch, NB has handled over 9 million chats, processed over 22 million service requests, and 1.8 million clients.", "nbstats"),
    (273.900, 276.300, "service", "The key number here is this.", None),
    (276.500, 281.800, "service", "Fewer than 10 percent of NB conversations escalate to a human agent.", "escalate"),
    (282.600, 289.400, "service", "Live agent chat volume was cut by more than half within 12 months of launch.", None),
    (290.500, 297.100, "service", "The second is Absa's AbbY, also South African.", None),
    (297.500, 317.900, "service", "In June 2025, Absa became the first African bank to launch an agentic AI agent for customers.", "agentic"),
    (318.800, 323.300, "service", "Agentic, meaning the AI does not just answer questions.", None),
    (323.000, 333.500, "service", "It executes loan applications, opens investment accounts, and processes cross-border payments inside defined guardrails.", None),
    (341.600, 344.200, "service", "Debut took under five weeks.", None),
    (344.300, 350.600, "service", "That tells you how mature the underlying infrastructure has become.", None),
    # Editor note 71-76: prefer the cleaner later take (cue 75-76).
    (370.300, 375.600, "service", "Now, it would be wrong to suggest that every African bank has cracked this.", None),
    (376.100, 387.100, "service", "The Cable in Nigeria did extensive user testing of Access Bank's Tamada, UBA's Leo, and Zenith's Ziva.", None),
    (387.200, 395.700, "service", "Their conclusion: these chatbots persistently hand off to humans and lack natural language depth.", None),
    (402.000, 404.400, "service", "The honest reading is this.", None),
    (404.700, 409.500, "service", "AI customer service in African banking works at the top tier.", None),
    (410.400, 413.500, "service", "It does not work uniformly.", None),
    (416.000, 420.300, "service", "The gap between the best and the average is wide.", None),

    (428.200, 431.900, "fraud", "Now, let's talk about fraud and payment rails.", None),
    (433.300, 450.200, "fraud", "The last fintech use case I want to cover is the most fundamental, and the most invisible to the customer: fraud detection and payment infrastructure.", None),
    # Editor note 95-98: prefer the cleaner later take (cue 97-98).
    (461.000, 466.500, "fraud", "The standard story here is Safaricom's M-PESA fintech 2.0 overhaul.", None),
    (467.200, 470.000, "fraud", "In September 2025,", None),
    (475.900, 481.300, "fraud", "Safaricom rebuilt M-PESA on cloud-native, AI-native architecture.", "datacenter"),
    (481.800, 493.100, "fraud", "They deployed a graph neural network that specifically predicts SIM-swap fraud, social engineering attacks, and identity theft.", "fraud_net"),
    (494.200, 501.200, "fraud", "The result is an 89 percent F1 score on social engineering fraud detection.", "f1"),
    (503.000, 515.600, "fraud", "After that, transaction capacity went from 4,000 to 506,000 transactions per second.", "tps"),
    (518.200, 530.500, "fraud", "In the 2025 financial year, M-PESA processed over 37 billion transactions worth 292 billion dollars.", "volume"),
    (542.700, 546.000, "fraud", "This product serves 35 million users.", "users"),
    (547.000, 557.900, "fraud", "This is what AI infrastructure at population scale looks like.", None),
    (584.100, 592.600, "fraud", "Standard Bank has deployed similar AI anomaly detection on card-not-present and digital-wallet flows.", None),
    (593.500, 607.000, "fraud", "They publicly disclosed these in 2024 and 2025, in response to a 73 percent year-over-year rise in digital banking fraud.", "fraud_rise"),
    (624.700, 627.600, "fraud", "The lesson is clear.", None),
    (627.700, 638.600, "fraud", "As digital finance scales, the fraud surface grows with it.", None),
    (639.000, 644.500, "fraud", "AI is now the only realistic tool to defend the rails.", None),

    (651.300, 652.800, "lessons", "What this means for you.", None),
    (652.900, 656.300, "lessons", "Three lessons to close out this episode.", None),
    (656.000, 663.500, "lessons", "First: the next billion users in fintech will be onboarded by AI, not by humans.", "lesson1"),
    (663.700, 671.700, "lessons", "If you're building a financial product anywhere in Africa, the question is not where to use AI.", None),
    (679.000, 685.600, "lessons", "It is whether your model is trained on the data your competitors do not have.", None),
    (698.000, 701.800, "lessons", "Embedded finance is the dominant architecture.", "lesson2"),
    (702.300, 708.000, "lessons", "The successful AI lenders are not building customer-facing apps.", None),
    (707.900, 714.700, "lessons", "They're building credit layers that plug into super-apps, telcos, and marketplaces.", None),
    (717.800, 720.300, "lessons", "Distribution is the moat.", None),
    (745.500, 748.500, "lessons", "Third: the bar has moved.", "lesson3"),
    (748.700, 753.300, "lessons", "Five years ago, an AI basic chatbot was the headline.", None),
    (753.300, 761.400, "lessons", "Today, the headline is agentic, executing cross-border transfers in production.", None),
    (762.500, 770.000, "lessons", "If your AI strategy is still about FAQ automation, you're already behind.", None),

    (821.300, 826.100, "next", "In the next episode, we move from finance to food.", None),
    (826.500, 836.200, "next", "How African farmers, often on their phones, are using AI to fight crop disease, forecast yields, and unlock credit.", "farming"),
    (843.600, 845.100, "next", "Stay with me.", None),
    (845.300, 848.200, "next", "Subscribe and follow for more updates.", None),
]


def parse_silences(path):
    starts, ends = [], []
    for line in open(path):
        m = re.search(r"silence_start:\s*([0-9.]+)", line)
        if m:
            starts.append(float(m.group(1)))
        m = re.search(r"silence_end:\s*([0-9.]+)", line)
        if m:
            ends.append(float(m.group(1)))
    # pair them up in order
    sil = []
    si = ei = 0
    while si < len(starts) and ei < len(ends):
        s = starts[si]
        # find first end after s
        while ei < len(ends) and ends[ei] <= s:
            ei += 1
        if ei < len(ends):
            sil.append((s, ends[ei]))
            si += 1
            ei += 1
        else:
            break
    return sil


def speech_in_silence(t, sil):
    for s, e in sil:
        if s <= t <= e:
            return (s, e)
    return None


def build():
    sil = parse_silences("/tmp/silences.txt")
    # internal-split silences = those longer than SPLIT_MIN
    big = [(s, e) for (s, e) in sil if (e - s) >= SPLIT_MIN]

    segments = []
    for (start, end, section, label, broll) in KEEP_SPANS:
        # trim edges inward to speech
        si = speech_in_silence(start, sil)
        s = si[1] if si else start
        ei = speech_in_silence(end, sil)
        e = ei[0] if ei else end
        s = max(0.0, s - EDGE_PAD)
        e = e + EDGE_PAD
        if e <= s:
            continue
        # collect internal big silences within (s,e)
        cuts = [(bs, be) for (bs, be) in big if bs > s + 0.05 and be < e - 0.05]
        cuts.sort()
        # produce speech chunks between the cuts
        chunks = []
        cur = s
        for (bs, be) in cuts:
            if bs - cur >= MIN_CHUNK:
                chunks.append((cur, bs + EDGE_PAD))
            cur = be - EDGE_PAD
        if e - cur >= MIN_CHUNK:
            chunks.append((cur, e))
        for i, (cs, ce) in enumerate(chunks):
            segments.append({
                "start": round(cs, 3),
                "end": round(ce, 3),
                "dur": round(ce - cs, 3),
                "section": section,
                # only the first chunk of a span carries the caption + broll
                "label": label if i == 0 else "",
                "broll": broll if i == 0 else None,
                "spanStart": i == 0,
            })

    total = sum(x["dur"] for x in segments)
    json.dump(segments, open("edl.json", "w"), indent=2)

    # cut-timeline span markers: where each ORIGINAL keep-span lands in the
    # baked cut (accumulate chunk durations; chunks carry spanStart on the
    # first chunk of each span).
    cut_spans = []
    t = 0.0
    cur = None
    for x in segments:
        if x["spanStart"]:
            if cur is not None:
                cur["cutEnd"] = round(t, 3)
                cut_spans.append(cur)
            cur = {
                "section": x["section"],
                "label": x["label"],
                "broll": x["broll"],
                "cutStart": round(t, 3),
            }
        t += x["dur"]
    if cur is not None:
        cur["cutEnd"] = round(t, 3)
        cut_spans.append(cur)
    json.dump(cut_spans, open("cut_spans.json", "w"), indent=2)

    # ffmpeg rough-cut select expression
    vexpr = "+".join(f"between(t,{x['start']},{x['end']})" for x in segments)
    open("/tmp/roughcut_filter.txt", "w").write(vexpr)

    print(f"segments: {len(segments)}")
    print(f"total runtime: {total:.1f}s = {int(total//60)}m{int(total%60)}s")
    print(f"frames @ {FPS}fps: {round(total*FPS)}")
    # per-section breakdown
    from collections import defaultdict
    by = defaultdict(float)
    for x in segments:
        by[x["section"]] += x["dur"]
    for k in ["insurance", "service", "fraud", "lessons", "next"]:
        print(f"  {k:10s} {by[k]:6.1f}s  ({sum(1 for x in segments if x['section']==k)} chunks)")


if __name__ == "__main__":
    build()
