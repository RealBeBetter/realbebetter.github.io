module.exports = {
    title: "Welcome to Real's blog.",
    description: 'Real\'s personal blog .',
    dest: 'public',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]
    ],
    base: '/', // 部署到 Github 相关的配置
    repo: 'https://github.com/RealBeBetter/realbebetter.github.io',
    theme: 'reco',
    themeConfig: {
        mode: 'dark', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        nav: [
            {text: 'Home', link: '/', icon: 'reco-home'},
            {text: 'TimeLine', link: '/timeline/', icon: 'reco-date'},
            /*{ text: 'Docs',
              icon: 'reco-message',
              items: [
                { text: 'Frame', link: '/docs/frame/' },
                { text: 'Database', link: '/docs/database/' },
                { text: 'Project', link: '/docs/project/' },
              ]
            },*/
            // 图标icon网站：https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html
            {
                text: 'Daily',
                icon: 'reco-blog',
                items: [
                    {text: '2022', link: '/docs/2022/'},
                ]
            },
            {
                text: 'Blog',
                icon: 'reco-message',
                items: [
                    {text: 'Basic', link: '/docs/basic/'},
                    {text: 'Database', link: '/docs/database/'},
                    {text: 'Java', link: '/docs/java/'},
                    {text: 'Frame', link: '/docs/frame/'},
                    {text: 'middleware', link: '/docs/middleware/'},
                    {text: 'Project', link: '/docs/project/'},
                    {text: 'Web', link: '/docs/web/'},
                    {text: 'Other', link: '/docs/other/'},
                ]
            },
            {
                text: 'Contact',
                icon: 'reco-mail',
                items: [
                    {text: 'GitHub', link: 'https://github.com/RealBeBetter', icon: 'reco-github'},
                    {text: 'Gitee', link: 'https://gitee.com/realBeBetter', icon: 'reco-mayun'},
                    {
                        text: 'CSDN',
                        link: 'https://blog.csdn.net/qq_43103529?spm=1000.2115.3001.5343',
                        icon: 'reco-csdn'
                    },
                    {text: '关于我', link: '/docs/about/about-me', icon: 'reco-message'},
                    {text: '联系我', link: '/docs/about/contact-me', icon: 'reco-lock'},
                ]
            }
        ],
        sidebar: {
            '/daily/2022/': [
                ''
            ],
            '/docs/basic/': [
                '',
                'operation-system',
                'mysql',
            ],
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
                'synchronized',
                'JKD-8-new-features',
                'java-web',
                'java-naming-conventions',
                'implementation-principle-of-HashMap',
                'java-interview-questions',
            ],
            '/docs/other/': [
                '',
                'java-test-questions-record',
                'IDEA-shotcuts',
            ],
            '/docs/frame/': [
                '',
                'spring-mvc',
                'mybatis',
                'mybatis-plus',
                'dubbo',
                'zookeeper',
                'spring-annotation-driven-development',
                'spring-boot-basic',
                'spring-encapsulate-starter',
            ],
            '/docs/database/': [
                '',
                'redis-1',
                'redis-2',
                'redis-3',
                'installation-and-use-of-MySQL',
                'oracle-12c-problems',
                'oracle-online-bookstore-management-system',
            ],
            '/docs/project/': [
                '',
                'login-design',
                'sub-library-sub-table',
                'optimizing-data-cases-with-redis',
                'community-forum-project',
                'student-exam-system',
                'git',
                'JMeter-performance-test',
            ],
            '/docs/web/': [
                '',
                'bootstrap',
                'javascript',
                'jquery-ajax',
                'vue-basic',
            ],
            '/docs/middleware/': [
                '',
                'redis-how-to-resolve-hot-keys',
            ],
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
    plugins: ['reading-progress', '@vuepress/nprogress', '@vuepress/back-to-top'],
    markdown: {
        lineNumbers: true
    }

}
