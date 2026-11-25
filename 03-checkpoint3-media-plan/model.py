"""Unimade Checkpoint 3 - one source of truth for every number in the PDF.
All figures are planning assumptions (labelled in the PDF), not results."""
import json, os

# ---------- campus ----------
campus = dict(students=1500, resident_share=0.65)
campus["residents"] = round(campus["students"] * campus["resident_share"] / 50) * 50  # ~1,000

# ---------- price card (student price, partner payout, Unimade keeps) ----------
GW = 0.02  # UPI / payment-gateway cost, 2% of what the student pays
def line(name, unit, price, payout, other=0.0, market=""):
    keep = price - payout - price * GW - other
    return dict(name=name, unit=unit, price=price, payout=payout, other=other,
                gateway=round(price * GW, 2), keep=round(keep, 2), margin=round(keep / price * 100, 1), market=market)

prices = {
    "wf":     line("Wash & Fold", "per kg (min 4 kg)", 69, 45, 2, "₹59–75/kg"),
    "pass":   line("Laundry Pass", "8 kg / month, 2 pickups", 499, 360, 16, "₹470–600"),
    "iron":   line("Wash & Iron", "per kg (min 4 kg)", 89, 60, 2, "₹90–120/kg"),
    "room":   line("Room Clean", "1 room, 45 min", 299, 210, 0, "₹799 (UC bedroom)"),
    "bath":   line("Bathroom Clean", "1 bathroom, 45 min", 249, 175, 0, "₹579 (UC)"),
    "tiffin": line("Tiffin Month", "lunch + dinner, veg, 26 days", 3999, 3519, 0, "₹3,000–6,000"),
    "trial":  line("Tiffin Trial", "5 meals", 449, 395, 0, "₹90–100/meal"),
}
kit = dict(name="Unimade Laundry Day Kit", price=749, mrp=899, cogs=250)
kit["gm"] = round((kit["price"] - kit["cogs"]) / kit["price"] * 100, 1)
# S16 illustrative marketplace payout waterfall (course rate card, not a real one)
sp = kit["price"]; comm = 0.10 * sp; fixed = 20; ship = 60; gst = 0.18 * (comm + fixed + ship); tcs = 0.01 * sp
kit["payout"] = round(sp - comm - fixed - ship - gst - tcs, 1)
kit["left"] = round(kit["payout"] - kit["cogs"], 1)
kit["qc_left"] = round(sp - kit["cogs"] - 0.33 * sp, 1)
kit.update(comm=round(comm, 1), fixed=fixed, ship=ship, gst=round(gst, 1), tcs=round(tcs, 1))

# ---------- blended gross margin (Unimade keeps / GMV) ----------
laundry_m = 0.45 * prices["wf"]["margin"] + 0.40 * prices["pass"]["margin"] + 0.15 * prices["iron"]["margin"]
clean_m = (prices["room"]["margin"] + prices["bath"]["margin"]) / 2
food_m = prices["tiffin"]["margin"]
mix = dict(laundry=0.68, cleaning=0.14, food=0.14, kit=0.04)
gm = (mix["laundry"] * laundry_m + mix["cleaning"] * clean_m + mix["food"] * food_m + mix["kit"] * kit["gm"]) / 100
gm = round(gm, 3)
be_roas = round(1 / gm, 2)

# ---------- 3-month campus model ----------
months = ["Dec", "Jan", "Feb"]
new = [80, 170, 110]
ret1, ret2 = 0.55, 0.48           # share of a month's new customers who order again 1 / 2 months later
gmv_per_active = [450, 760, 820]  # Dec is a short exam month; passes lift Feb
mkt = [9000, 14000, 7000]
fixed_cost = 1500                 # domain, Canva, forms, misc tools per month
plan, cum = [], 0
for i, m in enumerate(months):
    returning = (round(new[i - 1] * ret1) if i >= 1 else 0) + (round(new[i - 2] * ret2) if i >= 2 else 0)
    active = new[i] + returning
    gmv = active * gmv_per_active[i]
    keep = round(gmv * gm)
    cum += new[i]
    plan.append(dict(month=m, new=new[i], returning=returning, active=active, cum=cum,
                     repeat_rate=round(returning / active * 100), gmv=gmv, keep=keep, mkt=mkt[i],
                     fixed=fixed_cost, contrib=keep - mkt[i] - fixed_cost, mer=round(gmv / mkt[i], 1)))
tot = dict(new=sum(new), gmv=sum(p["gmv"] for p in plan), keep=sum(p["keep"] for p in plan),
           mkt=sum(mkt), fixed=fixed_cost * 3)
tot["contrib"] = tot["keep"] - tot["mkt"] - tot["fixed"]
tot["mer"] = round(tot["gmv"] / tot["mkt"], 1)
tot["margin_mer"] = round(tot["keep"] / tot["mkt"], 2)
tot["roi"] = round((tot["keep"] - tot["mkt"]) / tot["mkt"], 1)
tot["cac"] = round(tot["mkt"] / tot["new"])
tot["gmv_per_cust"] = 950  # avg 90-day spend of a customer won inside the window (later joiners have less time)
tot["reach_pct"] = round(tot["new"] / campus["residents"] * 100)

# ---------- paid channels (simulated) ----------
def paid(name, spend, cpc, cvr, note):
    clicks = round(spend / cpc)
    cust = round(clicks * cvr)
    rev = cust * tot["gmv_per_cust"]
    first = cust * 300
    return dict(name=name, spend=spend, cpc=cpc, clicks=clicks, cvr=round(cvr * 100, 1), cust=cust,
                cac=round(spend / cust), rev=rev, roas=round(rev / spend, 1), first_roas=round(first / spend, 1), note=note)
paid_ch = [
    paid("Meta (IG Reels + Stories)", 6000, 7, 0.042, "chat, then first pickup"),
    paid("Google Search", 4000, 18, 0.06, "search-light category"),
]
creators = dict(name="Campus creators (6 nano)", spend=4000, cust=42)
creators.update(cac=round(creators["spend"] / creators["cust"]), rev=creators["cust"] * tot["gmv_per_cust"])
creators["roas"] = round(creators["rev"] / creators["spend"], 1)
paid_spend = sum(p["spend"] for p in paid_ch) + creators["spend"]
paid_rev = sum(p["rev"] for p in paid_ch) + creators["rev"]
paid_cust = sum(p["cust"] for p in paid_ch) + creators["cust"]
paid_tot = dict(spend=paid_spend, rev=paid_rev, cust=paid_cust, roas=round(paid_rev / paid_spend, 1),
                share=round(paid_cust / tot["new"] * 100))

# ---------- LTV ----------
ltv = dict(order=310, orders_per_year=10, years=1)
ltv["value"] = round(ltv["order"] * ltv["orders_per_year"] * ltv["years"] * gm)
ltv["ratio_blended"] = round(ltv["value"] / tot["cac"], 1)
ltv["ratio_meta"] = round(ltv["value"] / paid_ch[0]["cac"], 1)

# ---------- budget by channel ----------
budget = [
    # channel, bucket, dec, jan, feb
    ("Meta Ads", "Paid", 2000, 3000, 1000),
    ("Google Search Ads", "Paid", 2000, 0, 2000),
    ("Campus creators", "Paid", 1000, 3000, 0),
    ("ATL / offline activation", "Earned", 1500, 4500, 0),
    ("PR & campus partnerships", "Earned", 500, 1000, 0),
    ("Content & SEO", "Owned", 500, 500, 500),
    ("WhatsApp + email", "Conversational", 500, 1500, 1500),
    ("Referral & first-order credits", "Conversational", 1000, 500, 2000),
]
bud = []
for ch, b, d, j, f in budget:
    bud.append(dict(ch=ch, bucket=b, dec=d, jan=j, feb=f, total=d + j + f, pct=round((d + j + f) / tot["mkt"] * 100, 1)))
assert sum(x["total"] for x in bud) == tot["mkt"], sum(x["total"] for x in bud)
for i, k in enumerate(["dec", "jan", "feb"]):
    assert sum(x[k] for x in bud) == mkt[i], (k, sum(x[k] for x in bud))
buckets = {}
for x in bud:
    buckets[x["bucket"]] = buckets.get(x["bucket"], 0) + x["total"]

out = dict(campus=campus, prices=prices, kit=kit, gm=gm, gm_pct=round(gm * 100), be_roas=be_roas,
           laundry_m=round(laundry_m, 1), clean_m=round(clean_m, 1), food_m=food_m, mix=mix,
           plan=plan, tot=tot, paid=paid_ch, creators=creators, paid_tot=paid_tot, ltv=ltv,
           bud=bud, buckets=buckets)
json.dump(out, open(os.path.join(os.path.dirname(__file__), "model.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
if __name__ == "__main__":
    print("GM", gm, "BE ROAS", be_roas, "laundry", round(laundry_m, 1), "clean", clean_m)
    for k, v in prices.items(): print(k, v["price"], v["keep"], v["margin"])
    print("kit", kit)
    for p in plan: print(p)
    print(tot); print(paid_ch); print(creators); print(paid_tot); print(ltv); print(buckets)
