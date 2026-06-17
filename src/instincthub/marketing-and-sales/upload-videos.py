#!/usr/bin/env python3
"""Upload the 15 Marketing & Sales lesson videos to InstinctHub and link
each to its course step.

Mirrors mcp_server/tools/videos.py (presign -> PUT -> register) so it can
run standalone where the rendered files live.

Usage:
    export INSTINCTHUB_PRIMARY_KEY=...   # skills channel keys
    export INSTINCTHUB_SECRET_KEY=...
    python3 upload-videos.py [--api-url https://api.instincthub.com]

Keys are read from the environment only; never hardcode them here.
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import sys
import urllib.request

OUT_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "out"
)
CHANNEL = "skills"
MAX_UPLOAD_BYTES = 524_288_000  # 500 MB, matches the presign endpoint limit

# file -> (title, step_uuid) for course 568
# "Marketing and Sales: Find Your Customer First"
ITEMS = [
    ("ih-ms-01-the-only-non-negotiable.mp4",
     "The only non-negotiable: customers",
     "08b74172-8834-4341-9b07-06114e1621f0"),
    ("ih-ms-02-unique-and-important.mp4",
     "Unique and important",
     "d70be594-334b-4dc8-bad0-a982a0e9736b"),
    ("ih-ms-03-regain-the-perfect-plan.mp4",
     "Case study: Regain, the perfect plan",
     "d7052f18-a991-43ae-93a7-80500ba04cee"),
    ("ih-ms-04-a-complete-disaster.mp4",
     "A complete disaster",
     "3379aa19-c75d-41b4-a7fc-b7306fbd7f96"),
    ("ih-ms-05-no-money-wrong-channel.mp4",
     "No money and the wrong channel",
     "d98bebea-a731-4c43-b424-d1e2a272d3ff"),
    ("ih-ms-06-paying-for-the-mistake.mp4",
     "Paying for the mistake",
     "e13f083a-6ad2-447a-959a-59135d318f9f"),
    ("ih-ms-07-find-the-emotional-problem.mp4",
     "Find the emotional problem",
     "e152ffdb-8f36-480b-a35f-653111b52ffd"),
    ("ih-ms-08-customers-shape-the-product.mp4",
     "Let customers shape the product",
     "338620af-c403-4069-a114-942f3bfe2d45"),
    ("ih-ms-09-advertise-to-the-fear.mp4",
     "Advertise to the fear, grow the funnel",
     "db884613-8dfd-46dc-b386-83333be6a03e"),
    ("ih-ms-10-phone-orders-to-shelves.mp4",
     "From phone orders to pharmacy shelves",
     "665c6b8b-7cb9-4a52-a004-09419f8648b4"),
    ("ih-ms-11-educators-and-wholesalers.mp4",
     "Educators and wholesalers",
     "125a2af8-4ee2-4d9c-b45b-8141e9782891"),
    ("ih-ms-12-the-planogram-meeting.mp4",
     "The planogram meeting",
     "4818da3f-9aeb-447c-9dd9-74d1cf1c7389"),
    ("ih-ms-13-selling-is-detective-work.mp4",
     "Selling is detective work",
     "4d4e6446-a68c-4b69-a72b-18538c33cf6c"),
    ("ih-ms-14-segment-and-sell-benefits.mp4",
     "Segment by motivation, sell benefits",
     "6f23325a-a11c-4b02-814a-a31a7f2ae24e"),
    ("ih-ms-15-start-small-iterate-win.mp4",
     "Start small, iterate, win",
     "f9ea6778-eace-4a09-a831-92be94768b20"),
]


def api_request(base: str, path: str, headers: dict, payload: dict) -> dict:
    """POST JSON to the integrations API and return the parsed response."""
    url = f"{base}/api/v1/integrations/{CHANNEL}/third-party{path}"
    body = json.dumps(payload).encode()
    req = urllib.request.Request(
        url, data=body, headers={**headers, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())


def put_file(upload_url: str, upload_headers: dict, file_path: str) -> None:
    """Stream the file to the presigned URL with a progress line."""
    size = os.path.getsize(file_path)

    class ProgressFile:
        def __init__(self, fh):
            self.fh = fh
            self.sent = 0

        def read(self, n=-1):
            chunk = self.fh.read(n)
            self.sent += len(chunk)
            pct = int(self.sent * 100 / size)
            sys.stdout.write(f"\r  uploading... {pct}%")
            sys.stdout.flush()
            return chunk

        def __len__(self):
            return size

    with open(file_path, "rb") as fh:
        req = urllib.request.Request(
            upload_url,
            data=ProgressFile(fh),
            headers={**upload_headers, "Content-Length": str(size)},
            method="PUT",
        )
        with urllib.request.urlopen(req, timeout=600) as resp:
            if resp.status >= 300:
                raise RuntimeError(f"PUT failed: HTTP {resp.status}")
    print()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-url", default="https://api.instincthub.com")
    parser.add_argument(
        "--only", type=int, default=0,
        help="Upload only the Nth item (1-15), for testing or retries.",
    )
    args = parser.parse_args()

    primary = os.environ.get("INSTINCTHUB_PRIMARY_KEY", "")
    secret = os.environ.get("INSTINCTHUB_SECRET_KEY", "")
    if not primary or not secret:
        print(
            "Set INSTINCTHUB_PRIMARY_KEY and INSTINCTHUB_SECRET_KEY "
            "(skills channel) before running.",
            file=sys.stderr,
        )
        return 1
    headers = {"primary-key": primary, "secret-key": secret}

    items = ITEMS
    if args.only:
        items = [ITEMS[args.only - 1]]

    # Validate everything up front so a typo in item 12 surfaces before
    # an hour of uploading items 1-11.
    for file_name, _, _ in items:
        path = os.path.join(OUT_DIR, file_name)
        if not os.path.isfile(path):
            print(f"Missing file: {path}", file=sys.stderr)
            return 1
        if os.path.getsize(path) > MAX_UPLOAD_BYTES:
            print(f"File over 500 MB limit: {path}", file=sys.stderr)
            return 1

    results = []
    for index, (file_name, title, step_uuid) in enumerate(items, start=1):
        path = os.path.join(OUT_DIR, file_name)
        size_mb = os.path.getsize(path) / 1048576
        print(f"[{index}/{len(items)}] {file_name} ({size_mb:.0f} MB)")
        try:
            content_type = mimetypes.guess_type(path)[0] or "video/mp4"
            presigned = api_request(args.api_url, "/videos/presign/", headers, {
                "file_name": file_name,
                "content_type": content_type,
                "size_bytes": os.path.getsize(path),
            })
            put_file(presigned["upload_url"], presigned["upload_headers"], path)
            record = api_request(args.api_url, "/videos/", headers, {
                "key": presigned["key"],
                "title": title,
                "size_bytes": os.path.getsize(path),
                "calculate_duration": True,
                "step_uuid": step_uuid,
            })
            results.append({"file": file_name, "id": record.get("id"),
                            "status": "uploaded"})
            print(f"  registered: {record.get('id')} -> step {step_uuid}")
        except Exception as exc:  # report and continue; retry with --only N
            results.append({"file": file_name, "status": "error",
                            "error": str(exc)})
            print(f"  FAILED: {exc}", file=sys.stderr)

    uploaded = sum(1 for r in results if r["status"] == "uploaded")
    print(f"\nDone: {uploaded}/{len(items)} uploaded.")
    print(json.dumps(results, indent=2))
    return 0 if uploaded == len(items) else 2


if __name__ == "__main__":
    sys.exit(main())
