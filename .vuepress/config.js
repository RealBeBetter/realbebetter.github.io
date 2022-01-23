module.exports = {
  title: "Real's blog.",
  description: 'Real\'s personal blog .',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/my_favicon' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  base: '/blog/', // 部署到 Github 相关的配置
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'Docs',
        icon: 'reco-message',
        items: [
          { text: 'frame', link: '/docs/frame/' }
        ]
      },
      { text: 'Blog',
        icon: 'reco-message',
        items: [
          { text: 'java', link: '/docs/java/' },
          { text: 'basic', link: '/docs/basic/' },
        ]
      },
      { text: 'Contact',
        icon: 'reco-mail',
        items: [
          { text: 'GitHub', link: 'https://github.com/RealBeBetter', icon: 'reco-github' },
          { text: 'Gitee', link: 'https://gitee.com/realBeBetter', icon: 'reco-mayun' },
          { text: 'CSDN', link: 'https://blog.csdn.net/qq_43103529?spm=1000.2115.3001.5343', icon: 'reco-csdn' },
          { text: '关于我', link: '/docs/about/', icon: 'reco-message' },
        ]
      }
    ],
    sidebar: {
      '/docs/java/': [
        '',
        'basic-2',
        'basic-3',
        'basic-4',
        'basic-5',
        'basic-6',
        'basic-7',
        'basic-8',
        'basic-9',
        'JVM-1',
        'JVM-2-1',
        'JVM-2-2',
        'JVM-3',
        'Mybatis'
      ],
      '/docs/about/': [
          '',
      ],
      '/docs/basic/': [
          '',
          'OperationSystem',
      ]
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      /*category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },*/
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: '/logo.jpg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: '雨下一整晚Real',
    // 作者头像
    authorAvatar: '/avatar.jpg',
    // 备案号
    record: '2021-2022',
    // 项目开始时间
    startYear: '2021-10-07'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  }
}
