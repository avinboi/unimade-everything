const fs = require("fs");
const path = require("path");

const dir = __dirname;
const img = (name) =>
  "data:image/png;base64," +
  fs.readFileSync(path.join(dir, "assets", name)).toString("base64");

const logo = img("logo.png");
const hero = img("hero.png");
const tiffin = img("tiffin.png");
const laundry = img("laundry.png");
const internships = img("internships.png");
const community = img("community.png");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unimade — Welcome onboard</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: #0e0e14;
      color: #f7f7fb;
      font-family: Segoe UI, Helvetica Neue, Arial, sans-serif;
    }
    .page {
      max-width: 720px;
      margin: 0 auto;
      background: #0b0b10;
    }
    img { border: 0; display: block; max-width: 100%; height: auto; }
    a { color: #9fd4f0; }
    @media (max-width: 640px) {
      .pad { padding-left: 18px !important; padding-right: 18px !important; }
      h1 { font-size: 30px !important; }
    }
  </style>
</head>
<body>
  <div class="page">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b10;border-collapse:collapse;">
      <tr>
        <td class="pad" style="padding:22px 28px 18px;background:#050508;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="vertical-align:middle;width:48px;">
                <img src="${logo}" alt="Unimade" width="48" height="48" style="border-radius:50%;" />
              </td>
              <td style="vertical-align:middle;padding-left:12px;">
                <p style="margin:0;font-weight:800;font-size:20px;letter-spacing:0.04em;color:#f7f7fb;">UNIMADE</p>
                <p style="margin:2px 0 0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9fd4f0;">Student OS</p>
              </td>
              <td style="text-align:right;vertical-align:middle;">
                <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#9aa0b4;">Issue 01 · Onboarding</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td><img src="${hero}" alt="Students on campus at dusk" width="720" /></td>
      </tr>
      <tr>
        <td class="pad" style="padding:32px 32px 8px;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#8b5cf6;font-weight:600;">You're in</p>
          <h1 style="margin:0;font-size:40px;line-height:1.05;font-weight:800;color:#f7f7fb;">Welcome onboard.</h1>
          <p style="margin:12px 0 0;font-size:18px;line-height:1.45;color:#9fd4f0;">Your hostel, but easier. One operating system for everyday university life.</p>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:20px 32px 8px;font-size:16px;line-height:1.65;color:#c9cddb;">
          <p style="margin:0 0 14px;">Hey,</p>
          <p style="margin:0 0 14px;">Hostel life shouldn't mean expensive tiffin, a laundry guy who disappears, a dusty trunk with nowhere to go, and five WhatsApp groups that never reply.</p>
          <p style="margin:0;">Unimade is the student-only app that puts cheaper food, laundry, and storage next to cleaning, repairs, campus doctor bookings, internships scraped to your interests, and a community channel that actually belongs to campus.</p>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:24px 32px 4px;">
          <p style="margin:0 0 14px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#8b5cf6;font-weight:600;">Hostel essentials</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td width="50%" valign="top" style="padding:0 8px 16px 0;">
                <img src="${tiffin}" alt="Student tiffin meals" width="320" style="border-radius:12px;" />
                <p style="margin:12px 0 4px;font-size:18px;font-weight:700;color:#f7f7fb;">Tiffin</p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#9aa0b4;">Campus-priced meals from verified providers. Book once. Eat without the vendor roulette.</p>
              </td>
              <td width="50%" valign="top" style="padding:0 0 16px 8px;">
                <img src="${laundry}" alt="Folded laundry ready for pickup" width="320" style="border-radius:12px;" />
                <p style="margin:12px 0 4px;font-size:18px;font-weight:700;color:#f7f7fb;">Laundry</p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#9aa0b4;">Pickup, wash, fold, back to your block. Track it like any other order.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:4px 32px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td width="50%" valign="top" style="padding:0 8px 10px 0;">
                <div style="background:#12121a;border:1px solid #2a2a38;border-radius:12px;padding:16px;">
                  <p style="margin:0 0 4px;color:#9fd4f0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Storage</p>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:#c9cddb;">Holiday trunks, extra bags, semester overflow — short-term storage that actually exists.</p>
                </div>
              </td>
              <td width="50%" valign="top" style="padding:0 0 10px 8px;">
                <div style="background:#12121a;border:1px solid #2a2a38;border-radius:12px;padding:16px;">
                  <p style="margin:0 0 4px;color:#9fd4f0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Cleaning and repairs</p>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:#c9cddb;">Room clean, leaky tap, broken latch. Student-friendly partners, not a mystery uncle.</p>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%" valign="top" style="padding:6px 8px 0 0;">
                <div style="background:#12121a;border:1px solid #2a2a38;border-radius:12px;padding:16px;">
                  <p style="margin:0 0 4px;color:#9fd4f0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Doctor appointments</p>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:#c9cddb;">Book campus doctors without hunting a notice-board number at 11pm.</p>
                </div>
              </td>
              <td width="50%" valign="top" style="padding:6px 0 0 8px;">
                <div style="background:#12121a;border:1px solid #2a2a38;border-radius:12px;padding:16px;">
                  <p style="margin:0 0 4px;color:#9fd4f0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">One booking system</p>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:#c9cddb;">Verified short-term providers. Simple booking and delivery through one app.</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:24px 32px 8px;">
          <img src="${internships}" alt="Internship search on a hostel desk" width="656" style="border-radius:14px;" />
          <p style="margin:16px 0 6px;font-size:22px;font-weight:700;color:#f7f7fb;">Internships, scoured for you</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#c9cddb;">Tell us what you care about. Unimade crawls the internet for roles that match your interests — not a generic job dump, not last year's placement PDF.</p>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:16px 32px 8px;">
          <img src="${community}" alt="Students gathered on campus steps" width="656" style="border-radius:14px;" />
          <div style="background:linear-gradient(135deg, #6d28d9 0%, #1e1b4b 60%, #0b0b10 100%);border-radius:0 0 14px 14px;margin-top:-8px;padding:22px 22px 20px;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#9fd4f0;font-weight:600;">Community channel</p>
            <p style="margin:0;font-size:20px;line-height:1.35;font-weight:700;color:#f7f7fb;">A student-only network — not the entire internet.</p>
            <p style="margin:10px 0 0;font-size:14px;line-height:1.55;color:#d6d8e8;">Ask for a vendor rec, split a storage run, or find someone else who arrived last week and still can't find the mess hall.</p>
          </div>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:28px 32px 8px;">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#8b5cf6;font-weight:600;">Do this next · two minutes</p>
          <ol style="margin:0;padding-left:20px;color:#c9cddb;font-size:15px;line-height:1.6;">
            <li style="margin-bottom:8px;">Confirm you're a student — that's how we keep this network campus-only.</li>
            <li style="margin-bottom:8px;">Set your hostel / PG and city so tiffin, laundry, and storage show up for your block.</li>
            <li style="margin-bottom:8px;">Pick a few interests. Internship matches get sharper from day one.</li>
            <li>Place a first order, or just lurk in community. Both count.</li>
          </ol>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:22px 32px 8px;text-align:center;">
          <a href="https://unimade.app" style="display:inline-block;background:linear-gradient(90deg, #6d28d9, #8b5cf6);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 30px;border-radius:999px;">Open Unimade and finish setup</a>
          <p style="margin:12px 0 0;font-size:13px;color:#9aa0b4;">Takes less time than waiting for the mess line to move.</p>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:16px 32px 8px;">
          <div style="background:#12121a;border:1px solid #2a2a38;border-radius:12px;padding:16px 18px;font-size:13px;color:#9aa0b4;line-height:1.55;">
            <strong style="color:#f7f7fb;">Straight on price.</strong> Service fee ₹50 / order · delivery ₹30 / order · partner commission stays on the vendor side. Unimade+ is ₹199 / month if you want the essentials on autopilot.
          </div>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:24px 32px 32px;font-size:16px;line-height:1.65;color:#c9cddb;">
          <p style="margin:0 0 14px;">Local vendors, laundry shops, tiffin uncles, word of mouth — they still exist. Unimade is the layer that makes them bookable, trackable, and student-verified.</p>
          <p style="margin:0 0 4px;">See you on campus,</p>
          <p style="margin:0;font-size:18px;font-weight:700;color:#f7f7fb;">The Unimade team</p>
          <p style="margin:8px 0 0;font-size:13px;color:#9aa0b4;">Student-only community · verified student-friendly providers · campus partnerships</p>
        </td>
      </tr>
      <tr>
        <td class="pad" style="background:#050508;padding:20px 32px;font-size:12px;color:#7a7f92;line-height:1.55;border-top:1px solid #2a2a38;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td><img src="${logo}" alt="" width="28" height="28" style="border-radius:50%;" /></td>
              <td style="padding-left:10px;">Unimade · hostel essentials for university students</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
`;

const out = path.join(dir, "Unimade-Welcome.html");
const copy = path.join(dir, "..", "Unimade-Welcome.html");
fs.writeFileSync(out, html);
fs.writeFileSync(copy, html);
console.log("wrote", out, fs.statSync(out).size);
console.log("wrote", copy, fs.statSync(copy).size);
