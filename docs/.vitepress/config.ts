import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
export default defineConfig({
  lang: 'zh-Hans',
  title: '每日英语学习',
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },
  description: '单词句型、语法与心得的日更积累（纯静态）',

  // 如果是项目页（https://<user>.github.io/<repo>/），把这里改成 "/<repo>/"
  // 如果是用户/组织主页（https://<user>.github.io/），通常保持 "/"
  base: '/vitepress-daily-notes',

  lastUpdated: false,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '每日入口', link: '/daily/' },
      { text: '单词积累', link: '/daily/words/' },
      { text: '每日语法', link: '/daily/grammar/' },
      { text: '每日心得', link: '/daily/reflection/' },
      { text: '归档', link: '/daily/archive' },
      { text: '使用说明', link: '/guide/how-to' }
    ],

    // 内置本地搜索（无需 Algolia/后端）
    search: { provider: 'local' },

    sidebar: {
      '/daily/': [
        {
          text: '每日学习',
          items: [
            { text: '每日入口', link: '/daily/' },
            { text: '单词积累', link: '/daily/words/' },
            { text: '每日语法', link: '/daily/grammar/' },
            { text: '每日心得', link: '/daily/reflection/' },
            { text: '归档', link: '/daily/archive' }
          ]
        }
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '如何日更与回看', link: '/guide/how-to' }
          ]
        }
      ]
    },

    outline: 'deep',
    lastUpdated: { text: '最后更新' },

    editLink: {
      pattern: 'https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO>/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '本网站为纯静态站点（VitePress + GitHub Pages）。',
      copyright: 'Copyright © '
    }
  }
})
