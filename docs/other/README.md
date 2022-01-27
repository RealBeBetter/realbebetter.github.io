---
title: 如何搭建一个这样的网站
date: 2022-01-27 11:05:00
tags:
- Other
---

## 一、准备环境

安装开发工具以及开发环境

开发工具的安装：可以选择VSCode、WebStorm等

开发环境：需要准备安装好下面五个环境工具

- Git分布式版本管理工具           [Git下载链接](https://git-scm.com/downloads)

- node核心                                 [node.js下载链接](https://nodejs.org/dist/v14.17.1/node-v14.17.1-x64.msi)

- ![image-20210904211547688](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904211547688.png)

- 安装cnpm，使用淘宝镜像

  - ```shell
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    或
    npm install -g cnpm --registry=http://r.npm.taobao.org/
    （上面的经测试可正常使用，下面的没测试过）
    ```

  - ![image-20210904212943849](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904212943849.png)

- 安装Webpack，前端打包工具

  - ```shell
    cnpm install webpack -g
    ```

  - 使用上述命令安装webpack之后，使用命令`webpack -v`测试安装结果，之后按照提示安装webpack cli客户端：

  - ![image-20210904213514966](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904213514966.png)

- 安装vue-cli，构建工具，生成Vue工程模板

  - ```shell
    npm install vue-cli -g
    ```

  - 测试命令

  - ```shell
    vue -V
    ```

  - ![image-20210904213810840](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904213810840.png)

## 二、VuePress入门

### 入门程序编写

1. 创建 Github 账号或者 Gitee 
2. 创建项目
3. 使用VuePress
4. 默认主题的首页

创建账号不再过多赘述。创建项目步骤如下：

- 在Gitee创建新的仓库，然后配置ignore为Node并添加README.md文档初始化仓库

- 将仓库克隆到本地目录下，使用命令

  - ```
    git clone SSHAddress
    ```

- ```
  //  在仓库目录下使用 `echo '# Hello VuePress' > README.md` 命令编辑初始化项目时生成的Markdown文档
  ```

- 使用命令 `npm init -y` 生成package.json文件

  - ```json
    $ npm init -y
    Wrote to D:\Java\VuePress\vue-press\package.json:
    
    {
      "name": "vue-press",
      "version": "1.0.0",
      "description": "...",
      "main": "index.js",
      "scripts": {
        "test": "..."
      },
      "repository": {
        "type": "git",
        "url": "..."
      },
      "keywords": [],
      "author": "",
      "license": "..."
    }
    ```

- 使用包管理器对项目文件进行初始化 `git init`

- 将VuePress安装为本地依赖 `yarn add -D vuepress`

- 创建第一篇文档 `mkdir docs && echo '# Hello VuePress' > docs/README.md`

- 在 `package.json` 中添加一些Script

  - ```json
    {
      "scripts": {
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs"
      }
    }
    ```

- 在本地启动服务器 `yarn docs:dev`

- 进入 http://localhost:8080 即可看到编写完成的Markdown文档页面

编写完成的效果如下所示：

![image-20210623163634898](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623163634898.png)

### 使用默认主题配置

将dcos/README.md文档用工具进行编写：

```md
---
home: true
# heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
# Hello VuePress
```

之后重新使用命令 `yarn docs:dev` 重新运行之前部署的页面。

运行完成后，可以看到下面的页面：

![image-20210623164509357](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623164509357.png)

### 页面路由的映射规则

如果要开发一个about页面，那么该如何完成呢？

一、在docs目录下创建一个about文件夹，创建一个README.md文件

```
# 关于我

### 热爱生活，喜欢学习
```

二、重新启动服务，地址后面加上`/about`可以看到页面的内容

三、将该md文件剪切至docs文件夹下，命名为about.md，之后输入地址[关于我](http://localhost:8080/about.html)可以看到页面的内容

![image-20210623170440159](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623170440159.png)

### 导航栏的配置

在docs/.vuepress/config.js文件中，添加下面的代码

```javascript
module.exports = {
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/about' },
            { text: 'External', link: 'https://google.com' },
            { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
            { text: 'Guide', link: '/guide/', target:'_blank' },
            {text: 'Languages', ariaLabel: 'Language Menu', items: [
                { text: 'Chinese', link: '/language/chinese/' },
                { text: 'Japanese', link: '/language/japanese/' }
            ]},
            
        ]
    }
}
```

这样编写之后，可以出现很多导航栏选项。

![image-20210623172620654](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623172620654.png)

图片等静态资源存放在.vuepress/public/assets目录下，例如图片的路径为docs\.vuepress\public\assets\img\logo.img

### 侧边栏

- 文章内快速检索
- 生成目录导航

在文章上方设置：

```
---
sidebar: auto
---
```

之后就可以自动生成侧边栏了。

## 三、编写主页

一、创建目录，根据自己需求创建：`D:\Java\VueBlog`

二、在该目录下运行 git Bash，运行命令：

```shell
npm install vuepress-theme-reco --save-dev
```

三、等待下载完成之后，进行初始化，输入：

```shell
theme-cli init blog
```

四、根据提示完成初始化，从Git加载文件

![image-20210904214603293](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904214603293.png)

五、完成初始化之后，文件目录结构如下：

![img](https://gitee.com/realBeBetter/image/raw/master/img/20210530002.jpg)

六、可以在文件管理中查看整个项目的文件结构

![image-20210904214835949](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904214835949.png)

七、完成上述的步骤之后，启动项目的步骤如下：

```shell
// 第一步，进到项目根目录中
cd blog

// 第二步，安装依赖包（这个过程很慢，需要等待）
npm install

// 第三步，等依赖包下完了以后再执行该指令启动项目
npm run dev
```

八、此时会自动跳转到浏览器，可以看到主页

![image-20210904221206983](https://gitee.com/realBeBetter/image/raw/master/img/image-20210904221206983.png)

之后此时需要根据官方的设定去修改一些设定。

## 四、修改配置

博客页面的所有文字以及样式设定，都可以通过 `.vuepress/config.js` 来设定达到你想要的目的样式。

> logo

该属性表示的是导航栏最左侧的 logo 图片。在写该值时的根路径是 public ，即 /logo.png 表示的就是 public 下的 logo.png

> search

该属性表示是否有搜索功能

> searchMaxSuggestions

该属性官网也没做过多说明，所以我也不知道有什么用，暂且可以不用管

> lastUpdated

该属性表示每篇文章底部显示的 “最后一次更新时间” 的文案

> author

该属性表示作者的名称，在每一篇文章的作者署名中都会沿用该名称

> authorAvatar

该属性表示作者的头像，与 logo 一样的路径规则，头像显示位置如下图所示：

> record && recordLink && cyberSecurityRecord && cyberSecurityLink

```yaml
record: ICP备案号

recordLink： ICP 备案指向的链接

cyberSecurityRecord： 公安部备案文案

cyberSecurityLink： 公安部备案指向链接

# 如果项目不是部署在个人服务器上的话，这四个属性可以忽略不管
```

> startYear

该属性表示博客的开始时间（只需要写年份就可以了），在网站上的会有展示。

- markdown

该属性里存储着一些对于 markdown 解析的配置，例如脚手架自动生成的 lineNumbers 表示的就是代码块显示行号，其实还有其它很多的 markdown 配置，详细参考 vuepress官方。

## 五、写文章

按照上面进行配置，一个基本的博客就搭建好了，现在就可以开始疯狂输入文章了，所有的文章只需要以.md文件格式放在docs文件夹下即可。

```
---
title: Java从入门到精通
date: 2021-05-01
categories:
 - Java
tags:
 - Java
---
```

页面显示具体信息如下：

另外，我们本文使用的主题框架还为文章提供了一个很不错的功能：加密，只需要在文章中给keys属性赋值一个md5加密后的字符串即可

比如我们将密码设为9527，那么打开在线md5加密 (opens new window)网站，将密码输入到框中，就能得到一串密文，该密文就是我们要设置的keys的值，以其中一篇文章为例：

```
---
title: 个人简历
date: 2021-10-01
categories:
 - 简历
 - Java
tags:
 - 简历
 - Java
keys:
 - '52569c045dc348f12dfc4c85000ad832'
 
---

简历是对你过往学习和工作的一个总结，一份好的简历容易给人留下深刻印象，更容易被企业发现，创造更多的就业机会。优秀的简历可以把你推销给优秀的企业，看看别人的优秀简历范文，让自己的简历更加优秀吧。
```

在需要看文章时需要输入密钥。

## 六、评论模块

其实这个主题框架已经内置了评论插件`@vuepress-reco/vuepress-plugin-comments`，我们需要做的就是做一些额外的配置。

首先去Valine官网 (https://console.leancloud.cn/register) 注册一下Valine账号，注册好后进行登录，然后进入控制台，点击左下角创建应用。

应用创建好以后，进入刚刚创建的应用，选择左下角的设置>应用Key，然后就能看到你的APP ID和APP Key了。

拿到APP ID和APP Key后，我们来到我们项目中.vuepress/config.js中的themeConfig属性中，按如下设置即可：

```
module.exports = {
  // ...
  themeConfig: {
    // ....
    valineConfig: {     // valine 评论功能配置信息
      appId: '在这输入你的appid',// your appId
      appKey: '在这输入你的appKey', // your appKey
      placeholder: '尽情留下你想说的话吧~',           // 评论框占位符
      avatar: 'wavatar',           // 评论用户的头像类型
      highlight: true,         // 代码高亮
      recordIP: true,         // 记录评论者的IP
    },
  }
  // ...
}
```

这样我们就能看到我们每篇文章的最底部都有留言功能了

![img](https://gitee.com/zhangbw666/img-folder/raw/master/img-share/20210530009.jpg?ynotemdtimestamp=1630761078502)

当然如果我们不想让某篇文章有留言板，也可以设置 isShowComments 属性为 false 即可

```
---
title: 我的第一篇文章
date: 2021-05-07
categories:
 - 分类1
tags:
 - 标签1
 - 标签2
keys:
 - 'ababf713be53f3d10366196bf0297c30'
isShowComments: false
---

这是我的第一篇文章
```

到这里，我们就基本完成了博客的搭建，我们只需要把精力花到具体的技术文章输出上面了。

## 七、服务器部署

最终，我们搭建的个人博客都是需要部署在公网上的。这里我使用的是 Github 来进行部署工作的。缺点是不能被搜索引擎收录，优点是方便免费。我们首先在 Github 上创建一个仓库，然后将整个博客的项目文件打包上传到仓库的 master 分支，再新建一个分支，建议是使用 gh-pages 分支。

根据 vuepress 官方的建议，我们将项目的各种配置文件放在 master 分支，而将生成的静态文件放在 gh-pages 分支上。具体操作请参照下面的 sh 批处理命令，再根据自己的需求进行修改。

```shell
# 进入生成的文件夹
cd public

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:RealBeBetter/blog.git master:gh-pages

cd -
```

以上就是搭建整个网站的流程了。

> 首页打字机效果参考文档：[关于首页打字机效果 | PengSir (bookbook.cc)](https://www.bookbook.cc/views/All/8-23.html#一、-用到的技术)

## 八、需要注意的地方

- 每个菜单下的分支，必须要有一个 README.md 文件，否则将无法访问到这个分支菜单。
- 部署到 github 的时候，需要设置 base 属性为 `'/<REPO>/'` ，否则可能出现资源无法解析的错误。
- Front Matter 必须放到整个文章的开头，否则会无法生效。
- 浏览器标签图片，需要设置 href 链接为 '/favicon.ico' ，否则部署之后会无法显示。
