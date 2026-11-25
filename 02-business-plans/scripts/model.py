"""Unimade unit-economics + 12-month model. All amounts in INR.
Run: python -I model.py  -> prints numbers and writes model.json next to the report.
"""
import json, os, sys

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "model.json")

# ---------- Laundry Pass (core service) ----------
L = dict(
    price=999,            # per month, 4 pickups, up to 5 kg each (20 kg cap)
    pickups=4,
    kg_cap=20,
    usage=0.85,           # students use ~85% of the cap on average
    partner_per_kg=32,    # bulk B2B rate negotiated with a local laundromat (VERIFY)
    logistics_per_pickup=20,  # runner cost per bag when batching 15-25 bags per hostel trip
    packaging=15,         # tag + poly bag per month (reusable Unimade laundry bag charged separately / in kit)
    pg_rate=0.02,         # Razorpay-type payment gateway fee
    damage_rate=0.02,     # reserve for lost / damaged clothes
)
kg = L["kg_cap"] * L["usage"]
l_cost = dict(
    partner=kg * L["partner_per_kg"],
    logistics=L["pickups"] * L["logistics_per_pickup"],
    packaging=L["packaging"],
    gateway=L["price"] * L["pg_rate"],
    damage=L["price"] * L["damage_rate"],
)
l_var = sum(l_cost.values())
l_cm = L["price"] - l_var

# Pay-per-pickup (no pass): Rs 299 for up to 5 kg
P = dict(price=299, kg=4.5)
p_cost = P["kg"] * L["partner_per_kg"] + L["logistics_per_pickup"] + 10 + P["price"] * 0.04
p_cm = P["price"] - p_cost

# What the CURRENT published pricing does to a student order
cur = dict(laundry=200, service_fee=50, delivery=30)
cur_total = sum(cur.values())
cur_markup = (cur["service_fee"] + cur["delivery"]) / cur["laundry"]

# ---------- Starter Kit (D2C physical product) ----------
K = dict(
    mrp=2999,             # GST-inclusive selling price
    gst_rate=0.12,        # blended GST across items (bedding 5-12%, plastics/electricals 18%) - VERIFY with CA
    cogs=900,             # wholesale sourcing (Sadar Bazaar / IndiaMART), 10 items, 300-unit batches
    packaging=90,
    shipping=110,         # blended: campus delivery ~40, courier ~150
    pg_rate=0.02,
    returns_rate=0.05,    # returns / replacements reserve as % of net revenue
)
k_net = K["mrp"] / (1 + K["gst_rate"])
k_cost = dict(
    cogs=K["cogs"], packaging=K["packaging"], shipping=K["shipping"],
    gateway=K["mrp"] * K["pg_rate"], returns=k_net * K["returns_rate"],
)
k_var = sum(k_cost.values())
k_cm = k_net - k_var
k_gm = (k_net - K['cogs']) / k_net          # course definition (S16)
k_be_course = 1 / k_gm                     # course break-even ROAS (S18)
l_gm = (L['price'] - l_cost['partner']) / L['price']
k_be_roas = k_net / k_cm           # on net revenue
k_be_roas_gross = K["mrp"] / k_cm  # what Ads Manager shows (GST-inclusive purchase value)

# Same kit sold on Amazon (marketplace) for comparison
A = dict(commission=0.15, closing_fee=40, fba_ship=120)
a_cost = K["cogs"] + K["packaging"] + K["mrp"] * A["commission"] + A["closing_fee"] + A["fba_ship"] + k_net * 0.08
a_cm = k_net - a_cost

# ---------- CAC / LTV for laundry ----------
life_months = 6        # active months per subscriber (academic year with vacation churn)
ltv_cm = l_cm * life_months
cac_target = 300
payback_months = cac_target / l_cm

# ---------- 12-month plan (Nov 2026 - Oct 2027) ----------
months = ["Nov 26", "Dec 26", "Jan 27", "Feb 27", "Mar 27", "Apr 27",
          "May 27", "Jun 27", "Jul 27", "Aug 27", "Sep 27", "Oct 27"]
subs   = [12, 15, 35, 60, 85, 100, 35, 15, 45, 120, 170, 200]   # paying Laundry Pass subs (avg in month)
ppp    = [25, 20, 35, 50, 60, 65, 25, 10, 35, 90, 110, 120]     # pay-per-pickup orders
kits   = [0, 0, 25, 5, 0, 0, 20, 80, 180, 150, 30, 10]         # starter kits sold
fixed  = [8000, 8000, 20000, 22000, 25000, 25000, 15000, 18000, 32000, 38000, 40000, 40000]
mkt    = [5000, 3000, 20000, 12000, 12000, 10000, 15000, 50000, 90000, 80000, 25000, 20000]
# fixed = runner/ops helper, tools, phone, storage space for kit stock, misc. Founder takes no salary in year 1.

buy    = [0, 30, 0, 0, 0, 0, 100, 150, 200, 50, 0, 0]   # kit units purchased (paid upfront)
unit_stock_cost = K["cogs"] + K["packaging"]
rows = []
cum = 0
cash = 0
stock = 0
min_cash = 0
min_cum = 0
for i, m in enumerate(months):
    rev_l = subs[i] * L["price"] + ppp[i] * P["price"]
    rev_k = kits[i] * k_net
    rev = rev_l + rev_k
    cm = subs[i] * l_cm + ppp[i] * p_cm + kits[i] * k_cm
    profit = cm - fixed[i] - mkt[i]
    cum += profit
    min_cum = min(min_cum, cum)
    stock += buy[i] - kits[i]
    # cash: profit already deducts COGS of kits sold; add back that and subtract stock purchased
    cash += profit + kits[i]*unit_stock_cost - buy[i]*unit_stock_cost
    min_cash = min(min_cash, cash)
    mer = rev / mkt[i] if mkt[i] else 0
    rows.append(dict(month=m, subs=subs[i], ppp=ppp[i], kits=kits[i], rev_l=round(rev_l), rev_k=round(rev_k),
                     rev=round(rev), cm=round(cm), fixed=fixed[i], mkt=mkt[i], profit=round(profit),
                     cum=round(cum), cash=round(cash), stock=stock, mer=round(mer, 1)))

tot = {k: sum(r[k] for r in rows) for k in ["rev_l", "rev_k", "rev", "cm", "fixed", "mkt", "profit"]}
tot["mer"] = round(tot["rev"] / tot["mkt"], 1)
inventory_peak = 300 * (K["cogs"] + K["packaging"])  # stock bought ahead of Jun-Aug season

bad = sum(0.5*(subs[i]*l_cm + ppp[i]*p_cm + kits[i]*k_cm) - fixed[i] - mkt[i] for i in range(12))
model = dict(bad_case_profit=round(bad),
    laundry=dict(inputs=L, kg_used=kg, cost=l_cost, var=round(l_var), cm=round(l_cm), cm_pct=round(100 * l_cm / L["price"], 1),
                 per_kg_student=round(L["price"] / L["kg_cap"], 1), gm_pct=round(100*l_gm,1), be_course=round(1/l_gm,2), be_full=round(L['price']/l_cm,2),
                 breakeven_subs_27k=round(27000 / l_cm)),
    ppp=dict(inputs=P, cost=round(p_cost), cm=round(p_cm), cm_pct=round(100 * p_cm / P["price"], 1)),
    current_pricing=dict(inputs=cur, total=cur_total, markup_pct=round(100 * cur_markup)),
    kit=dict(inputs=K, net=round(k_net), gst=round(K["mrp"] - k_net), cost={k: round(v) for k, v in k_cost.items()},
             var=round(k_var), cm=round(k_cm), cm_pct=round(100 * k_cm / k_net, 1),
             gm_pct=round(100*k_gm,1), be_course=round(k_be_course,2), be_roas=round(k_be_roas, 2), be_roas_gross=round(k_be_roas_gross, 2),
             amazon_cm=round(a_cm), amazon_cost=round(a_cost)),
    ltv=dict(life=life_months, ltv_cm=round(ltv_cm), cac_target=cac_target, ltv_cac=round(ltv_cm / cac_target, 1),
             payback=round(payback_months, 1)),
    plan=rows, totals=tot, cash_low=round(min_cash), profit_low=round(min_cum), inventory_peak=round(inventory_peak),
)
json.dump(model, open(OUT, "w"), indent=1)
sys.stdout.reconfigure(encoding="utf-8")
print(json.dumps({k: v for k, v in model.items() if k != "plan"}, indent=1))
for r in rows:
    print(r)
