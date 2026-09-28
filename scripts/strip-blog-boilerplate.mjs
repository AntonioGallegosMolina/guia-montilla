import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const blogDir = join(process.cwd(), "src/content/blog");
const dupeRes = [
  /## [^\n]+\n+El vino en Montilla no es un extra para turistas:[\s\S]*?economía local en la Campiña Sur\.\n+/g,
  /## Claves locales que marcan diferencia\n+El vino en Montilla no es un extra para turistas:[\s\S]*?enfoque de sostenibilidad\.\n+/g,
];

let blogFixed = 0;
for (const file of readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const path = join(blogDir, file);
  const raw = readFileSync(path, "utf8");
  let next = raw;
  for (const dupeRe of dupeRes) {
    next = next.replace(dupeRe, "");
  }
  if (next !== raw) {
    writeFileSync(path, next);
    blogFixed++;
  }
}
console.log(`Blog posts cleaned: ${blogFixed}`);
