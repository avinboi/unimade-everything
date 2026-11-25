const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dirs = [
  path.join(__dirname, "..", "public", "doodles"),
  path.join(__dirname, "..", "public", "brand"),
];

const skipCircleMask = new Set(["marks.png", "phone-chaos.png", "banner-chaos.png", "logo.png"]);

function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isPaper(r, g, b, a) {
  if (a === 0) return true;
  const L = lum(r, g, b);
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  return L > 155 && sat < 55;
}

async function processFile(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;
  const idx = (x, y) => (y * width + x) * channels;

  const visited = new Uint8Array(width * height);
  const stack = [];
  for (let x = 0; x < width; x++) {
    stack.push(x, 0, x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    stack.push(0, y, width - 1, y);
  }

  let cleared = 0;
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= width || y >= height) continue;
    const p = y * width + x;
    if (visited[p]) continue;
    visited[p] = 1;
    const i = p * channels;
    if (!isPaper(data[i], data[i + 1], data[i + 2], data[i + 3])) continue;
    data[i + 3] = 0;
    cleared += 1;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  const name = path.basename(file);
  if (!skipCircleMask.has(name)) {
    const cx = (width - 1) / 2;
    const cy = (height - 1) / 2;
    const r = Math.min(width, height) * 0.5;
    const r2 = r * r;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy > r2) {
          const i = idx(x, y);
          if (data[i + 3] !== 0) {
            data[i + 3] = 0;
            cleared += 1;
          }
        }
      }
    }
  }

  const tmp = file.replace(/\.png$/i, ".__tmp.png");
  await sharp(Buffer.from(data), { raw: { width, height, channels } })
    .png()
    .toFile(tmp);
  fs.unlinkSync(file);
  fs.renameSync(tmp, file);
  console.log(`${name}: cleared ${cleared}`);
}

async function main() {
  for (const dir of dirs) {
    for (const name of fs.readdirSync(dir)) {
      if (!name.toLowerCase().endsWith(".png")) continue;
      await processFile(path.join(dir, name));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
