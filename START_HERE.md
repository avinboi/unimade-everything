# START HERE: Unimade project folder

This folder has everything about **Unimade**, a student-life platform for hostel and PG students, built for the Masters' Union "Scaling a D2C Business" course. You can move it to any computer and it will still work.

## Read in this order
1. **This file:** setup and what's where.
2. **`UNIMADE_MASTER_FACTS.md`:** what Unimade is, every price and every number, all plan versions and the CP4 requirements.
3. **`03-checkpoint3-media-plan/Unimade_Checkpoint3.pdf`:** the latest submitted work (CP3).
4. **`02-business-plans/Unimade_Business_Plan_v2.pdf`:** the long-term plan.

## Folder map
| Folder | What's inside |
|---|---|
| `01-website-source/` | The website's code (Next.js). It's live at https://unimade.vercel.app and the GitHub repo is `avinboi/unimade`. |
| `02-business-plans/` | v1 (old, laundry-led) and v2 (current platform) plans as PDF/HTML, plus the Python models that make every number. |
| `03-checkpoint3-media-plan/` | The CP3 media plan PDF, its model and build script. |
| `04-newsletter/` | The welcome / onboarding newsletter. |
| `05-marketing-posters-ATL/` | Offline (ATL) posters, the planning sheet and the QR code. |
| `06-course-material/` | All 20 course session PDFs and text, the session notes and the CP4 brief. |
| `07-misc/` | The old home page, the retention snapshot and website screenshots. |

You only need software if you want to **run the site or rebuild the PDFs**. To just read, open the PDFs and the `.md` files.

## Setting up the new computer (optional)

### 1. Run the website locally
Install **Node.js 20 or newer** (https://nodejs.org), then:
```
cd 01-website-source
npm install
npm run dev
```
Open http://127.0.0.1:3000.

### 2. Deploy or push the website
In this repo `01-website-source` is a copy. To deploy, clone `github.com/avinboi/unimade` and run the commands below inside that clone, not here.

The site deploys to Vercel on every push to `main` of `github.com/avinboi/unimade`. Install **Git**, sign in to GitHub as `avinboi`, then:
```
cd unimade
git pull        # get the latest first
git add -A && git commit -m "..." && git push
```
Note: `src/components/FloatingBlobs.tsx` and `PaperPlane.tsx` are uncommitted experiments.

### 3. Rebuild the PDFs
Install **Python 3.10 or newer** (https://python.org). The PDFs are printed with **Microsoft Edge**, which Windows already has. On a Mac, change the `edge = ...` line in `03-checkpoint3-media-plan/build.py` and `02-business-plans/scripts/render.py` to `/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge` (or use Chrome's path).

- **CP3:** edit `03-checkpoint3-media-plan/model.py`, then run `python -I model.py` and `python -I build.py`.
- **v2 plan:** in `02-business-plans`, run `python -I scripts/model_platform.py`, then `python -I scripts/render.py report_v2.html Unimade_Business_Plan_v2.pdf model_platform.json`.
- **v1 plan:** in `02-business-plans`, run `python -I scripts/model.py`, then `python -I scripts/render.py report.html Unimade_Business_Plan.pdf`.

All numbers come from the `model*.py` files. Change a number there and rebuild; never edit the PDF by hand.

## Accounts (passwords are NOT in this folder)
- Instagram **@_unimade** · Email **uni.madee@gmail.com** · Vercel and GitHub (**avinboi**) for the site.

## Using Claude / an AI assistant on the new computer
Open this folder in Claude Code. It reads `CLAUDE.md` automatically, so it will understand the project straight away. With other AI tools, give them `CLAUDE.md` and `UNIMADE_MASTER_FACTS.md` first.
