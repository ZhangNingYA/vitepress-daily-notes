import fs from 'node:fs'
import path from 'node:path'

type DailyType = 'words' | 'grammar' | 'reflection'

const ROOT = process.cwd()
const DOCS = path.join(ROOT, 'docs')
const DAILY_DIR = path.join(DOCS, 'daily')

const types: DailyType[] = ['words', 'grammar', 'reflection']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function todayISO() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  return `${yyyy}-${mm}-${dd}`
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true })
}

function filePath(type: DailyType, date: string) {
  return path.join(DAILY_DIR, type, `${date}.md`)
}

function template(type: DailyType, date: string) {
  const base = `---\ntitle: ${date}\ndate: ${date}\nsummary: （建议写一句话摘要，方便首页回看）\n---\n\n`
  switch (type) {
    case 'words':
      return (
        base +
        `## 单词\n\n- \n\n## 句型\n\n> \n\n- 变体：\n- 易错点：\n\n## 今日一句话复盘\n\n- \n`
      )
    case 'grammar':
      return (
        base +
        `## 今日语法点\n\n- 结论：\n\n## 例句\n\n> \n\n## 易错点\n\n- \n\n## 对比\n\n- A vs B：\n\n## 今日一句话复盘\n\n- \n`
      )
    case 'reflection':
      return (
        base +
        `## 今日目标\n\n- \n\n## 学到的东西\n\n- \n\n## 卡住的点\n\n- \n\n## 明天要做的\n\n- \n\n## 今日一句话复盘\n\n- \n`
      )
  }
}

function main() {
  const date = todayISO()
  for (const t of types) {
    const dir = path.join(DAILY_DIR, t)
    ensureDir(dir)
    const fp = filePath(t, date)
    if (fs.existsSync(fp)) {
      console.log(`[skip] 已存在：${path.relative(ROOT, fp)}`)
      continue
    }
    fs.writeFileSync(fp, template(t, date), 'utf-8')
    console.log(`[ok] 已生成：${path.relative(ROOT, fp)}`)
  }
}

main()
