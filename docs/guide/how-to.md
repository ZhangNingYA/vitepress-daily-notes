---
title: 如何日更与回看
---

## 推荐的日更流程（3 分钟启动）

1. 生成当天模板（会生成 3 个文件）：
   ```bash
   npm run new:daily
   ```
2. 只改你今天要写的那一份（或三份都写）。
3. 提交到 GitHub，Actions 自动部署到 Pages。

## 目录约定

- `docs/daily/words/YYYY-MM-DD.md`
- `docs/daily/grammar/YYYY-MM-DD.md`
- `docs/daily/reflection/YYYY-MM-DD.md`

这样做的好处是：
- 首页可以按类别展示“最近更新”（手机端一眼可见）
- 归档页可以按日期统一回看
- 后续要做标签/专题页也更容易扩展

## 写作建议（偏移动端）

- 一条只写一个重点；用短句与列表
- 例句用 blockquote（更突出）
- 结尾写一行“今日一句话复盘”，方便刷回忆
