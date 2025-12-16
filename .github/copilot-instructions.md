<!-- Copilot instructions for contributors/AI agents -->
# Repo summary

This is a small static VitePress site for daily learning notes (words, grammar, reflection). Key workflows are local dev, generating daily templates, and ensuring Markdown frontmatter.

**Quick commands**

- `npm i` – install dev deps
- `npm run docs:dev` – run local VitePress dev server
- `npm run docs:build` – build static site
- `npm run new:daily` – generate today's templates (three files)
- `npm run lint:md` – validate frontmatter under `docs/daily`

**Where to look (important files)**

- Homepage and layout: [docs/index.md](docs/index.md)
- Daily content folders: `docs/daily/words/`, `docs/daily/grammar/`, `docs/daily/reflection/`
- Daily generator script: [scripts/new-daily.ts](scripts/new-daily.ts)
- Frontmatter checker: [scripts/check-frontmatter.mjs](scripts/check-frontmatter.mjs)
- Project scripts and devDeps: [package.json](package.json)

Design notes an agent should know

- Daily files use ISO-date filenames: `YYYY-MM-DD.md` (see `scripts/new-daily.ts`). The generator will skip files that already exist.
- Every `docs/daily` Markdown file is expected to contain YAML frontmatter. The minimal expected fields are `title`, `date`, and `summary`. The `lint:md` script (`check-frontmatter.mjs`) exits non-zero when files are missing frontmatter.
- Templates (from `scripts/new-daily.ts`) include section headings such as `## 单词`, `## 句型`, `## 今日一句话复盘` for `words` and similar structured headings for `grammar` and `reflection`. Use those headings when adding content to keep the site consistent.

How to update or add daily content

1. Prefer running `npm run new:daily` to scaffold three files for today. It creates files at:
   - `docs/daily/words/YYYY-MM-DD.md`
   - `docs/daily/grammar/YYYY-MM-DD.md`
   - `docs/daily/reflection/YYYY-MM-DD.md`
2. If creating files manually, include YAML frontmatter at the top of the file, for example:

```
---
title: 2025-12-16
date: 2025-12-16
summary: 简短摘要，便于首页回看
---
```

Stylistic and structural conventions

- Keep entries focused and small — the site intentionally favors “少而精” (short, high-value notes) so prefer concise lists and one-line takeaways.
- Use the section headings from the templates; the homepage and aggregation components expect those sections when rendering excerpts.

Notes about automation and CI

- Deploys via GitHub Pages are expected; `docs/.vitepress/config.ts` may need `base` adjusted for project pages (see README). When adding CI workflows, keep build steps consistent with `npm run docs:build`.
- The `lint:md` script is useful in pre-merge checks to prevent missing frontmatter.

If anything here is unclear or you'd like the agent to handle other files (theme, config, or deploy workflow), tell me which area to expand.
