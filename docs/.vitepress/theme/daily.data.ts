import { createContentLoader } from 'vitepress'

export type DailyType = 'words' | 'grammar' | 'reflection'

export interface DailyEntry {
  url: string
  type: DailyType
  date: string // YYYY-MM-DD
  title: string
  summary: string
}

function normalizeUrlToParts(url: string) {
  // url 形如：/daily/words/2025-12-16.html 或 /daily/words/2025-12-16
  const clean = url.replace(/\.html?$/, '')
  const parts = clean.split('/').filter(Boolean) // ['daily','words','2025-12-16']
  return parts
}

function guessDateFromUrl(url: string): string {
  // 优先在整个 url 或文件名中查找 YYYY-MM-DD
  const clean = url.replace(/\.html?$|\.md$/i, '')
  const m = clean.match(/(\d{4}-\d{2}-\d{2})/)
  return m?.[1] ?? '1970-01-01'
}

// 只匹配以 YYYY-MM-DD 开头的日更文件，排除 index.md 等聚合页面
export default createContentLoader('daily/{words,grammar,reflection}/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]*.md', {
  excerpt: true,
  transform(raw): DailyEntry[] {
    const mapped = raw.map((p) => {
      const parts = normalizeUrlToParts(p.url)
      const type = (parts[1] ?? 'words') as DailyType
      const rawDate = p.frontmatter?.date as string | Date | undefined
      const date =
        typeof rawDate === 'string'
          ? rawDate
          : rawDate instanceof Date
          ? rawDate.toISOString().slice(0, 10)
          : guessDateFromUrl(p.url)
      const title =
        (p.frontmatter?.title as string | undefined) ??
        `${date}`
      const summary =
        (p.frontmatter?.summary as string | undefined) ??
        (typeof (p as any).excerpt === 'string' ? (p as any).excerpt.trim().split('\n')[0] : '')

      return {
        url: p.url.replace(/\.(html|md)$/, ''),
        type,
        date,
        title,
        summary
      }
    })

    // 只保留解析出有效日期的项，排除 index.md 或无日期文件
    const filtered = mapped.filter((item) => item.date && item.date !== '1970-01-01')

    // 日期倒序
    filtered.sort((a, b) => b.date.localeCompare(a.date))
    return filtered
  }
})
