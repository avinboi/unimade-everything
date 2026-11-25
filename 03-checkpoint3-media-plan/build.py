"""Build Unimade_Checkpoint3.pdf from model.json. Usage: python -I build.py"""
import json, os, re, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
M = json.load(open(os.path.join(HERE, "model.json"), encoding="utf-8"))
SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "01-website-source", "public")
IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "img")
D = lambda n: f"file:///{IMG}/doodles/{n}.png"
P, T, K = M["prices"], M["tot"], M["kit"]


def inr(v):
    neg = v < 0
    v = abs(int(round(v)))
    s = str(v)
    if len(s) > 3:
        s = re.sub(r"(\d)(?=(\d\d)+$)", r"\1,", s[:-3]) + "," + s[-3:]
    return ("−₹" if neg else "₹") + s


def lakh(v):
    return f"₹{v / 100000:.2f} L"


CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
html, body { margin: 0; background: #050506; }
body { font-family: 'Outfit', 'Segoe UI', sans-serif; color: #e7e3da; font-size: 9.6pt; line-height: 1.45; }
.page { width: 210mm; height: 297mm; padding: 13mm 14mm 12mm; position: relative; overflow: hidden; page-break-after: always;
  background:
    radial-gradient(60% 40% at 100% 0%, rgba(124,58,237,.28), transparent 70%),
    radial-gradient(50% 35% at 0% 100%, rgba(34,211,238,.14), transparent 70%),
    #050506; }
.page:last-child { page-break-after: auto; }
.foot { position: absolute; left: 14mm; right: 14mm; bottom: 7mm; display: flex; justify-content: space-between; font-size: 7.6pt; color: #6b6b78; }
.foot b { color: #a78bfa; font-weight: 600; }
h1, h2, h3, .disp { font-family: 'Bricolage Grotesque', 'Outfit', sans-serif; font-weight: 800; letter-spacing: -0.03em; color: #fff; margin: 0; }
h2 { font-size: 25pt; line-height: 1; margin: 1mm 0 4mm; }
h3 { font-size: 12.5pt; margin: 4mm 0 2mm; letter-spacing: -0.01em; }
.hand { font-family: 'Caveat', cursive; font-weight: 700; color: #c4b5fd; font-size: 17pt; line-height: 1; }
.hand.cy { color: #67e8f9; }
.grad { color: #b57bff; }
p { margin: 0 0 2.2mm; }
.muted { color: #9b9aa6; }
.small { font-size: 8.3pt; }
.tiny { font-size: 7.4pt; color: #8a8995; }
.card { background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.10); border-radius: 4mm; padding: 3.2mm 3.8mm; }
.card.v { border-color: rgba(168,85,247,.5); }
.card.c { border-color: rgba(103,232,249,.45); }
.card.y { border-color: rgba(250,204,21,.45); }
.card.p { border-color: rgba(244,114,182,.45); }
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; }
.g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3.5mm; }
.g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; }
.kpi .k { font-size: 7.8pt; color: #9b9aa6; }
.kpi .v { font-family: 'Bricolage Grotesque'; font-weight: 800; font-size: 17pt; color: #fff; line-height: 1.1; }
table { width: 100%; border-collapse: collapse; font-size: 8.4pt; margin: 1mm 0 3mm; }
th { text-align: left; font-weight: 600; color: #c4b5fd; padding: 1.6mm 2mm; border-bottom: 1px solid rgba(168,85,247,.55); }
td { padding: 1.4mm 2mm; border-bottom: 1px solid rgba(255,255,255,.07); vertical-align: top; }
td.n, th.n { text-align: right; white-space: nowrap; }
tr.tot td { font-weight: 700; color: #fff; border-top: 1px solid rgba(103,232,249,.6); background: rgba(103,232,249,.06); }
.pill { display: inline-block; padding: .4mm 2.4mm; border-radius: 99px; font-size: 7.4pt; font-weight: 600; }
.pp { background: rgba(168,85,247,.22); color: #d8b4fe; } .pc { background: rgba(34,211,238,.18); color: #67e8f9; }
.py { background: rgba(250,204,21,.16); color: #fde047; } .pk { background: rgba(244,114,182,.18); color: #f9a8d4; }
.pg { background: rgba(74,222,128,.16); color: #86efac; } .pr { background: rgba(248,113,113,.18); color: #fca5a5; }
.est { color: #fbbf24; }
.doodle { border-radius: 50%; }
ul { margin: 0 0 2mm; padding-left: 4.5mm; } li { margin-bottom: .9mm; }
.mono { font-family: Consolas, monospace; font-size: 7.9pt; color: #a5f3fc; word-break: normal; overflow-wrap: anywhere; }
.bar { height: 3.2mm; border-radius: 99px; background: linear-gradient(90deg, #7c3aed, #22d3ee); }
.tag { font-size: 7.6pt; color: #9b9aa6; }
.req { border-left: 3px solid #a855f7; padding: 1.2mm 0 1.2mm 3mm; margin-bottom: 3mm; font-size: 8.4pt; color: #b9b7c4; }
.req b { color: #fff; }
.mock { background: #f5f6f8; color: #1c1e21; border-radius: 3mm; overflow: hidden; font-family: 'Segoe UI', sans-serif; }
.mock .pp { background:#ede9fe; color:#6d28d9; } .mock .py { background:#fef3c7; color:#92400e; } .mock .pk { background:#fce7f3; color:#9d174d; }
.mock .bar2 { background: #fff; border-bottom: 1px solid #dadde1; padding: 2mm 3mm; font-size: 8pt; display: flex; justify-content: space-between; }
.stamp { position: absolute; bottom: 3mm; right: 4mm; transform: rotate(-3deg); border: 2px solid #ef4444; color: #ef4444; font-weight: 800; font-size: 8pt; padding: .5mm 2mm; border-radius: 1.5mm; background: rgba(255,255,255,.85); }
"""


def page(n, label, body):
    return f"""<div class="page">{body}<div class="foot"><span><b>unimade</b> · Checkpoint 3 · Media plan</span><span>{label}</span><span>{n}</span></div></div>"""


def head(kicker, title, req=None):
    r = f'<div class="req">{req}</div>' if req else ""
    return f'<div class="hand">{kicker}</div><h2>{title}</h2>{r}'


pages = []

# ---------------- 1. COVER ----------------
pages.append(f"""<div class="page" style="padding:16mm 16mm">
<div style="display:flex;align-items:center;gap:4mm"><img src="file:///{IMG}/brand/logo.png" style="height:13mm"><span class="disp" style="font-size:20pt">unimade</span></div>
<div style="margin-top:34mm">
 <div class="hand" style="font-size:26pt">checkpoint 3 · scaling a D2C business</div>
 <h1 style="font-size:58pt;line-height:.92;margin-top:4mm">MU life,<br><span class="grad">sorted.</span></h1>
 <p style="font-size:13.5pt;color:#b9b7c4;max-width:105mm;margin-top:7mm">A 90-day paid, owned, earned and conversational media plan to launch Unimade on one campus of 1,500 students, with the business model and prices worked out from zero.</p>
 <div style="margin-top:9mm"><div class="hand" style="font-size:17pt">made by team unimade</div><div style="font-size:14pt;font-weight:600;color:#fff;margin-top:1mm">Avin · Danni · Pradnya · Zayra · Khushi</div></div>
</div>
<div style="position:absolute;right:16mm;top:150mm;width:62mm;opacity:.95"><img class="doodle" src="{D('laundry')}" style="width:62mm"></div>
<div style="position:absolute;left:16mm;right:16mm;bottom:20mm">
 <div class="g4">
  <div class="card v kpi"><div class="k">Budget, 90 days</div><div class="v">{inr(T['mkt'])}</div><div class="tiny">₹4,000 of it is the institute's live ad pilot</div></div>
  <div class="card c kpi"><div class="k">Paying students by Feb</div><div class="v">{T['new']}</div><div class="tiny">{T['reach_pct']}% of ~{M['campus']['residents']:,} hostel/PG residents</div></div>
  <div class="card y kpi"><div class="k">Target ROAS / MER</div><div class="v">5.0 / 8.0</div><div class="tiny">break-even ROAS {M['be_roas']}</div></div>
  <div class="card p kpi"><div class="k">North star</div><div class="v" style="font-size:13pt">Repeat pickups / week</div><div class="tiny">a habit, not a one-off sale</div></div>
 </div>
 <p class="tiny" style="margin-top:6mm">Team Unimade (Avin, Danni, Pradnya, Zayra, Khushi) · unimade.vercel.app · @_unimade · 19 November 2026. Plan window: 24 Nov 2026 to 28 Feb 2027.<br>
 We have no customers or price history yet. Every forecast here is a <span class="est">planning assumption</span>, built from Gurugram market prices and the course's own formulas, and it gets replaced by real data from the Week-1 survey and the live pilot.</p>
</div></div>""")

# ---------------- 2. CONTENTS ----------------
rows = [
    ("1", "Comprehensive media plan: budget by channel, timeline, KPIs, expected ROI", "5 · 6 · 7 · 8"),
    ("2", "Intent of the plan (short note, 250–400 words)", "9"),
    ("3", "Sample media assets: poster, Reel storyboard, WhatsApp copy", "17"),
    ("4", "S13 · Mock Meta campaign: 1 goal, 1 audience, 1 creative, daily budget", "10"),
    ("5", "S14 · Keyword list by intent + transactional search ad", "11"),
    ("6", "S15 · Published blog post + 3-pillar map + Extractable Answer rewrite", "12"),
    ("7", "S16 · Mock listing + 65% Gross Margin Gate verdict", "13"),
    ("8", "S17 · ATL activation + 60/30/10 budget split sheet", "14"),
    ("9", "S18 · Final GTM media plan with WhatsApp, ROAS and MER targets", "15"),
    ("10", "S19 · Demo dashboard: 3 UTM links, 3 Pixel actions, north star", "16"),
]
toc = "".join(f"<tr><td style='width:8mm;color:#a78bfa;font-weight:700'>{a}</td><td>{b}</td><td class='n'>p. {c}</td></tr>" for a, b, c in rows)
pages.append(page(2, "Contents", head("what's inside", "The brief, mapped to pages") + f"""
<table>{toc}</table>
<h3>Before the media plan: the groundwork we had to do first</h3>
<div class="g3">
 <div class="card v"><b>Business model</b> · p. 3<br><span class="small muted">We had no model. Unimade is now a managed student marketplace that earns the spread between what students pay and what partners get.</span></div>
 <div class="card c"><b>Prices</b> · p. 4<br><span class="small muted">We had no prices. Each one is set below the Gurugram market, and then checked against our margin.</span></div>
 <div class="card y"><b>Customers</b> · p. 5<br><span class="small muted">We have no customers yet. We sized one campus of 1,500 students and planned a Week-1 survey to test our guesses.</span></div>
</div>
<h3>How to read the numbers</h3>
<div class="g2">
 <div class="card"><b>Revenue = what students pay (GMV).</b> <span class="small muted">That's the "net transaction value" rule from S16, so we count no MRP and no inflated list prices. Unimade keeps about <b>{M['gm_pct']}%</b> of it after paying partners and payment fees. That {M['gm_pct']}% is our gross margin, so <b>break-even ROAS = 1 ÷ {M['gm']} = {M['be_roas']}</b>.</span></div>
 <div class="card"><b><span class="est">Amber</span> = assumption or estimate.</b> <span class="small muted">Market prices come from public listings (sources on p. 18). Campus numbers, conversion rates and CPCs are our own planning guesses. The ₹2,000 Meta and ₹2,000 Google pilots in December (Checkpoint 4) are where those guesses get replaced by real numbers.</span></div>
</div>
<div class="card v" style="margin-top:4mm;display:flex;gap:4mm;align-items:center"><img class="doodle" src="{D('marks')}" style="width:22mm"><div><span class="hand cy">the one-line plan</span><br><span class="disp" style="font-size:13pt">Win one campus completely before spending on anyone outside it.</span><br><span class="small muted">With 1,500 students in a few buildings, posters, creators and WhatsApp groups reach people more cheaply than ads do. Ads are only a small part of the plan, and they have to beat break-even to keep their budget.</span></div></div>
"""))

# ---------------- 3. BUSINESS MODEL ----------------
pages.append(page(3, "Business model", head("we didn't have one, so here it is", "How Unimade makes money") + f"""
<p style="font-size:10.5pt;max-width:178mm">Unimade is a <b>managed student marketplace</b>. A student books and pays Unimade one clear price. Unimade gives the job to a verified local partner (a laundromat, a cleaner or a home kitchen), pays them a fixed bulk rate every week, and <b>keeps the difference</b>. The student never deals with five vendors, and the partner never has to find students.</p>
<div style="display:grid;grid-template-columns:1fr 14mm 1.15fr 14mm 1fr;align-items:center;margin:5mm 0">
 <div class="card c" style="text-align:center"><img class="doodle" src="{D('backpack')}" style="width:20mm"><br><b>Student</b><br><span class="small muted">books on WhatsApp or the site, pays by UPI, drops the bag at the hostel desk</span></div>
 <div style="text-align:center" class="hand cy">₹69/kg →</div>
 <div class="card v" style="text-align:center"><img src="file:///{IMG}/brand/logo.png" style="height:14mm"><br><b>Unimade</b><br><span class="small muted">one pickup point per hostel, quality checks, tracked bags, support, payments</span><br><span class="pill pp" style="margin-top:1.5mm">keeps ~₹21/kg</span></div>
 <div style="text-align:center" class="hand">→ ₹45/kg</div>
 <div class="card y" style="text-align:center"><img class="doodle" src="{D('laundry')}" style="width:20mm"><br><b>Partner</b><br><span class="small muted">gets 40 kg in one trip instead of 4 kg, with no marketing cost and a weekly payout</span></div>
</div>
<h3>Why a spread, and not a commission or our own laundry</h3>
<div class="g3">
 <div class="card"><b>No machines, no staff.</b><br><span class="small muted">Students can't fund a laundromat. Partners already own the capacity, and most of it sits idle on weekdays.</span></div>
 <div class="card"><b>We control the price.</b><br><span class="small muted">Our site promises "not 17 hidden fees". Under a commission, the partner sets the price. With a spread, the student sees one fixed number.</span></div>
 <div class="card"><b>Batching is the moat.</b><br><span class="small muted">One desk pickup for 30 students is cheaper for the partner, which is why they'll accept ₹45/kg <span class="est">(rate to negotiate)</span>.</span></div>
</div>
<h3>Revenue streams: now, then later</h3>
<table><tr><th>Stream</th><th>What it is</th><th>When</th><th class="n">Unimade keeps</th></tr>
<tr><td><span class="pill pp">1</span> Service spread</td><td>Per-order laundry, cleaning and tiffin</td><td>Day 1</td><td class="n">10–30% of order</td></tr>
<tr><td><span class="pill pc">2</span> Passes</td><td>Prepaid monthly Laundry Pass: cash upfront and a weekly habit</td><td>Day 1</td><td class="n">{P['pass']['margin']}% of pass</td></tr>
<tr><td><span class="pill py">3</span> Own-brand kit</td><td>Laundry Day Kit, sold alongside the main service (it raises attach rate, S20)</td><td>Jan</td><td class="n">{K['gm']}% gross margin</td></tr>
<tr><td><span class="pill pk">4</span> Student deals</td><td>Free for students. Local cafés and shops pay ₹999/month for a featured spot <span class="est">(est.)</span></td><td>Once 300 active users</td><td class="n">100%</td></tr>
<tr><td><span class="pill pg">5</span> Brand sampling</td><td>Brands pay to put samples in returned laundry bags</td><td>Once 500 active users</td><td class="n">₹10–20k per drop <span class="est">(est.)</span></td></tr>
<tr><td><span class="pill pr">6</span> Campus #2</td><td>Copy the playbook to a second college in the same cluster</td><td>From Aug 2027</td><td class="n">same model</td></tr></table>
<div class="g2">
 <div class="card v"><b>Costs, kept tiny</b><br><span class="small muted">Variable: partner payouts, 2% payment fees, bags and tags. Fixed: about {inr(T['fixed'] // 3)}/month for domain and tools. Founders run the desk and aren't paid yet. Marketing is {inr(T['mkt'])} over 90 days.</span></div>
 <div class="card c"><b>Why start with laundry</b><br><span class="small muted">It's weekly, so it becomes a habit. It shows (bags at the desk advertise for free). And it uses up the most hours. Cleaning and tiffin then use the same desk and the same WhatsApp chat at no extra acquisition cost. That's how the platform grows.</span></div>
</div>
"""))

# ---------------- 4. PRICES ----------------
pr = ""
for k in ["wf", "pass", "iron", "room", "bath", "tiffin", "trial"]:
    x = P[k]
    pr += f"<tr><td><b>{x['name']}</b><br><span class='tiny'>{x['unit']}</span></td><td class='n est'>{x['market']}</td><td class='n'><b>{inr(x['price'])}</b></td><td class='n'>{inr(x['payout'])}</td><td class='n'>{inr(x['gateway'] + x['other'])}</td><td class='n'>₹{x['keep']:.0f}</td><td class='n'>{x['margin']}%</td></tr>"
pr += f"<tr><td><b>{K['name']}</b><br><span class='tiny'>own product, 4 items</span></td><td class='n est'>₹900+ bought separately</td><td class='n'><b>{inr(K['price'])}</b></td><td class='n'>COGS {inr(K['cogs'])}</td><td class='n'>—</td><td class='n'>{inr(K['price'] - K['cogs'])}</td><td class='n'>{K['gm']}%</td></tr>"
pages.append(page(4, "Prices & unit economics", head("we didn't know what to charge, so we worked it out", "The launch price card") + f"""
<p>Our rule: <b>cheaper than the market, and fair to the partner.</b> We priced backwards from the S16 payout logic. We started from what a partner will accept for batched volume, added our cost to serve, and checked that the result is still well below what a student pays today.</p>
<table><tr><th>Service</th><th class="n">Gurugram market</th><th class="n">Unimade price</th><th class="n">Partner gets</th><th class="n">Fees + bags</th><th class="n">We keep</th><th class="n">Margin</th></tr>{pr}</table>
<div class="g3">
 <div class="card v kpi"><div class="k">Blended gross margin</div><div class="v">{M['gm_pct']}%</div><div class="tiny">mix {int(M['mix']['laundry']*100)}% laundry · {int(M['mix']['cleaning']*100)}% cleaning · {int(M['mix']['food']*100)}% tiffin · {int(M['mix']['kit']*100)}% kit, by GMV</div></div>
 <div class="card c kpi"><div class="k">Break-even ROAS (1 ÷ GM)</div><div class="v">{M['be_roas']}</div><div class="tiny">every ₹1 of ads must bring ₹{M['be_roas']} of bookings</div></div>
 <div class="card y kpi"><div class="k">Typical active student / month</div><div class="v">~₹780</div><div class="tiny">8 kg laundry + a clean every ~2 months + an occasional tiffin trial</div></div>
</div>
<h3>Why these numbers</h3>
<div class="g2">
 <div class="card"><b>₹69/kg wash & fold.</b> <span class="small muted">That sits in the middle of the ₹59–75/kg Gurugram range and has no 5 kg minimum (we ask for 4 kg). The student wins on convenience, since we pick up from the hostel desk. The <b>₹499 Pass</b> (8 kg, so ₹62/kg) copies the market's 10–20% prepaid discount and gives us cash upfront.</span></div>
 <div class="card"><b>₹299 room clean.</b> <span class="small muted">Urban Company charges ₹799 for a bedroom. A hostel room is smaller, and one cleaner can do 6 rooms in the same building in a morning: 6 × ₹210 = ₹1,260 for about 4.5 hours, which a local cleaner will take <span class="est">(to confirm)</span>.</span></div>
 <div class="card"><b>Tiffin at only 10%.</b> <span class="small muted">Food margins are thin, and kitchens won't give more. Tiffin is here because it keeps students opening the WhatsApp chat every day, not because it earns.</span></div>
 <div class="card"><b>What we refuse to do.</b> <span class="small muted">No delivery fee, no surge pricing, no ₹50 "service fee" (that was in our earlier newsletter idea). On a ₹276 laundry order, a ₹50 fee is an 18% price hike, and students would notice.</span></div>
</div>
"""))

# ---------------- 5. AUDIENCE ----------------
c = M["campus"]
pages.append(page(5, "Audience", head("we don't know our customers yet, so we sized them", "Who we're talking to") + f"""
<div class="g4">
 <div class="card kpi"><div class="k">Students on campus</div><div class="v">{c['students']:,}</div><div class="tiny">our whole market for now</div></div>
 <div class="card kpi"><div class="k">Live in hostel / PG</div><div class="v">~{c['residents']:,}</div><div class="tiny"><span class="est">assumed {int(c['resident_share']*100)}%</span>, check in Week 1</div></div>
 <div class="card kpi"><div class="k">Paying by Feb (plan)</div><div class="v">{T['new']}</div><div class="tiny">{T['reach_pct']}% of residents</div></div>
 <div class="card kpi"><div class="k">Active in Feb (plan)</div><div class="v">{M['plan'][2]['active']}</div><div class="tiny">{M['plan'][2]['repeat_rate']}% of them repeat customers</div></div>
</div>
<h3>Segments, ranked by how much they need us</h3>
<table><tr><th>Segment</th><th class="n">Size <span class="est">(est.)</span></th><th>Need</th><th>First service</th><th>Priority</th></tr>
<tr><td><b>First-years in hostels</b></td><td class="n">~350</td><td>First time away from home; no laundry routine yet; exams on a fixed calendar</td><td>Laundry Pass</td><td><span class="pill pp">Primary</span></td></tr>
<tr><td><b>Seniors in PGs</b></td><td class="n">~650</td><td>Busier (projects, internships); PG laundry is a bucket or a dhobi</td><td>Wash & Fold, Room Clean</td><td><span class="pill pc">Secondary</span></td></tr>
<tr><td><b>Day scholars</b></td><td class="n">~500</td><td>Live at home, so little need for laundry</td><td>Student deals only</td><td><span class="pill py">Awareness</span></td></tr>
<tr><td><b>Parents of first-years</b></td><td class="n">—</td><td>Want their child looked after; often the ones paying</td><td>"Gift a Laundry Pass"</td><td><span class="pill pk">Wild card test</span></td></tr></table>
<div class="g2">
 <div class="card v" style="display:flex;gap:3.5mm"><img class="doodle" src="{D('phone-chaos')}" style="width:24mm;height:24mm"><div><span class="hand">persona</span><br><b>Riya, 18, first-year, hostel room 204</b><br><span class="small muted">Away from Lucknow for the first time. Classes until 5, clubs after. She washes clothes on Sunday because it's the only free slot, then loses half the day. She says yes to anything that "just works" and costs under ₹500 a month, which her monthly allowance covers. She lives on Instagram and her batch WhatsApp group.</span></div></div>
 <div class="card c"><span class="hand cy">the insight we're betting on</span><br><b>The pain is time, not money.</b><br><span class="small muted">About 8 hours a month of washing (see our blog post, p. 12), and the worst of it lands in exam weeks. So we don't sell "cheap laundry". We sell <b>the Sunday back</b>. That's our single-minded proposition (S17).</span></div>
</div>
<h3>How we'll replace the guesses in Week 1 (24–30 Nov)</h3>
<div class="g3">
 <div class="card"><b>2-minute survey</b><br><span class="small muted">Shared in batch WhatsApp groups with a target of 300 responses. It asks where you live, how you wash today, how many hours, and what you'd pay. The results also become our PR data angle.</span></div>
 <div class="card"><b>Bag-weighing desk</b><br><span class="small muted">We weigh 30 real laundry bags at one hostel to replace our 8 kg/month estimate.</span></div>
 <div class="card"><b>3 partner quotes</b><br><span class="small muted">We ask three laundromats near campus for a bulk rate. We walk away if the best one is above ₹50/kg, because then our margin drops under 20%.</span></div>
</div>
"""))

# ---------------- 6. BUDGET ----------------
bucket_cls = {"Paid": "pp", "Earned": "py", "Owned": "pc", "Conversational": "pk"}
jobs = {
    "Meta Ads": ("Reach residents within 2 km, then retarget site visitors", "TOFU → BOFU"),
    "Google Search Ads": ("Catch 'laundry near me' searches", "BOFU"),
    "Campus creators": ("6 student creators with 1–8k followers; barter Pass + ₹500", "TOFU → MOFU"),
    "ATL / offline activation": ("'Weigh Your Week' pop-up + QR posters (p. 14)", "TOFU"),
    "PR & campus partnerships": ("Survey-data press note, student council, MU handles", "TOFU"),
    "Content & SEO": ("Blog, Reels props, Google Business Profile", "MOFU"),
    "WhatsApp + email": ("Business app now; API tool once over 256 contacts", "BOFU → repeat"),
    "Referral & first-order credits": ("'Give 2 kg, get 2 kg' + first 2 kg free", "BOFU → repeat"),
}
br = ""
for x in M["bud"]:
    j, f = jobs[x["ch"]]
    br += f"<tr><td><b>{x['ch']}</b><br><span class='tiny'>{j}</span></td><td><span class='pill {bucket_cls[x['bucket']]}'>{x['bucket']}</span></td><td class='tag'>{f}</td><td class='n'>{inr(x['dec'])}</td><td class='n'>{inr(x['jan'])}</td><td class='n'>{inr(x['feb'])}</td><td class='n'><b>{inr(x['total'])}</b></td><td class='n'>{x['pct']}%</td></tr>"
br += f"<tr class='tot'><td>Total</td><td></td><td></td><td class='n'>{inr(M['plan'][0]['mkt'])}</td><td class='n'>{inr(M['plan'][1]['mkt'])}</td><td class='n'>{inr(M['plan'][2]['mkt'])}</td><td class='n'>{inr(T['mkt'])}</td><td class='n'>100%</td></tr>"
bars = ""
cols = {"Paid": "#a855f7", "Earned": "#facc15", "Owned": "#22d3ee", "Conversational": "#f472b6"}
for b, v in M["buckets"].items():
    bars += f"<div style='width:{v / T['mkt'] * 100}%;background:{cols[b]};height:7mm;display:flex;align-items:center;justify-content:center;color:#050506;font-weight:700;font-size:7.6pt'>{b + ' ' if v / T['mkt'] > .08 else ''}{round(v / T['mkt'] * 100)}%</div>"
pages.append(page(6, "Media plan · budget", head("1 · comprehensive media plan", "Where every rupee goes", "<b>Brief:</b> estimated budget allocations across channels (social, influencer, search, PR, etc.)") + f"""
<div style="display:flex;border-radius:2mm;overflow:hidden;margin-bottom:4mm">{bars}</div>
<table><tr><th>Channel & job</th><th>Type</th><th>Funnel</th><th class="n">Nov–Dec</th><th class="n">Jan</th><th class="n">Feb</th><th class="n">Total</th><th class="n">Share</th></tr>{br}</table>
<div class="g3">
 <div class="card v"><b>Paid is 47%, not 60%.</b><br><span class="small muted">The course's Breww 47 plan put 60% into paid. A closed campus doesn't need that. Our cheapest reach is a poster next to the laundry room.</span></div>
 <div class="card c"><b>December's ad spend is the institute's ₹4,000.</b><br><span class="small muted">That's Meta ₹2,000 and Google ₹2,000, split across ad sets on p. 10–11, run live and carried straight into Checkpoint 4. Paid spend in Jan–Feb is ours, and only if the pilot beats break-even.</span></div>
 <div class="card y"><b>Who pays the rest?</b><br><span class="small muted">The founders put in ₹10,000. After that, December and January margin gets reinvested (about {inr(M['plan'][0]['keep'] + M['plan'][1]['keep'])} kept, p. 8). No loans, no outside money.</span></div>
</div>
<p class="tiny" style="margin-top:3mm">Stop rule (S16): any paid channel whose 14-day ROAS sits below {M['be_roas']} loses its next month's budget to the best performer.</p>
"""))

# ---------------- 7. TIMELINE ----------------
weeks = ["24 Nov", "1 Dec", "8 Dec", "15 Dec", "22 Dec", "29 Dec", "5 Jan", "12 Jan", "19 Jan", "26 Jan", "2 Feb", "9 Feb", "16 Feb", "23 Feb"]
phases = [(0, 1, "#4ade80", "P0"), (1, 3, "#a855f7", "P1 End-terms"), (3, 6, "#6b7280", "P2 Break mode"), (6, 10, "#22d3ee", "P3 Sunday Back launch"), (10, 14, "#f472b6", "P4 Habit")]
gantt_rows = [
    ("Meta Ads", [(1, 3, "pilot ₹2k"), (6, 9, "₹3k"), (11, 13, "retarget ₹1k")]),
    ("Google Search", [(1, 3, "pilot ₹2k"), (10, 14, "₹2k if ROAS ≥ 3.8")]),
    ("Campus creators", [(1, 3, "2 creators"), (6, 9, "4 more")]),
    ("ATL activation", [(1, 3, "QR posters"), (7, 9, "Weigh Your Week")]),
    ("PR", [(0, 1, "survey"), (7, 9, "press note")]),
    ("Blog / SEO", [(0, 14, "1 post every 2 weeks · GBP")]),
    ("WhatsApp + email", [(0, 14, "opt-in · pickup reminders · post-order feedback")]),
    ("Referral", [(2, 3, "credits"), (10, 14, "Give 2 kg, get 2 kg")]),
]
W = 100 / 14
g = "<div style='display:grid;grid-template-columns:30mm 1fr;row-gap:1.6mm;font-size:7.6pt'>"
g += "<div></div><div style='display:flex'>" + "".join(f"<div style='width:{W}%;color:#8a8995'>{w}</div>" for w in weeks) + "</div>"
g += "<div class='muted'>Phase</div><div style='position:relative;height:6mm'>" + "".join(
    f"<div style='position:absolute;left:{a * W}%;width:{(b - a) * W}%;top:0;height:6mm;background:{col};opacity:.85;border-radius:1.5mm;color:#050506;font-weight:700;padding:1mm 1.5mm;white-space:nowrap;overflow:hidden'>{t}</div>"
    for a, b, col, t in phases) + "</div>"
for name, segs in gantt_rows:
    g += f"<div style='color:#e7e3da'>{name}</div><div style='position:relative;height:5.5mm;background:rgba(255,255,255,.03);border-radius:1.5mm'>" + "".join(
        f"<div style='position:absolute;left:{a * W}%;width:{(b - a) * W}%;top:0;height:5.5mm;background:linear-gradient(90deg,rgba(124,58,237,.75),rgba(34,211,238,.6));border-radius:1.5mm;padding:.8mm 1.5mm;white-space:nowrap;overflow:hidden;color:#fff'>{t}</div>"
        for a, b, t in segs) + "</div>"
g += "</div>"
pages.append(page(7, "Media plan · timeline", head("1 · comprehensive media plan", "Campaign timeline: 14 weeks, 5 phases", "<b>Brief:</b> define campaign timelines") + g + """
<h3>What each phase is for</h3>
<table><tr><th>Phase</th><th>Dates</th><th>Goal</th><th>Main moves</th><th>Exit test</th></tr>
<tr><td><span class="pill pg">P0</span> Founding 100</td><td>24–30 Nov</td><td>Get a list before we sell anything</td><td>Survey, waitlist, WhatsApp opt-in, 3 partner quotes</td><td>300 survey replies · 150 opt-ins</td></tr>
<tr><td><span class="pill pp">P1</span> End-term rescue</td><td>1–14 Dec</td><td>First paid orders during exams</td><td>"You study, we wash." Live ₹4k Meta + Google pilot, 2 creators, posters</td><td>80 paying students · 14-day ROAS ≥ 3.8</td></tr>
<tr><td><span class="pill" style="background:rgba(107,114,128,.3)">P2</span> Break mode</td><td>15 Dec–4 Jan</td><td>Don't waste money while campus is empty</td><td>Paid off. "Book a pickup before you leave" + content bank for January</td><td>Spend under ₹1,500</td></tr>
<tr><td><span class="pill pc">P3</span> Sunday Back launch</td><td>5 Jan–1 Feb</td><td>Term-2 full launch, peak awareness</td><td>Weigh Your Week pop-up, press note, 4 creators, Meta ₹3k</td><td>170 new · 85% campus awareness</td></tr>
<tr><td><span class="pill pk">P4</span> Habit</td><td>2–28 Feb</td><td>Turn triers into weekly regulars</td><td>Passes, referral, retargeting, Google re-test, tiffin + cleaning cross-sell</td><td>Repeat rate ≥ 50% · 60 Passes</td></tr></table>
<p class="tiny">Dates assume the end-terms fall in the first half of December and the winter break runs until early January. If the academic calendar moves, the phases move with it. The spend doesn't change.</p>
"""))

# ---------------- 8. KPIs & ROI ----------------
pl = "".join(f"<tr><td>{p['month']}</td><td class='n'>{p['new']}</td><td class='n'>{p['returning']}</td><td class='n'>{p['active']}</td><td class='n'>{p['repeat_rate']}%</td><td class='n'>{inr(p['gmv'])}</td><td class='n'>{inr(p['keep'])}</td><td class='n'>{inr(p['mkt'])}</td><td class='n'>{inr(p['contrib'])}</td><td class='n'>{p['mer']}</td></tr>" for p in M["plan"])
pl += f"<tr class='tot'><td>90 days</td><td class='n'>{T['new']}</td><td></td><td></td><td></td><td class='n'>{inr(T['gmv'])}</td><td class='n'>{inr(T['keep'])}</td><td class='n'>{inr(T['mkt'])}</td><td class='n'>{inr(T['contrib'])}</td><td class='n'>{T['mer']}</td></tr>"
pc = "".join(f"<tr><td>{x['name']}</td><td class='n'>{inr(x['spend'])}</td><td class='n est'>₹{x['cpc']}</td><td class='n'>{x['clicks']}</td><td class='n est'>{x['cvr']}%</td><td class='n'>{x['cust']}</td><td class='n'>{inr(x['cac'])}</td><td class='n'>{x['first_roas']}</td><td class='n'><b>{x['roas']}</b></td></tr>" for x in M["paid"])
cr = M["creators"]
pc += f"<tr><td>{cr['name']}</td><td class='n'>{inr(cr['spend'])}</td><td class='n'>—</td><td class='n'>—</td><td class='n est'>7 codes each</td><td class='n'>{cr['cust']}</td><td class='n'>{inr(cr['cac'])}</td><td class='n'>{round(cr['cust'] * 300 / cr['spend'], 1)}</td><td class='n'><b>{cr['roas']}</b></td></tr>"
pt = M["paid_tot"]
pc += f"<tr class='tot'><td>All paid</td><td class='n'>{inr(pt['spend'])}</td><td></td><td></td><td></td><td class='n'>{pt['cust']}</td><td class='n'>{inr(pt['spend'] / pt['cust'])}</td><td></td><td class='n'>{pt['roas']}</td></tr>"
L = M["ltv"]
pages.append(page(8, "Media plan · KPIs & ROI", head("1 · comprehensive media plan", "KPIs and expected ROI", "<b>Brief:</b> define KPIs and expected ROI. All figures below are <span class='est'>simulated</span> from the assumptions on p. 4–5.") + f"""
<table><tr><th>Month</th><th class="n">New</th><th class="n">Returning</th><th class="n">Active</th><th class="n">Repeat rate</th><th class="n">GMV</th><th class="n">Unimade keeps</th><th class="n">Marketing</th><th class="n">After mkt + tools</th><th class="n">MER</th></tr>{pl}</table>
<div class="g4">
 <div class="card v kpi"><div class="k">ROI on marketing</div><div class="v">{T['roi']}×</div><div class="tiny">(kept {inr(T['keep'])} − spend) ÷ spend</div></div>
 <div class="card c kpi"><div class="k">Blended CAC</div><div class="v">{inr(T['cac'])}</div><div class="tiny">{inr(T['mkt'])} ÷ {T['new']} new students</div></div>
 <div class="card y kpi"><div class="k">12-month LTV on margin</div><div class="v">{inr(L['value'])}</div><div class="tiny">₹{L['order']} × {L['orders_per_year']} orders × {M['gm']} GM (S20)</div></div>
 <div class="card p kpi"><div class="k">LTV : CAC</div><div class="v">{L['ratio_blended']} : 1</div><div class="tiny">Meta alone {L['ratio_meta']} : 1. Over 5 means we could spend more, but campus caps us</div></div>
</div>
<h3>Paid channels: simulated 90-day ROAS on GMV</h3>
<table><tr><th>Channel</th><th class="n">Spend</th><th class="n">CPC</th><th class="n">Clicks</th><th class="n">Click→paid</th><th class="n">Customers</th><th class="n">CAC</th><th class="n">1st-order ROAS</th><th class="n">90-day ROAS</th></tr>{pc}</table>
<div class="g2">
 <div class="card v"><b>What the table is telling us</b><br><span class="small muted">A first laundry order is only about ₹300, so Meta's first-order ROAS is <b>1.8</b>, below break-even ({M['be_roas']}). Ads only pay off when students come back, and the 90-day ROAS reaches 5.7 because of repeat orders. That's why the north star is repeat pickups, and why WhatsApp gets 23% of the budget. Google comes in at 3.1, below break-even. It stays a test and gets cut in February unless the pilot proves us wrong.</span></div>
 <div class="card c"><b>KPI targets we'll be judged on</b><br><span class="small muted">
 · Paid ROAS ≥ <b>5.0</b> (simulated {pt['roas']}) · break-even {M['be_roas']}<br>
 · MER ≥ <b>8.0</b> (simulated {T['mer']}) · break-even {M['be_roas']}<br>
 · {T['new']} paying students · {M['plan'][2]['repeat_rate']}% repeat rate in Feb<br>
 · CAC ≤ ₹150 blended · ≤ ₹200 on Meta<br>
 · 60 active Laundry Passes by 28 Feb<br>
 · 85% of students aware (survey, end of Jan)</span></div>
</div>
"""))

# ---------------- 9. INTENT NOTE ----------------
intent = f"""<p><b>Why these channels.</b> Unimade launches on one campus of about 1,500 students, roughly 1,000 of whom live in hostels or PGs. That changes how media works. We can reach the whole market by walking through a few buildings, so the cheapest reach isn't an ad. It's a poster by the laundry room, a creator who lives two doors down, and a WhatsApp group everyone already reads. So only 47% of our ₹30,000 goes to paid media (the course example used 60%), and 23% goes to WhatsApp, email and referral credits. Their job is the second order, not the first.</p>
<p><b>Who we're targeting.</b> First- and second-year students living away from home for the first time. They're busy, they have exams on a fixed calendar, and their laundry happens on Sunday. Their problem is time, not money: about 8 hours a month. So we don't sell cheap laundry. Our one promise is "Get your Sunday back."</p>
<p><b>Why laundry leads.</b> It's weekly, so it becomes a habit. It's visible, since bags at the hostel desk advertise for free. Cleaning and tiffin then use the same desk and the same WhatsApp chat, so the platform grows without paying again to acquire anyone.</p>
<p><b>What we expect.</b> {T['new']} paying students in 90 days ({T['reach_pct']}% of residents) and {lakh(T['gmv'])} in bookings, of which Unimade keeps about {lakh(T['keep'])} at a {M['gm_pct']}% blended margin. Break-even ROAS is 1 ÷ {M['gm']} = {M['be_roas']}. We target paid ROAS of at least 5.0 and MER of at least 8. Meta's first-order ROAS is just 1.8, so ads only pay if students come back. That's why our north star is repeat pickups per week. Blended CAC of {inr(T['cac'])} against a 12-month LTV of {inr(L['value'])} on margin gives about {L['ratio_blended']}:1.</p>
<p><b>Benchmarks we used.</b> Gurugram wash-and-fold at ₹59–75/kg (LBB); Urban Company at ₹799 for a bedroom and ₹579 for a bathroom; and the course's 65% margin gate, break-even ROAS and 60/30/10 rules. Every number is an assumption until the Week-1 survey and the live ₹4,000 Meta and Google pilot replace it.</p>"""
words = len(re.sub(r"<[^>]+>", " ", intent).split())
pages.append(page(9, "Intent note", head("2 · intent of the plan", "Why this plan, in one page", f"<b>Brief:</b> 250–400 words on the reasoning: which channels, which audience, what outcomes, backed by metrics and benchmarks. <b>This note: {words} words.</b>") + f"""
<div style="display:grid;grid-template-columns:1fr 46mm;gap:6mm"><div style="font-size:10.3pt;line-height:1.55">{intent}</div>
<div><img class="doodle" src="{D('done')}" style="width:46mm"><div class="card v" style="margin-top:4mm"><span class="hand">in one breath</span><br><span class="small">Own one campus. Win the first order cheaply, using people more than ads. Earn the money back on the second, third and tenth orders. Spend more only where ROAS beats {M['be_roas']}.</span></div></div></div>
"""))
INTENT_WORDS = words

# ---------------- 10. S13 META MOCK ----------------
pages.append(page(10, "S13 · Meta mock campaign", head("4 · from session 13", "Mock Meta campaign: 1 goal, 1 audience, 1 creative", "<b>Brief:</b> a mock campaign screenshot showing one clear goal, one audience, one creative and a stated daily budget. This is a draft only and has not been published.") + f"""
<div class="mock" style="position:relative">
 <div class="bar2"><b>Ads Manager · Unimade (INR · Asia/Kolkata)</b><span>Campaign › Ad set › Ad</span></div>
 <div class="stamp" style="top:1.6mm;bottom:auto;right:40mm;transform:rotate(-2deg)">MOCK · DRAFT · NOT PUBLISHED</div>
 <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0">
  <div style="padding:3mm;border-right:1px solid #dadde1"><div style="font-size:7.5pt;color:#606770">CAMPAIGN · 1 goal</div><b style="font-size:10pt">sunday-back · dec-pilot</b>
   <div style="margin-top:2mm;font-size:8pt">Objective</div><div style="border:2px solid #1877f2;border-radius:2mm;padding:1.5mm 2mm;margin-top:1mm;font-size:8.5pt"><b>◉ Traffic</b><br><span style="color:#606770">Send people to the laundry page</span></div>
   <div style="border:1px solid #dadde1;border-radius:2mm;padding:1.5mm 2mm;margin-top:1mm;font-size:8.5pt;color:#8d949e">○ Awareness · ○ Engagement · ○ Leads · ○ Sales</div>
   <div style="margin-top:2mm;font-size:8pt">Conversion location: <b>Website</b><br>Event: <b>Contact</b> (WhatsApp tap)<br>Special ad category: none</div></div>
  <div style="padding:3mm;border-right:1px solid #dadde1"><div style="font-size:7.5pt;color:#606770">AD SET · 1 audience</div><b style="font-size:10pt">cold · campus 2 km · 17–24</b>
   <div style="margin-top:2mm;font-size:8pt;line-height:1.55">Location: <b>campus pin + 2 km</b> (Gurugram)<br>Age: <b>17–24</b> · All genders<br>Detailed targeting: <b>Education level: in college</b><br>Placements: <b>IG Reels + Stories</b> (9:16)<br>Schedule: <b>1–7 Dec 2026</b></div>
   <div style="background:#e7f3ff;border-radius:2mm;padding:2mm;margin-top:2mm"><div style="font-size:7.5pt;color:#606770">Daily budget</div><b style="font-size:16pt">₹200.00</b><br><span style="font-size:7.5pt">₹200 × 7 days = ₹1,400 test spend</span></div>
   <div style="font-size:7.5pt;color:#606770;margin-top:1.5mm">Est. audience size: ~6,000–8,000 <span style="color:#b45309">(est.)</span></div></div>
  <div style="padding:3mm"><div style="font-size:7.5pt;color:#606770">AD · 1 creative</div><b style="font-size:10pt">reel-sunday-pile-15s</b>
   <div style="margin:2mm auto 0;width:40mm;height:71mm;border-radius:3mm;background:linear-gradient(180deg,#1a0b2e,#050506);color:#fff;position:relative;overflow:hidden">
    <img src="{D('laundry')}" style="width:40mm;opacity:.9;margin-top:6mm">
    <div style="position:absolute;top:3mm;left:3mm;right:3mm;font-family:'Bricolage Grotesque';font-weight:800;font-size:10pt;line-height:1">It's Sunday.<br>The pile won.</div>
    <div style="position:absolute;bottom:12mm;left:3mm;right:3mm;font-size:7.5pt">We pick it up from your hostel desk. Back folded in 48h. <b>₹69/kg.</b></div>
    <div style="position:absolute;bottom:3mm;left:3mm;right:3mm;background:#fff;color:#000;border-radius:1.5mm;text-align:center;font-size:7.5pt;font-weight:700;padding:1mm">Learn more</div></div></div>
 </div>
 <div style="border-top:1px solid #dadde1;padding:2mm 3mm;font-size:7.8pt;color:#606770">Destination: <span style="font-family:Consolas">unimade.vercel.app/product?utm_source=instagram&amp;utm_medium=cpc&amp;utm_campaign=sunday-back</span> · Pixel: ViewContent, Contact, Purchase</div>
</div>
<div class="g3" style="margin-top:4mm">
 <div class="card v"><b>Why Traffic?</b> <span class="small muted">Laundry is a <b>low-to-medium consideration</b> buy, but trust matters ("will my clothes come back?"). We have no Pixel history, so a Sales objective can't optimise yet. Traffic to a page with prices and a WhatsApp button is the honest first step (S13).</span></div>
 <div class="card c"><b>Why one cold audience?</b> <span class="small muted">The retargeting pool is zero on day one. The audience is everyone within 2 km of campus aged 17–24, which roughly equals our hostel and PG cluster.</span></div>
 <div class="card y"><b>₹2,000 Meta split (carried into CP4)</b><br><span class="small muted">Ad set A, cold: ₹200 × 7 = <b>₹1,400</b> (1–7 Dec)<br>Ad set B, retarget site visitors + Reel 50% viewers: ₹100 × 6 = <b>₹600</b> (8–13 Dec)<br>Success = 8 first pickups at ≤ ₹250 each</span></div>
</div>
<p class="tiny" style="margin-top:2.5mm">Stop-Say-Do check: STOP opens on a laundry mountain at 3 seconds · SAY "we pick it up from your hostel desk" · DO "Learn more", which leads to a WhatsApp booking.</p>
"""))

# ---------------- 11. S14 KEYWORDS ----------------
kw = [
    ("how to wash clothes in hostel", "Informational", "Blog: hostel life tips", "low"),
    ("how often to wash bedsheets", "Informational", "Blog", "med"),
    ("how to remove stains without washing machine", "Informational", "Blog", "med"),
    ("laundry cost per kg", "Informational", "Blog: laundry cost guide (p. 12)", "low"),
    ("hostel laundry tips", "Informational", "Blog", "low"),
    ("best laundry service in gurgaon", "Comparison", "Comparison page", "med"),
    ("dhobi vs laundry service", "Comparison", "Blog: laundry cost guide", "low"),
    ("cheapest laundry service gurgaon", "Comparison", "Price card", "low"),
    ("best tiffin service in gurgaon for students", "Comparison", "Comparison page", "med"),
    ("urban company room cleaning price", "Comparison", "Price card vs UC", "med"),
    ("laundry pickup near me", "Transactional", "Offer page", "high"),
    ("wash and fold near me", "Transactional", "Offer page", "high"),
    ("laundry service gurgaon", "Transactional", "Offer page", "high"),
    ("tiffin service near me gurgaon", "Transactional", "Tiffin offer", "high"),
    ("room cleaning service near me", "Transactional", "Cleaning offer", "high"),
    ("unimade laundry", "Transactional", "Brand / home", "low"),
]
cls = {"Informational": "pc", "Comparison": "py", "Transactional": "pp"}
kr = "".join(f"<tr><td class='mono' style='color:#e7e3da;font-family:Outfit;font-size:8.3pt'>{a}</td><td><span class='pill {cls[b]}'>{b}</span></td><td class='tag'>{c}</td><td class='est'>{d}</td></tr>" for a, b, c, d in kw)
rsa_h = ["Laundry Pickup Near Campus", "Wash & Fold at ₹69/kg", "Picked Up From Your Hostel", "Back Folded in 48 Hours", "Made by Students, for You", "First 2 kg Free. Book Now", "Book on WhatsApp in 30 Sec", "No 5 kg Minimum, Just 4 kg"]
rsa_d = ["Hostel & PG pickup Mon and Thu. Washed, dried, folded, back in 48h. First 2 kg on us.",
         "Student-run, verified partner laundries. Tracked bags. Pay per kg, no hidden fees."]
for h in rsa_h: assert len(h) <= 30, h
for d in rsa_d: assert len(d) <= 90, (d, len(d))
hl = "".join(f"<div style='font-size:8.2pt'>{i + 1}. {h} <span class='tiny'>({len(h)})</span></div>" for i, h in enumerate(rsa_h))
pages.append(page(11, "S14 · Keywords & search ad", head("5 · from session 14", "Keywords by buyer intent + one transactional ad", "<b>Brief:</b> a keyword list tagged by intent stage (informational, comparison, transactional) + 1 sample ad matched to the transactional stage.") + f"""
<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:5mm">
<div><table><tr><th>Keyword</th><th>Intent</th><th>Send to</th><th>CPC <span class="est">(est.)</span></th></tr>{kr}</table>
<div class="card"><b>Negative keywords</b><br><span class="small muted">jobs · salary · franchise · "how to start laundry business" · washing machine price · free · delhi · noida · wedding / lehenga dry clean</span></div>
</div>
<div>
 <div class="mock" style="padding:3.5mm 3.5mm 9mm;position:relative">
  <div class="stamp">MOCK AD</div>
  <div style="font-size:7.8pt;color:#202124"><b>Sponsored</b></div>
  <div style="font-size:7.8pt;color:#202124">unimade.vercel.app › laundry › pickup</div>
  <div style="font-size:12pt;color:#1a0dab;margin:1mm 0">Laundry Pickup Near Campus | Wash &amp; Fold at ₹69/kg | First 2 kg Free. Book Now</div>
  <div style="font-size:8.6pt;color:#4d5156">Hostel &amp; PG pickup Mon and Thu. Washed, dried, folded, back in 48h. First 2 kg on us. Student-run, verified partner laundries. Tracked bags.</div>
 </div>
 <h3>Responsive search ad · transactional</h3>
 <div class="card v"><b>Keyword:</b> "laundry pickup near me" [phrase] · <b>Final URL:</b> offer page with the same ₹69/kg + first 2 kg free (the match test)<br>
 <div style="margin-top:1.5mm;display:grid;grid-template-columns:1fr 1fr;gap:.5mm 3mm">{hl}</div>
 <div class="small" style="margin-top:2mm">D1. {rsa_d[0]} <span class="tiny">({len(rsa_d[0])})</span><br>D2. {rsa_d[1]} <span class="tiny">({len(rsa_d[1])})</span></div>
 <div class="tiny" style="margin-top:1.5mm">Headlines: 2 keyword · 2 benefit · 2 differentiator · 2 CTA. All ≤ 30 characters, descriptions ≤ 90. Path: /laundry/pickup.</div></div>
 <div class="card c" style="margin-top:3mm"><b>₹2,000 Google split (carried into CP4)</b><br><span class="small muted">One Search campaign, 2 km geo, ₹143/day × 14 days (1–14 Dec).<br>Ad group 1, laundry transactional: <b>₹1,400</b><br>Ad group 2, tiffin + cleaning transactional: <b>₹600</b></span></div>
 <div class="card y" style="margin-top:3mm"><b>Verdict: search-light.</b> <span class="small muted">Students search "laundry near me", but nobody searches a brand they've never heard of. Search catches demand. It doesn't create it, so it only gets 13% of the budget.</span></div><p class="tiny" style="margin-top:2mm">Volumes and CPCs still need checking in Keyword Planner once billing is live (S14). Match types: phrase + exact for transactional terms, and no broad match on a ₹2,000 budget.</p>
</div></div>
"""))

# ---------------- 12. S15 BLOG ----------------
pages.append(page(12, "S15 · Blog, pillar map, GEO", head("6 · from session 15", "Published post, its pillar, and an extractable rewrite", "<b>Brief:</b> publish 1 blog post + a sketch of the 3-pillar blog map it belongs to + 1 rewritten paragraph that passes the Extractable Answer Test.") + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm">
<div class="card v"><span class="pill pg">● LIVE</span> <span class="mono">unimade.vercel.app/blog/hostel-laundry-cost</span>
 <img src="file:///{SITE}/blog/hostel-laundry-cost.svg" style="width:100%;border-radius:2mm;margin:2mm 0">
 <b class="disp" style="font-size:12pt">How Much Does Laundry Cost in a Hostel? (2026 Guide)</b>
 <table style="margin-top:2mm"><tr><td>Title</td><td>52 characters (rule: about 60)</td></tr><tr><td>Meta description</td><td>~150 characters</td></tr><tr><td>Slug</td><td>/hostel-laundry-cost (short, readable)</td></tr><tr><td>Structure</td><td>TL;DR on top · 6 question-style H2s · answer first under each</td></tr><tr><td>Evidence</td><td>LBB Gurgaon prices, named providers, our own weight estimate</td></tr><tr><td>Platform limit</td><td>Our Next.js blog can't set a separate SEO title, inline links or alt text per post. We're fixing that next.</td></tr></table></div>
<div>
 <h3 style="margin-top:0">3-pillar blog map</h3>
 <div style="position:relative;font-size:7.8pt">
  <div class="card c" style="text-align:center;margin:0 18mm"><b>PILLAR · Saving Money in College</b><br><span class="tiny">broad guide: where a student's money and time go</span></div>
  <div style="text-align:center;color:#67e8f9">↑ links up with descriptive anchors · ↓ links down to each post</div>
  <div class="g2" style="gap:1.8mm">
   <div class="card" style="padding:2mm">Student budget plan</div><div class="card" style="padding:2mm">Save money as a student</div>
   <div class="card" style="padding:2mm">Save money on food</div><div class="card" style="padding:2mm">Student discounts India</div>
   <div class="card" style="padding:2mm">Part-time jobs</div><div class="card v" style="padding:2mm;border-width:2px"><b>NEW · Hostel laundry cost</b></div>
  </div>
  <div style="text-align:center;color:#c4b5fd;margin-top:1.5mm">↔ sideways links to sibling pillars</div>
  <div class="g2" style="gap:1.8mm"><div class="card y" style="padding:2mm"><b>Hostel Life Tips</b><br><span class="tiny">"Fix a laundry day" → links to this post</span></div><div class="card y" style="padding:2mm"><b>Finding a PG</b><br><span class="tiny">"PG first week" → links to this post</span></div></div>
 </div>
</div></div>
<h3>Extractable Answer Test: one paragraph, before and after</h3>
<div class="g2">
 <div class="card p"><span class="pill pr">✗ BEFORE · fails</span><br><b>How much does a laundry service cost in Gurugram?</b><br><span class="small muted">"Laundry is one of those things every student has to deal with, and prices can really vary depending on where you go and what kind of service you pick, so it's worth doing a bit of research before choosing one."</span><br><span class="tiny">Hide everything after the first 2–3 sentences: no number, no answer.</span></div>
 <div class="card c"><span class="pill pg">✓ AFTER · passes (as published)</span><br><b>How much does a laundry service cost in Gurugram?</b><br><span class="small">"Wash-and-fold laundry in Gurugram costs about ₹59–75 per kg in 2026, so a student's typical 8 kg a month comes to ₹470–600. Ironing usually adds ₹10–15 a piece."</span><br><span class="tiny">The answer comes first, with a number, a source further on (LBB), and a question as the heading. An AI answer can quote it word for word.</span></div>
</div>
"""))

# ---------------- 13. S16 LISTING ----------------
pages.append(page(13, "S16 · Listing & margin gate", head("7 · from session 16", "Mock listing + the 65% Gross Margin Gate", "<b>Brief:</b> a mock listing screenshot with title, bullets, pricing and one trust badge, plus a 1-line verdict on whether our category clears the 65% gate for quick commerce.") + f"""
<div class="mock" style="position:relative;display:grid;grid-template-columns:62mm 1fr;gap:4mm;padding:4mm">
 <div class="stamp">MOCK LISTING</div>
 <div><div style="background:#fff;border:1px solid #e3e6e6;border-radius:2mm;text-align:center;padding:3mm"><img src="{D('laundry')}" style="width:52mm;border-radius:50%"></div>
  <div style="display:flex;gap:1mm;margin-top:1.5mm">{''.join(f"<div style='flex:1;height:9mm;background:#fff;border:1px solid #e3e6e6;border-radius:1mm;font-size:6pt;color:#565959;text-align:center;padding-top:2.5mm'>{t}</div>" for t in ['white bg','pack','benefits','proof','in use'])}</div></div>
 <div style="font-size:8.6pt">
  <div style="font-size:7.5pt;color:#007185">Visit the Unimade Store</div>
  <div style="font-size:12.5pt;line-height:1.25;margin:1mm 0"><b>Unimade Laundry Day Kit for Hostel &amp; PG, 2 Numbered Mesh Laundry Bags + 30 Detergent Sheets + Stain Pen + 20 Clips, 4-Piece Set</b></div>
  <div style="font-size:7.8pt;color:#565959">☆☆☆☆☆ <b>New, no reviews yet</b> (we won't fake them)</div>
  <div style="border-top:1px solid #e3e6e6;margin:1.5mm 0;padding-top:1.5mm"><span style="color:#cc0c39;font-size:12pt">-17%</span> <span style="font-size:17pt"><sup style="font-size:8pt">₹</sup>{K['price']}</span><br><span style="font-size:7.8pt;color:#565959">M.R.P.: <s>₹{K['mrp']}</s> · Inclusive of all taxes</span></div>
  <ul style="font-size:8pt;padding-left:4mm;color:#0f1111">
   <li><b>Never lose a sock again:</b> 2 numbered mesh bags, one for whites and one for colours, that go straight into any machine or our pickup.</li>
   <li><b>Made for hostel and PG rooms:</b> fits under a bed, no bucket needed, and works with shared washing machines.</li>
   <li><b>What's inside:</b> 2 mesh bags (60 × 50 cm), 30 detergent sheets, 1 stain-remover pen, 20 cloth clips.</li>
   <li><b>Proof:</b> designed by students at Masters' Union, Gurugram. GST invoice with every order.</li>
   <li><b>Reassurance:</b> 7-day easy replacement. Sheets are skin-safe. Store in a dry place.</li></ul>
  <div style="display:flex;gap:2mm;margin-top:1.5mm"><div style="border:1.5px solid #067d62;color:#067d62;border-radius:1.5mm;padding:1mm 2mm;font-size:7.6pt;font-weight:700">✓ 7-day replacement</div><div style="border:1.5px solid #565959;color:#565959;border-radius:1.5mm;padding:1mm 2mm;font-size:7.6pt">GST invoice</div><div style="border:1.5px solid #565959;color:#565959;border-radius:1.5mm;padding:1mm 2mm;font-size:7.6pt">Secure payment</div></div>
 </div>
</div>
<div class="g2" style="margin-top:4mm">
 <div><h3 style="margin-top:0">Price from payout, backwards (S16 waterfall)</h3>
 <table><tr><td>Selling price</td><td class="n">{inr(K['price'])}</td></tr><tr><td>Commission 10% (illustrative)</td><td class="n">−₹{K['comm']}</td></tr><tr><td>Fixed fee</td><td class="n">−₹{K['fixed']}</td></tr><tr><td>Shipping</td><td class="n">−₹{K['ship']}</td></tr><tr><td>GST 18% on fees</td><td class="n">−₹{K['gst']}</td></tr><tr><td>TCS 1% (claimable later)</td><td class="n">−₹{K['tcs']}</td></tr>
 <tr class="tot"><td>Net payout</td><td class="n">₹{K['payout']}</td></tr><tr><td>COGS (sourced wholesale <span class="est">est.</span>)</td><td class="n">−{inr(K['cogs'])}</td></tr><tr class="tot"><td>Left before ads and returns</td><td class="n">₹{K['left']} ({round(K['left'] / K['price'] * 100)}%)</td></tr></table></div>
 <div><h3 style="margin-top:0">The 65% gate</h3>
 <table><tr><th>What</th><th class="n">Gross margin</th><th>Gate</th></tr>
 <tr><td>Laundry Day Kit (own product)</td><td class="n">({K['price']} − {K['cogs']}) ÷ {K['price']} = <b>{K['gm']}%</b></td><td><span class="pill pg">clears, thin</span></td></tr>
 <tr><td>Core services (blended)</td><td class="n"><b>{M['gm_pct']}%</b> of GMV</td><td><span class="pill pr">fails</span></td></tr></table>
 <p class="small muted">After quick-commerce commission and ads (~33%), the kit leaves ₹{K['qc_left']} per unit. But Blinkit alone reportedly charges ₹25,000 per SKU per state, which is {round(25000 / K['qc_left'])} kits' worth of margin, and we'd sell maybe 60 kits a term.</p>
 <div class="card v"><span class="hand">1-line verdict</span><br><b>The kit clears the 65% gate on paper ({K['gm']}%), but our core category (services, {M['gm_pct']}%) doesn't, and we're nowhere near the 200+ orders a month quick commerce expects. So the answer is not yet: we sell the kit on WhatsApp and our own site, and use Amazon only to learn.</b></div></div>
</div>
"""))

# ---------------- 14. S17 ATL ----------------
pages.append(page(14, "S17 · ATL activation", head("8 · from session 17", "ATL idea: \u201cWeigh Your Week\u201d", "<b>Brief:</b> an Above The Line activation idea + a budget split sheet following the 60/30/10 rule.") + f"""
<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:5mm">
<div>
 <div class="card v"><span class="hand">single-minded proposition</span><br><span class="disp" style="font-size:20pt">Get your Sunday back.</span><br><span class="small muted">Unimade helps hostel students skip laundry day. The headline is 4 words, one promise, one audience, and readable in 3 seconds.</span></div>
 <h3>The activation</h3>
 <p>For three days in the second week of Term 2 (12–14 Jan), we set up a <b>hanging luggage scale</b> and a 6-foot pile of (clean, borrowed) laundry bags at the busiest spot on campus, the mess entrance <span class="est">(needs admin permission)</span>.</p>
 <ul class="small"><li>Students hang their own laundry bag. We call out: <b>"4.2 kg. That's about 4 hours of your Sundays. We'd do it for ₹290."</b></li>
 <li>They scan the QR on the scale and get their <b>first 2 kg free</b>. A board keeps a live tally: "Campus has handed us ___ kg = ___ Sundays saved."</li>
 <li>It's made for Reels: creators film people's reactions to their own number, which feeds the Jan creator posts.</li></ul>
 <h3>How we'll count it (if we can't count it, we learn nothing)</h3>
 <table><tr><th>Element</th><th>Counted by</th><th>Target</th></tr>
 <tr><td>Scale pop-up</td><td>QR <span class="mono">utm_source=popup-mess</span> + code WEIGH</td><td>150 sign-ups · 60 first pickups</td></tr>
 <tr><td>15 hostel posters</td><td>One QR per poster (poster-h1-lift, poster-h1-laundry…)</td><td>Best 3 locations get reprinted</td></tr>
 <tr><td>Lost Sock Wall</td><td>Code word SOCK at the desk</td><td>20 redemptions</td></tr></table>
</div>
<div>
 <div class="card c" style="font-size:8.6pt"><span class="hand cy">ATL planning sheet</span>
 <table><tr><td>Name</td><td>Avin Dev</td></tr><tr><td>Brand</td><td>Unimade</td></tr><tr><td>Budget</td><td><b>₹6,000</b></td></tr><tr><td>1. Promise</td><td>Get your Sunday back.</td></tr><tr><td>2. Channel & place</td><td>Campus pop-up + hostel lobby posters</td></tr></table>
 <b>3. Split 60 / 30 / 10</b>
 <table><tr><th>Bucket</th><th>What</th><th class="n">₹</th></tr>
 <tr><td><span class="pill pg">60% safe</span></td><td>15 A3 QR posters (₹120) + 2 standees at hostel desks (₹900 each)</td><td class="n">3,600</td></tr>
 <tr><td><span class="pill pc">30% test</span></td><td>Weigh Your Week: scale ₹600, props + bags ₹700, tally board + tags ₹500</td><td class="n">1,800</td></tr>
 <tr><td><span class="pill pk">10% wild</span></td><td>Lost Sock Wall: odd socks pinned to a board, "Lost one? Never again."</td><td class="n">600</td></tr>
 <tr class="tot"><td>Total</td><td></td><td class="n">6,000</td></tr></table>
 <b>4. How we'll count:</b> QR per location, code word per element, WhatsApp opt-in link.<br>
 <span class="tiny">Check: ✓ one promise ✓ one audience ✓ the split adds up ✓ every response is countable</span></div>
 <img class="doodle" src="{D('banner-chaos')}" style="width:100%;margin-top:3mm;border-radius:4mm">
</div></div>
"""))

# ---------------- 15. S18 GTM ----------------
pages.append(page(15, "S18 · GTM media plan", head("9 · from session 18", "Final GTM media plan sheet", "<b>Brief:</b> the final go-to-market media plan, including at least one conversational commerce channel, with a stated ROAS and MER target.") + f"""
<table><tr><th>Funnel column</th><th>Job</th><th>Channels and activity</th><th class="n">Share</th><th class="n">₹ (90 days)</th><th>Judged by</th></tr>
<tr><td><span class="pill pp">Paid</span></td><td>Find new students fast</td><td>Meta Reels (2 km, 17–24) · Google "near me" · 6 campus creators (paid in barter + ₹500)</td><td class="n">47%</td><td class="n">{inr(M['buckets']['Paid'])}</td><td>ROAS vs {M['be_roas']}</td></tr>
<tr><td><span class="pill py">Organic / earned</span></td><td>Build trust and familiarity</td><td>Weigh Your Week + posters · survey-based press note · blog + GBP · IG posts 3–4 a week</td><td class="n">30%</td><td class="n">{inr(M['buckets']['Earned'] + M['buckets']['Owned'])}</td><td>QR scans, awareness %</td></tr>
<tr><td><span class="pill pk">Conversational</span></td><td>Turn a first order into a habit</td><td><b>WhatsApp Business</b> (catalog, labels, pickup reminders) · email newsletter · referral credits</td><td class="n">23%</td><td class="n">{inr(M['buckets']['Conversational'])}</td><td>Repeat rate, MER</td></tr>
<tr class="tot"><td>Total</td><td></td><td></td><td class="n">100%</td><td class="n">{inr(T['mkt'])}</td><td></td></tr></table>
<div class="g4" style="margin:3mm 0">
 <div class="card v kpi"><div class="k">Target paid ROAS</div><div class="v">≥ 5.0</div><div class="tiny">simulated {M['paid_tot']['roas']}</div></div>
 <div class="card c kpi"><div class="k">Target MER</div><div class="v">≥ 8.0</div><div class="tiny">simulated {T['mer']} = {inr(T['gmv'])} ÷ {inr(T['mkt'])}</div></div>
 <div class="card y kpi"><div class="k">Break-even ROAS</div><div class="v">{M['be_roas']}</div><div class="tiny">1 ÷ {M['gm']} gross margin</div></div>
 <div class="card p kpi"><div class="k">Pass / fail</div><div class="v" style="color:#86efac">Pass</div><div class="tiny">paid ROAS above break-even and MER at or above target</div></div>
</div>
<h3>Conversational commerce: the WhatsApp flow</h3>
<div class="g3">
 <div class="card"><span class="pill pc">1 · First message</span><p class="small" style="margin-top:1.5mm">"Hi Riya, it's Avin from Unimade (MU students). Thanks for scanning at the mess! Your first 2 kg are free. Pickup is Thursday 6–8 pm at your hostel desk. <b>Reply 1 to book.</b> Reply STOP to opt out."</p></div>
 <div class="card"><span class="pill py">2 · Nudge (day 6, no booking)</span><p class="small" style="margin-top:1.5mm">"Sunday's coming. Want us to take the pile this Thursday? <b>Reply 1</b> and drop the bag at the desk. STOP to opt out."</p></div>
 <div class="card"><span class="pill pk">3 · After the order</span><p class="small" style="margin-top:1.5mm">"Your 4.6 kg is back, folded, at the desk. How did we do? <b>Reply 1–5.</b> Want the same every week? The Laundry Pass is ₹499 for 8 kg. STOP to opt out."</p></div>
</div>
<p class="small muted" style="margin-top:2mm"><b>Setup:</b> WhatsApp Business app on a new SIM: profile, a catalog of 7 services with prices, a greeting message, quick replies, labels (New / Paid / Pass / Repeat) and an away message. Broadcast lists max out at 256 saved contacts, so once we pass about 250 opt-ins (mid-January) we move to an API tool (AiSensy or Interakt) <span class="est">(about ₹1,000/month, est.)</span>. One action per message, and always a way to opt out.</p>
"""))

# ---------------- 16. S19 DASHBOARD ----------------
wk = [0, 3, 12, 4, 1, 0, 3, 14, 22, 31, 38, 44, 52, 58]
mx = max(wk)
pts = " ".join(f"{10 + i * 22},{110 - v / mx * 90}" for i, v in enumerate(wk))
svg = f"""<svg viewBox="0 0 310 125" style="width:100%"><polyline points="{pts}" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
{''.join(f'<circle cx="{10 + i * 22}" cy="{110 - v / mx * 90}" r="2" fill="#22d3ee"/>' for i, v in enumerate(wk))}
<line x1="5" y1="110" x2="305" y2="110" stroke="#ccc"/>{''.join(f'<text x="{10 + i * 22}" y="121" font-size="6" text-anchor="middle" fill="#666">W{i + 1}</text>' for i in range(14))}
<text x="300" y="{110 - 58 / mx * 90 - 5}" font-size="8" text-anchor="end" fill="#7c3aed" font-weight="700">58 / week</text></svg>"""
pages.append(page(16, "S19 · Tracking dashboard", head("10 · from session 19", "Demo dashboard: label it, count it, read it", "<b>Brief:</b> a demo dashboard showing our 3 UTM-tagged links, 3 Pixel-tracked actions and our chosen GA north star metric. Figures are <span class='est'>demo data</span>, simulated to match p. 8.") + f"""
<div class="mock" style="position:relative;padding:0">
 <div class="bar2"><b>Analytics · unimade.vercel.app · Unimade campus launch</b><span>Last 90 days (simulated)</span></div>
 <div class="stamp">DEMO DATA</div>
 <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:3mm;padding:3mm">
  <div style="background:#fff;border-radius:2mm;padding:3mm"><div style="font-size:7.5pt;color:#5f6368">★ NORTH STAR · key event</div><b style="font-size:11pt">Repeat pickups per week</b><div style="font-size:7.5pt;color:#5f6368">bookings by students who have booked before</div>{svg}
   <div style="font-size:7.4pt;color:#5f6368">W2–3 = end-terms · W4–6 = winter break dip · W8 = Weigh Your Week · W11+ = passes</div></div>
  <div style="background:#fff;border-radius:2mm;padding:3mm"><div style="font-size:7.5pt;color:#5f6368">EVENTS · Meta Pixel + GA4</div>
   <table style="font-size:8pt;color:#202124"><tr><th style="color:#5f6368;border-color:#ddd">Pixel standard event</th><th style="color:#5f6368;border-color:#ddd">Fires when</th><th class="n" style="color:#5f6368;border-color:#ddd">Count</th></tr>
   <tr><td style="border-color:#eee"><b>ViewContent</b></td><td style="border-color:#eee">views price / laundry page</td><td class="n" style="border-color:#eee">4,960</td></tr>
   <tr><td style="border-color:#eee"><b>Contact</b></td><td style="border-color:#eee">taps "Book on WhatsApp"</td><td class="n" style="border-color:#eee">1,640</td></tr>
   <tr><td style="border-color:#eee"><b>Purchase</b></td><td style="border-color:#eee">pays the UPI link for a pickup</td><td class="n" style="border-color:#eee">1,262</td></tr></table>
   <div style="font-size:7.4pt;color:#5f6368">Look → start → finish: three different steps, each tied to a decision (fix the page / fix the WhatsApp reply / fix the price).</div></div>
 </div>
 <div style="padding:0 3mm 3mm"><div style="background:#fff;border-radius:2mm;padding:3mm"><div style="font-size:7.5pt;color:#5f6368">ACQUISITION · session source / medium / campaign</div>
  <table style="font-size:7.9pt;color:#202124"><tr><th style="color:#5f6368;border-color:#ddd">Link</th><th style="color:#5f6368;border-color:#ddd">UTM-tagged URL</th><th class="n" style="color:#5f6368;border-color:#ddd">Sessions</th><th class="n" style="color:#5f6368;border-color:#ddd">Purchases</th></tr>
  <tr><td style="border-color:#eee"><span class="pill pp">Paid</span></td><td style="border-color:#eee;font-family:Consolas;font-size:7.2pt">unimade.vercel.app/product?utm_source=instagram&amp;utm_medium=cpc&amp;utm_campaign=sunday-back</td><td class="n" style="border-color:#eee">857</td><td class="n" style="border-color:#eee">36</td></tr>
  <tr><td style="border-color:#eee"><span class="pill py">Organic</span></td><td style="border-color:#eee;font-family:Consolas;font-size:7.2pt">unimade.vercel.app/product?utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=sunday-back</td><td class="n" style="border-color:#eee">1,120</td><td class="n" style="border-color:#eee">58</td></tr>
  <tr><td style="border-color:#eee"><span class="pill pk">WhatsApp</span></td><td style="border-color:#eee;font-family:Consolas;font-size:7.2pt">unimade.vercel.app/product?utm_source=whatsapp&amp;utm_medium=message&amp;utm_campaign=sunday-back</td><td class="n" style="border-color:#eee">1,410</td><td class="n" style="border-color:#eee">171</td></tr></table></div></div>
</div>
<div class="g3" style="margin-top:3.5mm">
 <div class="card v"><b>Naming rule</b><br><span class="small muted">All lowercase, no spaces, hyphens only. Source = where the click came from (instagram, google, whatsapp, poster-h1-lift). Medium = cpc / social / message / offline. One campaign name per push.</span></div>
 <div class="card c"><b>Why repeat pickups, not purchases?</b><br><span class="small muted">GA defaults to purchases. But we lose money on a first order after ad costs (first-order ROAS 1.8), and we earn on the second. A habit business should count the habit.</span></div>
 <div class="card y"><b>Moment of truth</b><br><span class="small muted">Every Monday we check GA's purchases against our UPI settlements and the WhatsApp labels. If they disagree, the payment records win.</span></div>
</div>
"""))

# ---------------- 17. SAMPLE ASSETS ----------------
pages.append(page(17, "Sample media assets", head("3 · sample media assets", "Two creatives from the plan", "<b>Brief (optional):</b> one or two creatives or ad copies used in the plan, to show they fit the strategy.") + f"""
<div style="display:grid;grid-template-columns:88mm 1fr;gap:6mm">
 <div style="background:linear-gradient(160deg,#1a0b2e,#050506 60%);border:1px solid rgba(168,85,247,.5);border-radius:4mm;height:124mm;position:relative;overflow:hidden;padding:7mm">
  <div class="hand" style="font-size:16pt">a public service announcement for hostel 1</div>
  <div class="disp" style="font-size:34pt;line-height:.92;margin-top:2mm">Get your<br><span class="grad">Sunday back.</span></div>
  <img class="doodle" src="{D('laundry')}" style="position:absolute;right:5mm;top:60mm;width:32mm">
  <div style="position:absolute;left:7mm;bottom:28mm;width:42mm;font-size:9pt;color:#d4d4d8">Drop your bag at the hostel desk Mon or Thu. Back washed and folded in 48 hours.<br><b style="color:#fff;font-size:13pt">₹69/kg · first 2 kg free</b></div>
  <div style="position:absolute;left:7mm;bottom:7mm;display:flex;gap:3mm;align-items:center"><div style="width:17mm;height:17mm;background:#fff;border-radius:1.5mm;display:grid;place-items:center;color:#000;font-size:6pt;text-align:center">QR<br>poster-h1-lift</div><div class="small">scan → WhatsApp<br><b>unimade</b> · made by students</div></div>
 </div>
 <div>
  <span class="hand">creative 1 · A3 hostel poster (ATL, p. 14)</span>
  <p class="small muted">It's the SMP in 4 words, one offer, and one action. Each poster gets its own QR so we can compare locations. The tone is the site's: dark, doodled, a bit cheeky, written by students for students.</p>
  <span class="hand cy">creative 2 · 15-second Reel (Meta, p. 10)</span>
  <table style="margin-top:1mm"><tr><th>Time</th><th>Shot</th><th>On-screen text</th></tr>
  <tr><td>0–3 s</td><td>Close-up: a laundry pile on a hostel bed, a phone shows SUN 11:02 am</td><td><b>It's Sunday. The pile won.</b></td></tr>
  <tr><td>3–7 s</td><td>Riya drops a numbered Unimade bag at the hostel desk and walks off to friends</td><td>We pick it up from your hostel desk.</td></tr>
  <tr><td>7–11 s</td><td>Two days later: a folded stack comes back in the same bag</td><td>Back folded in 48h. ₹69/kg.</td></tr>
  <tr><td>11–15 s</td><td>A phone taps "Book on WhatsApp" with a "Reply 1" chat</td><td><b>First 2 kg free →</b></td></tr></table>
  <p class="small muted">Stop (a relatable mess in the first 3 seconds) · Say (one benefit, in student words) · Do (one CTA). 9:16 for Reels and Stories, with a 4:5 cut for the feed.</p>
  <div class="card v"><b>Ad copy (Meta primary text)</b><br><span class="small">Laundry day is optional now. Drop your bag at the hostel desk, get it back folded in 48 hours. ₹69/kg, first 2 kg free. Made by MU students.</span></div>
 </div>
</div>
"""))

# ---------------- 18. ASSUMPTIONS & SOURCES ----------------
pages.append(page(18, "Assumptions & sources", head("keeping ourselves honest", "Assumptions, and what replaces them") + f"""
<table><tr><th>Assumption</th><th>Value used</th><th>How and when we'll check it</th></tr>
<tr><td>Students living in hostel / PG</td><td class="est">65% (~{c['residents']:,})</td><td>Week-1 survey, 24–30 Nov</td></tr>
<tr><td>Laundry per student per month</td><td class="est">8 kg</td><td>Weigh 30 bags at one hostel desk</td></tr>
<tr><td>Partner bulk rate</td><td class="est">₹45/kg (walk away above ₹50)</td><td>3 laundromat quotes in Week 1</td></tr>
<tr><td>Cleaner rate per hostel room</td><td class="est">₹210 per 45 min</td><td>2 local cleaners, trial morning in Dec</td></tr>
<tr><td>Meta CPC / click→paid</td><td class="est">₹7 / 4.2%</td><td>Live ₹2,000 pilot, 1–13 Dec (CP4)</td></tr>
<tr><td>Google CPC / click→paid</td><td class="est">₹18 / 6%</td><td>Live ₹2,000 pilot, 1–14 Dec (CP4)</td></tr>
<tr><td>Month-1 / month-2 return rate</td><td class="est">55% / 48%</td><td>January cohort table (S20)</td></tr>
<tr><td>Active student spend</td><td class="est">₹450 (Dec) → ₹820 (Feb)</td><td>UPI settlements, weekly</td></tr>
<tr><td>Kit COGS</td><td class="est">₹250</td><td>2 wholesale quotes (Sadar Bazaar / IndiaMART)</td></tr></table>
<h3>Sources</h3>
<ul class="small muted">
<li>LBB, "So Fresh And So Clean: Laundry Services In Gurgaon" (Dhobi Xpress ₹75/kg with 5 kg minimum and 10–20% off advance plans; Pick My Laundry from ₹59/kg). lbb.in/delhi/laundry-services-in-gurgaon</li>
<li>Urban Company Gurugram listing pages: bedroom cleaning from ₹799 (Sector 45), bathroom cleaning ₹579 (Sector 59). urbancompany.com</li>
<li>Gurugram tiffin pricing from blog and provider listings: ₹2,000–3,500/month for one meal a day, ₹3,000–6,000 for lunch + dinner. Indicative only.</li>
<li>Course frameworks, Scaling a D2C Business (Masters' Union, Sessions 13–20): 1 Goal 1 Audience 1 Creative; Buyer Intent Ladder; 3-Pillar Blog Map and Extractable Answer Test; Title-Bullets-Trust, the 65% Gross Margin Gate and the ROAS Trap; SMP and 60/30/10; the 3-Channel Funnel with ROAS, MER and break-even ROAS; the Tracking Triangle; CAC:LTV.</li>
<li>Quick-commerce costs (Blinkit ₹25,000/SKU/state; commission + ads ≈ 30–35%) as reported in the Session 16 deck, not official rate cards.</li></ul>
<div class="card v" style="margin-top:4mm;display:flex;gap:4mm;align-items:center"><img class="doodle" src="{D('pick')}" style="width:24mm"><div><span class="hand">what we'd do with ₹1 more</span><br><span class="small">Put it into whichever of Meta, creators or WhatsApp shows the best 14-day ROAS in the December pilot. We won't decide that until we have the data, and that's what Checkpoint 4 is for.</span></div></div>
"""))

html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Unimade · Checkpoint 3</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Caveat:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=block" rel="stylesheet">
<style>{CSS}</style></head><body>{''.join(pages)}</body></html>"""
out_html = os.path.join(HERE, "Unimade_Checkpoint3.html")
open(out_html, "w", encoding="utf-8").write(html)
out_pdf = os.path.join(HERE, "Unimade_Checkpoint3.pdf")
edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
subprocess.run([edge, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=8000",
                "--allow-file-access-from-files", f"--print-to-pdf={out_pdf}", "file:///" + out_html.replace("\\", "/")], check=True, timeout=180)
print("pages:", len(pages), "intent words:", INTENT_WORDS, "PDF:", out_pdf, os.path.getsize(out_pdf))
