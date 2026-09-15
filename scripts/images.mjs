// Pre-compresses the source photographs into WebP for the static export.
// GitHub Pages has no Node process, so Next's image optimizer cannot run and
// the files in public/ are served exactly as they are. Run: npm run images
import { mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "assets";
const OUT = "public";

// Max width per image, chosen from how large each one is ever displayed.
const WIDTHS = { hero: 1200, portrait: 1100, desk: 1600 };
const QUALITY = 76;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (files.length === 0) {
  console.log(`No source images in ${SRC}/ — nothing to do.`);
}

for (const file of files) {
  const name = file.replace(/\.[^.]+$/, "");
  const width = WIDTHS[name] ?? 1400;
  const target = join(OUT, `${name}.webp`);

  const info = await sharp(join(SRC, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(target);

  const before = (await stat(join(SRC, file))).size;
  const pct = Math.round((1 - info.size / before) * 100);
  console.log(
    `${file.padEnd(16)} -> ${name}.webp  ${info.width}x${info.height}  ` +
      `${(info.size / 1024).toFixed(0)} KB  (-${pct}%)`,
  );
}
