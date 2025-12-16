# VitePress 日更学习站（TypeScript）

这个仓库是一个 **纯静态** 的 VitePress 站点骨架，适合部署到 GitHub Pages（`github.io`）。  
核心栏目：**每日单词句型积累 / 每日语法学习 / 每日心得**，并提供“最近更新”组件，方便手机端回看。

## 1) 本地启动

```bash
npm i
npm run docs:dev
```

打开终端输出的本地地址即可。

## 2) 每日生成 3 份模板（推荐）

会在下面三个目录各生成一份当天日期文件：

- `docs/daily/words/YYYY-MM-DD.md`
- `docs/daily/grammar/YYYY-MM-DD.md`
- `docs/daily/reflection/YYYY-MM-DD.md`

```bash
npm run new:daily
```

你也可以手动创建/编辑这些文件；首页和栏目页会自动聚合最新条目（无后台）。

## 3) GitHub Pages 部署（GitHub Actions）

- 把 `.github/workflows/deploy.yml` 提交到仓库
- GitHub 仓库 Settings → Pages → Source 选择 **GitHub Actions**
- 修改 `docs/.vitepress/config.ts` 的 `base`（如果是 *项目页*）：

  - `https://<user>.github.io/<repo>/` → `base: "/<repo>/"`

如果你用的是用户/组织主页仓库（`<user>.github.io`），通常 `base` 直接用 `"/"` 即可。

## 4) 你最常改的地方

- 首页：`docs/index.md`
- 样式：`docs/.vitepress/theme/style.css`
- 顶部导航/侧边栏：`docs/.vitepress/config.ts`
- “最近更新”聚合逻辑：`docs/.vitepress/theme/daily.data.ts`
