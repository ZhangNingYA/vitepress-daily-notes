import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DOCS = path.join(ROOT, 'docs')
const DAILY = path.join(DOCS, 'daily')

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) out.push(...walk(p))
    else if (st.isFile() && p.endsWith('.md')) out.push(p)
  }
  return out
}

function hasFrontmatter(md) {
  return md.startsWith('---\n') && md.includes('\n---\n')
}

const files = walk(DAILY)
const bad = []
for (const f of files) {
  const md = fs.readFileSync(f, 'utf-8')
  if (!hasFrontmatter(md)) bad.push(path.relative(ROOT, f))
}

if (bad.length) {
  console.error('以下文件缺少 frontmatter（建议至少写 title/date/summary）：')
  for (const b of bad) console.error(' -', b)
  process.exit(1)
} else {
  console.log('OK：daily 下所有 md 都包含 frontmatter。')
}
