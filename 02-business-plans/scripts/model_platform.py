"""Unimade v2: student-life platform (commission marketplace) model. All amounts INR.
Run: python -I model_platform.py -> writes ../model_platform.json
"""
import json, os, sys

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "model_platform.json")
PG = 0.02  # payment gateway fee on money Unimade collects

# ---- per-category economics: what Unimade earns on ONE transaction ----
cat = {
    "laundry":  dict(name="Laundry (partner laundromats)", aov=350,  take=0.15, collects=True,  extra_cost=0),
    "food":     dict(name="Tiffin / meal plans", aov=3500, take=0.10, collects=True,  extra_cost=0),
    "home":     dict(name="Cleaning & repairs", aov=400,  take=0.20, collects=True,  extra_cost=0),
    "storage":  dict(name="Storage & moving", aov=3000, take=0.15, collects=True,  extra_cost=0),
    "pg":       dict(name="PG placement (owner pays)", aov=12000, take=0.50, collects=False, extra_cost=2200),
    "brand":    dict(name="Brand campaign", aov=20000, take=1.0, collects=False, extra_cost=5000),
    "featured": dict(name="Featured partner listing", aov=1499, take=1.0, collects=False, extra_cost=0),
}
# pg: success fee = 50% of one month's rent (rent ~₹12,000) paid by the owner; ₹1,000 ambassador payout + ₹1,200 (20%) for owners who never pay.
# brand: campaign fee; ₹5,000 cost of running it (printing, sampling team).
for k, c in cat.items():
    c["gmv"] = c["aov"] if k not in ("brand", "featured") else 0
    c["rev"] = c["aov"] * c["take"]
    c["gateway"] = c["aov"] * PG if c["collects"] else 0
    c["net"] = c["rev"] - c["gateway"] - c["extra_cost"]
    c["net_pct_of_aov"] = round(100 * c["net"] / c["aov"], 1)

# Own D2C product: Unimade Move-in Kit (from v1 model)
kit = dict(mrp=2999, net=2678, cogs=900, var=1294, cm=1384, gm_pct=66.4, be_course=1.51, be_full=1.93)

months = ["Nov 26", "Dec 26", "Jan 27", "Feb 27", "Mar 27", "Apr 27",
          "May 27", "Jun 27", "Jul 27", "Aug 27", "Sep 27", "Oct 27"]
vol = {
    "laundry":  [40, 50, 120, 200, 280, 320, 120, 50, 150, 400, 550, 650],   # orders
    "food":     [5, 8, 20, 35, 50, 60, 25, 10, 40, 110, 150, 170],           # active monthly plans
    "home":     [10, 10, 25, 50, 70, 80, 40, 20, 60, 120, 150, 170],         # bookings
    "storage":  [0, 0, 0, 0, 0, 15, 60, 20, 0, 0, 0, 0],                     # bookings
    "pg":       [0, 1, 5, 3, 2, 3, 6, 15, 30, 25, 8, 4],                     # placements
    "brand":    [0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 2, 1],                        # campaigns
    "featured": [0, 0, 0, 0, 5, 8, 8, 8, 10, 15, 20, 25],                    # paying partners
}
kits = [0, 0, 15, 0, 0, 0, 10, 40, 80, 60, 10, 5]
buy  = [0, 20, 0, 0, 0, 0, 60, 80, 70, 0, 0, 0]       # kit units purchased upfront
users = [150, 250, 500, 750, 1000, 1200, 1300, 1500, 2100, 2800, 3200, 3500]  # verified students (cumulative)
fixed = [5000, 5000, 30000, 30000, 32000, 32000, 32000, 45000, 70000, 70000, 70000, 70000]
# Jan: part-time ops/support associate + tools. Jun on: 2 ops associates, 1 PG field executive, tools, small store room. Founder unpaid.
mkt   = [8000, 4000, 20000, 15000, 15000, 15000, 20000, 40000, 70000, 60000, 25000, 20000]
unit_stock = kit["cogs"] + 90

rows, cum, cash, min_cash = [], 0, 0, 0
for i, m in enumerate(months):
    gmv = sum(vol[k][i] * cat[k]["gmv"] for k in vol) + kits[i] * kit["mrp"]
    rev_cat = {k: vol[k][i] * cat[k]["rev"] for k in vol}
    rev = sum(rev_cat.values()) + kits[i] * kit["net"]
    net = sum(vol[k][i] * cat[k]["net"] for k in vol) + kits[i] * kit["cm"]
    profit = net - fixed[i] - mkt[i]
    cum += profit
    cash += profit + kits[i] * unit_stock - buy[i] * unit_stock
    min_cash = min(min_cash, cash)
    rows.append(dict(month=m, users=users[i], gmv=round(gmv), rev=round(rev), net=round(net), fixed=fixed[i], mkt=mkt[i],
                     profit=round(profit), cash=round(cash), mer=round(rev / mkt[i], 1),
                     pg=vol["pg"][i], laundry=vol["laundry"][i], food=vol["food"][i], kits=kits[i]))

def yr(key):
    return sum(r[key] for r in rows)

by_cat = {k: dict(name=cat[k]["name"], units=sum(vol[k]), rev=round(sum(vol[k]) * cat[k]["rev"]),
                  net=round(sum(vol[k]) * cat[k]["net"])) for k in vol}
by_cat["kit"] = dict(name="Move-in Kit (own product)", units=sum(kits), rev=round(sum(kits) * kit["net"]), net=round(sum(kits) * kit["cm"]))
tot = dict(gmv=yr("gmv"), rev=yr("rev"), net=yr("net"), fixed=yr("fixed"), mkt=yr("mkt"), profit=yr("profit"))
tot["mer"] = round(tot["rev"] / tot["mkt"], 1)
tot["take"] = round(100 * tot["rev"] / tot["gmv"], 1)
for k in by_cat:
    by_cat[k]["share"] = round(100 * by_cat[k]["net"] / tot["net"])
bad = sum(0.5 * (rows[i]["net"]) - fixed[i] - mkt[i] for i in range(12))
oct_ = rows[-1]
arpu_oct = oct_["rev"] / oct_["users"]

# leakage illustration: laundry after 3 months if 40% of students go direct to the vendor
leak = dict(orders=650, leak=0.4, lost=round(650 * 0.4 * cat["laundry"]["net"]))

# A "typical active student" month (uses laundry 3x, a tiffin plan, 1 home service)
student = dict(laundry=3 * cat["laundry"]["net"], food=cat["food"]["net"], home=cat["home"]["net"])
student["total"] = sum(student.values())

model = dict(cat={k: {kk: (round(vv, 1) if isinstance(vv, float) else vv) for kk, vv in c.items()} for k, c in cat.items()},
             kit=kit, plan=rows, by_cat=by_cat, totals=tot, cash_low=round(min_cash), bad=round(bad),
             oct=oct_, arpu_oct=round(arpu_oct), leak=leak, student={k: round(v) for k, v in student.items()},
             pg_year=sum(vol["pg"]))
json.dump(model, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
sys.stdout.reconfigure(encoding="utf-8")
for k, c in cat.items():
    print(k, "rev", c["rev"], "net", round(c["net"]), c["net_pct_of_aov"], "%")
print(json.dumps(by_cat, indent=0, ensure_ascii=False))
print(tot, "cash_low", round(min_cash), "bad", round(bad), "arpu_oct", round(arpu_oct), "student", student)
for r in rows:
    print(r["month"], r["users"], r["gmv"], r["rev"], r["net"], r["profit"], r["cash"], r["mer"])
