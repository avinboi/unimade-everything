const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dirs = [
  path.join(__dirname, "..", "public", "doodles"),
  path.join(__dirname, "..", "public", "brand"),
];

function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

async function knockout(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;
  const iAt = (x, y) => (y * width + x) * channels;

  const samples = [
    iAt(0, 0),
    iAt(width - 1, 0),
    iAt(0, height - 1),
    iAt(width - 1, height - 1),
    iAt(8, 8),
    iAt(width - 9, 8),
  ];
  const avgL =
    samples.reduce((sum, i) => sum + lum(data[i], data[i + 1], data[i + 2]), 0) /
    samples.length;

  const sr = data[0];
  const sg = data[1];
  const sb = data[2];
  const threshold = avgL > 140 ? 52 : 38;
  const thresh2 = threshold * threshold;

  const similar = (i) => {
    const dr = data[i] - sr;
    const dg = data[i + 1] - sg;
    const db = data[i + 2] - sb;
    return dr * dr + dg * dg + db * db <= thresh2;
  };

  const visited = new Uint8Array(width * height);
  const stack = [];
  for (const [x, y] of [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
    [Math.floor(width / 2), 0],
    [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)],
    [width - 1, Math.floor(height / 2)],
  ]) {
    stack.push(x, y);
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
    if (!similar(i)) continue;
    data[i + 3] = 0;
    cleared += 1;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  const tmp = file.replace(/\.png$/i, ".knockout.png");
  await sharp(Buffer.from(data), { raw: { width, height, channels } })
    .png()
    .toFile(tmp);
  fs.unlinkSync(file);
  fs.renameSync(tmp, file);

  console.log(`${path.basename(file)}: cleared ${cleared} px (corner lum ${avgL.toFixed(0)})`);
}

async function main() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.toLowerCase().endsWith(".png")) continue;
      await knockout(path.join(dir, name));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
