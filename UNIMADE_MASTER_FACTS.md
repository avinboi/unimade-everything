# Unimade: everything in one place

*Compiled 24 Nov 2026. Every figure below comes from the files in this folder. All prices and forecasts are **planning assumptions**, not real results. There are no paying customers yet.*

---

## 1. What Unimade is

- **Name:** Unimade (voice dictation sometimes turns it into UniMate, GiniMade or Unimed).
- **Tagline:** "College life. Made easier." The Instagram bio and CP3 cover use **"MU life, sorted."**
- **What it does:** a multi-service **student-life platform** for hostel and PG students. It connects students with verified partner vendors and brands for laundry, food/tiffin, PG finding, cleaning, storage, errands, internships and deals, and earns commission. **It is a platform, not a laundry business.** Laundry is only the first service to launch.
- **Course:** Masters' Union, "Scaling a D2C Business" (20 sessions, checkpoints CP1–CP4).
- **Team:** Avin Dev, Danni Khanna, Pradnya Oberoi, Zayra Siddiqui, Khushi Asija. Avin does most of the work.
- **Website:** https://unimade.vercel.app (Next.js; source in `01-website-source`; GitHub repo deploys to Vercel from `main`).
- **Instagram:** @_unimade · **Email:** uni.madee@gmail.com · **LinkedIn:** linkedin.com/company/unimade
- **Target:** Masters' Union / Gurugram campus cluster. Plan assumes about **1,500 students** on one campus, **65% resident** (about **1,000 residents**).

### Services shown on the website (7)
Laundry · Food (tiffin) · Cleaning · Storage · Errands · Internships · Student Deals

### v2 plan: 12 services in 3 waves
| Wave | When | Services | Target |
|---|---|---|---|
| 1 | Nov 2026 – Jan 2027 | Food (tiffin + where-to-eat deals), Laundry, PG finder + roommate matching | 500 students, 15+ partners, first 6 PG placements |
| 2 | Feb – May 2027 | Cleaning & repairs, Storage & moving (Apr–May), Student deals + first brand campaigns | 1,300 students, 30+ partners, 2 brand deals |
| 3 | Jun – Aug 2027 | Move-in Kit, freshers' bundle, health (clinic + pharmacy), internships, community | 2,800 students, 100+ PG placements in the year, 200 kits |

---

## 2. Pricing history (four versions)

### A. Original newsletter / pitch (Sep 2026)
- Service fee **₹50 per order** + delivery **₹30 per order**. Partner commission is charged on the vendor side.
- **Unimade+** membership: **₹199/month**.
- v1 plan's critique: on a ₹200 laundry order that adds up to ₹280, a **40% markup**.
- Website pricing page currently shows **"₹ soon"**.

### B. v1 Business Plan (2 Nov 2026, superseded). Laundry-led.
| Item | Price | Key numbers |
|---|---|---|
| Laundry Pass | **₹999/month** | 4 pickups × 5 kg (20 kg cap), about 85% used (17 kg). Student pays ₹50/kg. Partner rate ₹32/kg, runner ₹20/pickup, packaging ₹15, gateway 2%, damage reserve 2%. Variable cost ₹679, **contribution ₹320 (32%)**, GM 45.5%, break-even ROAS 2.2 (course) / 3.12 (full). 84 subs cover ₹27k fixed costs |
| Pay-per-pickup | **₹299** (up to 5 kg) | cost ₹186, contribution ₹113 (37.8%) |
| Hostel Starter Kit | **₹2,999 MRP** (incl. GST) | Net ₹2,678 after 12% GST; COGS ₹900 for 10 items; packaging ₹90; shipping ₹110; contribution ₹1,384 (51.7%); **GM 66.4%**; BE ROAS 1.51 (course) / 1.93 net / 2.17 gross. Sold on Amazon instead, contribution falls to ₹864 |
| LTV / CAC | 6 active months; LTV ₹1,920; CAC target ₹300; **LTV:CAC 6.4**; payback 0.9 months |
| 12-month totals (Nov 26–Oct 27) | Revenue ₹24.23 L (laundry ₹10.84 L + kits ₹13.39 L); contribution ₹10.50 L; fixed ₹2.91 L; marketing ₹3.42 L; **profit ₹4.17 L**; MER 7.1; lowest cash −₹89,568; bad case (half volume) −₹1,07,853; inventory peak ₹2.97 L |

### C. v2 Business Plan (current long-term plan). Commission marketplace.
Six revenue streams: commissions, PG success fees, brand campaigns, featured listings, own Move-in Kit, deals.

| Category | Avg order | Unimade take | Revenue/txn | Net/txn |
|---|---|---|---|---|
| Laundry (partner laundromats) | ₹350 | 15% | ₹52.5 | ₹45.5 |
| Tiffin / meal plans | ₹3,500 | 10% | ₹350 | ₹280 |
| Cleaning & repairs | ₹400 | 20% | ₹80 | ₹72 |
| Storage & moving | ₹3,000 | 15% | ₹450 | ₹390 |
| **PG placement** (owner pays) | rent ₹12,000 | 50% of 1 month's rent | ₹6,000 | ₹3,800 (after ₹1,000 ambassador payout + ₹1,200 bad-debt reserve) |
| Brand campaign | ₹20,000 fee | 100% | ₹20,000 | ₹15,000 (₹5,000 running cost) |
| Featured partner listing | ₹1,499/month | 100% | ₹1,499 | ₹1,499 |
| Move-in Kit (own product) | ₹2,999 MRP | n/a | ₹2,678 net | ₹1,384 contribution, GM 66.4% |

Payment gateway cost is 2% of any money Unimade collects.

**12-month totals (Nov 26 – Oct 27):** GMV ₹59.07 L · revenue ₹19.90 L · net ₹13.65 L · fixed ₹4.91 L · marketing ₹3.12 L · **profit ₹5.62 L** · MER 6.4 · blended take 33.7% · lowest cash **−₹28,825** (Dec 26) · 102 PG placements · Oct-27 ARPU ₹58/user.

**Share of net by stream:** PG placement 28% (₹3.88 L) · Move-in Kit 22% (₹3.04 L) · Tiffin 14% (₹1.91 L) · Featured listings 11% (₹1.48 L) · Laundry 10% (₹1.33 L) · Brand campaigns 8% (₹1.05 L) · Cleaning 4% · Storage 3%.

A typical active student (laundry 3× + a tiffin plan + 1 home service) earns Unimade **₹488 net/month**. Leakage risk: if 40% of 650 laundry orders go direct to the vendor, Unimade loses ₹11,830/month.

**Users ramp (cumulative verified students):** 150 → 250 → 500 → 750 → 1,000 → 1,200 → 1,300 → 1,500 → 2,100 → 2,800 → 3,200 → 3,500.

**Fixed costs:** ₹5k/month (Nov–Dec) → ₹30k (Jan, adds a part-time ops associate) → ₹32k → ₹45k (Jun) → ₹70k (Jul on: 2 ops, 1 PG field exec, store room). Founder unpaid.

**Launch ATL budget (S17):** ₹15,000. 60% "safe bet" (₹9,000) on 15 posters in hostels, messes and PGs plus table tents at 3 canteens ("College life. Sorted. Scan →"), each with its own QR code that opens WhatsApp with a spot code.

**90-day stop rules:** cancel or re-pick Wave 1 if food, laundry or housing isn't in students' top 3 needs; if under 25% of 150 students book anything, fix the offer; partner rating must be ≥ 4.3; at 2 Feb decide green (Wave 2) or red.

### D. Checkpoint 3 media plan (19 Nov 2026, submitted). One campus, 90 days, managed marketplace earning the spread.

**Price card** (student price / partner payout / Unimade keeps):
| Service | Unit | Price | Partner gets | Unimade keeps | Margin | Market rate |
|---|---|---|---|---|---|---|
| Wash & Fold | per kg, min 4 kg | **₹69** | ₹45 | ₹20.62 | 29.9% | ₹59–75/kg |
| **Laundry Pass** | 8 kg/month, 2 pickups | **₹499** | ₹360 | ₹113.02 | 22.6% | ₹470–600 |
| Wash & Iron | per kg, min 4 kg | **₹89** | ₹60 | ₹25.22 | 28.3% | ₹90–120/kg |
| Room Clean | 1 room, 45 min | **₹299** | ₹210 | ₹83.02 | 27.8% | ₹799 (Urban Company bedroom) |
| Bathroom Clean | 1 bathroom, 45 min | **₹249** | ₹175 | ₹69.02 | 27.7% | ₹579 (UC) |
| Tiffin Month | lunch + dinner, veg, 26 days | **₹3,999** | ₹3,519 | ₹400.02 | 10.0% | ₹3,000–6,000 |
| Tiffin Trial | 5 meals | **₹449** | ₹395 | ₹45.02 | 10.0% | ₹90–100/meal |

(2% gateway cost; laundry carries an extra ₹2/kg and the pass an extra ₹16 for other costs.)

**Laundry Day Kit** (own product, for marketplace listing): ₹749 (MRP ₹899), COGS ₹250, **GM 66.6%**. On a marketplace at a 10% commission, ₹20 fixed fee, ₹60 shipping, 18% GST on fees and 1% TCS, the payout is ₹558.7 and ₹308.7 is left after COGS. On quick commerce (33% cut), ₹251.8 is left.

**Blended margin:** mix is laundry 68% / cleaning 14% / food 14% / kit 4%, so **blended GM is 26%** and break-even ROAS is **3.83**.
Waitlist offer: first **2 kg free**. Pickup twice a week from the hostel/PG desk; clothes come back folded within 48 hours.

**90-day plan (Dec–Feb), ₹30,000 total marketing:**
| Month | New | Returning | Active | GMV | Unimade keeps | Marketing | Contribution | MER |
|---|---|---|---|---|---|---|---|---|
| Dec | 80 | 0 | 80 | ₹36,000 | ₹9,396 | ₹9,000 | −₹1,104 | 4.0 |
| Jan | 170 | 44 | 214 | ₹1,62,640 | ₹42,449 | ₹14,000 | ₹26,949 | 11.6 |
| Feb | 110 | 132 | 242 | ₹1,98,440 | ₹51,793 | ₹7,000 | ₹43,293 | 28.3 |
| **Total** | **360** | | | **₹3,97,080** | **₹1,03,638** | **₹30,000** | **₹69,138** | 13.2 |

Retention: 55% reorder after 1 month, 48% after 2. Fixed costs are ₹1,500/month. Blended CAC is **₹83**. Customers reached are 36% of residents. ROI is 2.5×. Each customer spends ₹950 over 90 days.

**Paid channels (simulated):**
| Channel | Spend | CPC | Clicks | CVR | Customers | CAC | ROAS |
|---|---|---|---|---|---|---|---|
| Meta (IG Reels + Stories) | ₹6,000 | ₹7 | 857 | 4.2% | 36 | ₹167 | 5.7 (first-order 1.8) |
| Google Search | ₹4,000 | ₹18 | 222 | 6.0% | 13 | ₹308 | 3.1 (first-order 1.0) |
| Campus creators (6 nano) | ₹4,000 | n/a | n/a | n/a | 42 | ₹95 | 10.0 |
| **Paid total** | ₹14,000 | | | | 91 (25% of new) | | 6.2 |

**LTV:** ₹310 order × 10 orders/year × 26% = **₹809**. LTV:CAC is 9.7 blended and 4.8 on Meta.

**Budget by channel (Dec / Jan / Feb = total):**
| Channel | Bucket | Dec | Jan | Feb | Total |
|---|---|---|---|---|---|
| Meta Ads | Paid | 2,000 | 3,000 | 1,000 | 6,000 |
| Google Search Ads | Paid | 2,000 | 0 | 2,000 | 4,000 |
| Campus creators | Paid | 1,000 | 3,000 | 0 | 4,000 |
| ATL / offline activation | Earned | 1,500 | 4,500 | 0 | 6,000 |
| PR & campus partnerships | Earned | 500 | 1,000 | 0 | 1,500 |
| Content & SEO | Owned | 500 | 500 | 500 | 1,500 |
| WhatsApp + email | Conversational | 500 | 1,500 | 1,500 | 3,500 |
| Referral & first-order credits | Conversational | 1,000 | 500 | 2,000 | 3,500 |
| **Total** | | 9,000 | 14,000 | 7,000 | **30,000** |

By bucket: Paid ₹14,000 · Earned ₹7,500 · Owned ₹1,500 · Conversational ₹7,000.

### Decisions made after CP3 (24 Nov 2026), apply from CP4 on
The submitted CP3 files stay as submitted. CP4 must explain these changes (the brief requires it).
- **Laundry Pass (₹499) is dropped.** The owner doesn't like it. Laundry is sold per kg (₹69 wash & fold, ₹89 wash & iron).
- **Laundry Day Kit is dropped** (decided 24 Nov). Its detergent/clips are for students who wash their own clothes, which contradicts the service. Only the mesh bags survive, as a Pass Plus perk. Consequence: Unimade has no product that clears the S16 65% gate; for CP4/S16 say so honestly (verdict "fails", services are a commission business) instead of relying on a kit.
- **Subscription = a monthly credits pass in two tiers** (decided 24 Nov; replaces the ₹400 Unimade+ idea and the old ₹199 / v2 ₹149 ideas). Credits reset **one month after the purchase date** (a pass bought on 14 Dec resets on 14 Jan), not on a fixed calendar date. **No rollover.** Students see what's left ("3 of 8 kg left") in a WhatsApp message after every booking or on "BAL"; a site/app dashboard comes later. Per-order booking stays available for non-members.

  | | Pass ₹799/month | Pass Plus ₹1,500/month |
  |---|---|---|
  | Laundry wash & fold | 2 pickups, 8 kg | 3 pickups, 12 kg |
  | Room clean | 1 | 1 |
  | Bathroom clean | none | 1 |
  | Errand runs | 1 | 2 |
  | Express 24-hour return (normal is 48 h) | 1 | 1 |
  | Bedding wash (bedsheets + pillow covers, or 1 blanket) | none | 1 |
  | Ironing on one pickup (upgrade to wash & iron) | none | 1 |
  | Worth if bought separately | ₹981 | ₹1,865 |
  | Kept if all credits used / 85% used | ₹137 (17%) / ₹234 (29%) | ₹261 (17%) / ₹442 (29%) |

  Both tiers also get: member prices on extra orders (laundry ₹59/kg), discounts at restaurants near college, food-brand deals listed in the app, priority slots in exam weeks, no minimums on extras, holiday pause, clinic/pharmacy discounts, **internship finder** (curated internships and gigs for students, sent weekly on WhatsApp; owner likes this), **first access to new services** as they launch (storage, PG finder and roommate matching, and later services; owner likes this).
  - Unit costs used: laundry ₹47/kg (₹45 partner + ₹2), room ₹210, bathroom ₹175, errand ₹40, express ₹20, bedding wash ~₹100, ironing upgrade ~₹60 (₹15/kg on 4 kg), gateway 2%. Plus was ₹1,299 until the owner raised it to ₹1,500 and added bedding wash + ironing (24 Nov).
  - Restaurant/brand perks are free to Unimade at launch (partners fund them to reach students). Once the user base is big enough (a few hundred active users, after the 90-day launch), brands pay to be listed or featured: v2 assumes ~₹20,000 per brand campaign and ₹1,499/month per featured listing.
  - Margin levers: unused credits (assume ~85% usage, state it), partner volume rate (~₹40/kg for guaranteed pass volume), extra orders at member price.
  - Pass Plus also includes **2 numbered mesh laundry bags** (one for whites, one for colours), given once when a student first joins Plus. One-time cost ~₹100–150 per new Plus member (estimate, no quote yet).
  - Below the S16 65% gate, so it's framed as the retention product. Uptake rates are still to be set in the CP4 model.

### CP4 (due 27 Nov 2026), not started
Brief: `06-course-material/CP4_brief.pdf`. It must reuse the CP3 paid split: **Meta ₹2,000 = cold ₹1,400 + retarget ₹600**; **Google ₹2,000 = laundry ₹1,400 + tiffin/cleaning ₹600**. CP4 does not allow mocked-up screenshots, so it needs real ones.

---

## 3. Market reference prices (Gurugram, 2026, from the blog and CP3)
- Wash and fold costs ₹59–75/kg (Pick My Laundry ₹59/kg; Dhobi Xpress ₹75/kg, 5 kg minimum). Ironing adds ₹10–15 a piece. Prepaid plans are 10–20% cheaper.
- A student makes about 8 kg of laundry a month, so ₹470–600 a month at a service. Hand-washing costs about ₹100 in detergent plus about 8 hours a month.
- Urban Company charges ₹799 to clean a bedroom and ₹579 for a bathroom. Tiffin costs ₹3,000–6,000 a month (₹90–100 per meal).
- These are partly estimates. Check them against real vendor quotes.

---

## 4. Folder map
| Folder | Contents |
|---|---|
| `01-website-source/` | Full Next.js site (git history included, `node_modules` and `.next` left out). Pages: home, product, pricing, about, blog (16 posts, including /blog/hostel-laundry-cost). Brand logo and doodles are in `public/`. Run with `npm install` then `npm run dev`. |
| `02-business-plans/` | `Unimade_Business_Plan.pdf` (v1) and `Unimade_Business_Plan_v2.pdf` (current), their HTML, `model.json`, `model_platform.json`, and the `scripts/` folder (model.py, model_platform.py, render.py). `site_text.txt` is the site copy. |
| `03-checkpoint3-media-plan/` | `Unimade_Checkpoint3.pdf` (submitted CP3), HTML, `model.py` → `model.json`, `build.py`, page PNGs, images. |
| `04-newsletter/` | Welcome / onboarding newsletter (`Unimade-Welcome-Onboard.pdf`, HTML, assets). |
| `05-marketing-posters-ATL/` | ATL posters ("Mom", "Jeans"), the ATL planning sheet, QR code. |
| `06-course-material/` | Course PDFs for all 20 sessions, text versions, `d2c_course_notes.md` (session notes), `CP4_brief.pdf`. |
| `07-misc/` | Old home page snapshot (`unimade_home.html`), retention snapshot image, website QA screenshots. |

**Rebuilding PDFs:** v1/v2 run `python -I scripts/model.py` or `model_platform.py`, then `python -I scripts/render.py report_v2.html Unimade_Business_Plan_v2.pdf model_platform.json` (uses Edge headless). CP3: edit `model.py`, then `python -I build.py`. The pypdf helper libs are in `02-business-plans/lib`. All script paths are relative, so the folder works from any location.
