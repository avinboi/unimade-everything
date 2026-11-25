"""Render report.html -> fill {{a.b.c}} placeholders from model.json, build plan table, print PDF with Edge.
Usage: python -I render.py <report_template.html> <out.pdf>
"""
import json, os, re, subprocess, sys

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, "..")
tpl_path, out_pdf = sys.argv[1], sys.argv[2]
model_file = sys.argv[3] if len(sys.argv) > 3 else "model.json"
model = json.load(open(os.path.join(root, model_file), encoding="utf-8"))
tpl = open(tpl_path, encoding="utf-8").read()


def inr(v):
    """Indian digit grouping: 1234567 -> 12,34,567"""
    neg = v < 0
    v = abs(int(round(v)))
    s = str(v)
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        head = re.sub(r"(\d)(?=(\d\d)+$)", r"\1,", head)
        s = head + "," + tail
    return ("−" if neg else "") + s


def get(path):
    cur = model
    for p in path.split("."):
        cur = cur[int(p)] if isinstance(cur, list) else cur[p]
    return cur


def sub(m):
    key, fmt = m.group(1), m.group(2)
    v = get(key)
    if fmt == "raw" or not isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, float) and not v.is_integer() and abs(v) < 100:
        return f"{v:g}"
    return inr(v)


# plan table
rows = []
t = model["totals"]
v2 = "users" in model["plan"][0]
for r in model["plan"]:
    cls = ' class="neg"' if r["cash"] < 0 else ""
    if v2:
        rows.append(f"<tr><td>{r['month']}</td><td>{inr(r['users'])}</td><td>{inr(r['gmv'])}</td><td>{inr(r['rev'])}</td>"
                    f"<td>{inr(r['net'])}</td><td>{inr(r['fixed'])}</td><td>{inr(r['mkt'])}</td><td>{inr(r['profit'])}</td>"
                    f"<td{cls}>{inr(r['cash'])}</td><td>{r['mer']}</td></tr>")
    else:
        rows.append(
            f"<tr><td>{r['month']}</td><td>{r['subs']}</td><td>{r['ppp']}</td><td>{r['kits']}</td>"
            f"<td>{inr(r['rev'])}</td><td>{inr(r['cm'])}</td><td>{inr(r['fixed'])}</td><td>{inr(r['mkt'])}</td>"
            f"<td>{inr(r['profit'])}</td><td{cls}>{inr(r['cash'])}</td><td>{r['mer']}</td></tr>")
if v2:
    rows.append(f"<tr class='tot'><td>Year</td><td></td><td>{inr(t['gmv'])}</td><td>{inr(t['rev'])}</td><td>{inr(t['net'])}</td>"
                f"<td>{inr(t['fixed'])}</td><td>{inr(t['mkt'])}</td><td>{inr(t['profit'])}</td><td></td><td>{t['mer']}</td></tr>")
    cat_rows = []
    for k, c in model["by_cat"].items():
        cat_rows.append(f"<tr><td>{c['name']}</td><td class='num'>{inr(c['units'])}</td><td class='num'>{inr(c['rev'])}</td><td class='num'>{inr(c['net'])}</td><td class='num'>{c['share']}%</td></tr>")
    tpl = tpl.replace("<!--CAT_ROWS-->", "\n".join(cat_rows))
else:
    rows.append(f"<tr class='tot'><td>Year</td><td colspan=3></td><td>{inr(t['rev'])}</td><td>{inr(t['cm'])}</td>"
                f"<td>{inr(t['fixed'])}</td><td>{inr(t['mkt'])}</td><td>{inr(t['profit'])}</td><td></td><td>{t['mer']}</td></tr>")
tpl = tpl.replace("<!--PLAN_ROWS-->", "\n".join(rows))

html = re.sub(r"\{\{([\w.]+)(?:\|(\w+))?\}\}", sub, tpl)
left = re.findall(r"\{\{[^}]+\}\}", html)
if left:
    sys.exit(f"unfilled placeholders: {left}")
html = html.replace("₹−", "−₹")
out_html = os.path.join(root, os.path.splitext(os.path.basename(out_pdf))[0] + ".html")
open(out_html, "w", encoding="utf-8").write(html)

edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
subprocess.run([edge, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                f"--print-to-pdf={os.path.abspath(out_pdf)}", "file:///" + os.path.abspath(out_html).replace("\\", "/")],
               check=True, timeout=120)
print("PDF:", os.path.abspath(out_pdf), os.path.getsize(out_pdf))
