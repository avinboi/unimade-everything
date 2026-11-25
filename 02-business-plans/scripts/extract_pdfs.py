"""Extract text from PDFs. Usage: python -I extract_pdfs.py OUT_DIR PDF [PDF ...]"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "lib"))
from pypdf import PdfReader  # noqa: E402

out_dir = sys.argv[1]
os.makedirs(out_dir, exist_ok=True)
for path in sys.argv[2:]:
    reader = PdfReader(path)
    parts = []
    for i, page in enumerate(reader.pages, 1):
        parts.append(f"\n--- page {i} ---\n{page.extract_text() or ''}")
    text = "".join(parts)
    name = os.path.splitext(os.path.basename(path))[0]
    with open(os.path.join(out_dir, name + ".txt"), "w", encoding="utf-8") as f:
        f.write(text)
    print(f"{name}: pages={len(reader.pages)} chars={len(text)}")
