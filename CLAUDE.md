# Unimade: context for AI assistants

Read `START_HERE.md` and `UNIMADE_MASTER_FACTS.md` before doing anything. `UNIMADE_WHAT_WE_DO.md` is the living list of every product, perk, deal and rule: update it whenever the owner decides something, and answer "what does Unimade do?" from it. `UNIMADE_GLOSSARY.md` explains every business term in plain words; add new terms to it as they come up.

- **Unimade** is a multi-service student-life **platform** (marketplace) for hostel and PG students. It connects them to partner vendors and brands (laundry, tiffin, PG finder, cleaning, storage, errands, internships, deals) and earns commission. **It is NOT a laundry business.** Laundry is just the first service. The owner is firm about this.
- The user dictates by voice, so "UniMate", "GiniMade", "Gili Made" and "Unimed" all mean Unimade.
- It's a Masters' Union "Scaling a D2C Business" course project. Team: Avin Dev (does most of the work), Danni Khanna, Pradnya Oberoi, Zayra Siddiqui, Khushi Asija. Credit all five on deliverables.
- Current state (24 Nov 2026): CP3 media plan submitted. **CP4 is due 27 Nov 2026** (brief: `06-course-material/CP4_brief.pdf`). It must reuse the CP3 paid split: Meta ₹2,000 = cold ₹1,400 + retarget ₹600; Google ₹2,000 = laundry ₹1,400 + tiffin/cleaning ₹600. CP4 does not allow mocked-up screenshots; use real ones.
- Since 24 Nov 2026: the ₹499 Laundry Pass is dropped and the subscription is a two-tier credits pass (Pass ₹799, Pass Plus ₹1,500 incl. 2 mesh bags, no rollover) and the Laundry Day Kit is dropped. Don't edit the submitted CP3 files; apply this from CP4 on and explain the change there. Details in `UNIMADE_MASTER_FACTS.md` under "Decisions made after CP3".
- All prices and forecasts are planning assumptions. There are no real customers or vendor quotes yet. Market prices are partly estimates.
- Numbers live in `model*.py` files. Edit the model, then rebuild (see `START_HERE.md`). Keep every document consistent with the models.
- Course rules and frameworks are in `06-course-material/d2c_course_notes.md`. Follow them in course deliverables.
- Website: `01-website-source` (Next.js 16, Tailwind 4, GSAP, Lenis, Spline). The live site is unimade.vercel.app and pushing to `main` of github.com/avinboi/unimade deploys it. The visual style is a hand-drawn doodle/scrapbook look with a purple brand colour. The cover line is "MU life, sorted."
