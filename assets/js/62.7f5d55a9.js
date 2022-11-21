(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{655:function(s,t,a){"use strict";a.r(t);var e=a(11),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"一、概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、概述"}},[s._v("#")]),s._v(" 一、概述")]),s._v(" "),a("p",[s._v("分布式版本控制系统没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样工作的时候，无需联网，因为版本库就在你自己的电脑上。多人协作只需要各自的修改推送给对方，就能互相看到对方的修改。")]),s._v(" "),a("p",[s._v("版本控制的原因：从个人开发过渡到团队协作，不可避免地需要将多人的修改进行合并。")]),s._v(" "),a("h3",{attrs:{id:"集中版本控制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#集中版本控制"}},[s._v("#")]),s._v(" 集中版本控制")]),s._v(" "),a("p",[s._v("常用的集中版本控制工具：CVS、SVN、VSS")]),s._v(" "),a("p",[s._v("集中化的版本控制系统诸如 CVS、SVN 等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。")]),s._v(" "),a("p",[s._v("缺点就是中心服务器宕机，那么版本控制将不可用。")]),s._v(" "),a("h3",{attrs:{id:"分布式版本控制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分布式版本控制"}},[s._v("#")]),s._v(" 分布式版本控制")]),s._v(" "),a("p",[s._v("常见的分布式版本控制工具：Git、Mercurial、Bazaar、Darcs")]),s._v(" "),a("p",[s._v("像 Git 这种分布式版本控制工具，客户端提取的不是最新版本的文件快照，而是把代码仓库完整地镜像下来（本地库）。这样任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。")]),s._v(" "),a("h3",{attrs:{id:"git工作流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git工作流程"}},[s._v("#")]),s._v(" Git工作流程")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/01/q5vN14LHjJ6hp3n.png",alt:"image-20220401102649228"}})]),s._v(" "),a("p",[s._v("命令如下：")]),s._v(" "),a("blockquote",[a("ol",[a("li",[s._v("clone (克隆) : 从远程仓库中克隆代码到本地仓库")]),s._v(" "),a("li",[s._v("checkout (检出) : 从本地仓库中检出一个仓库分支然后进行修订")]),s._v(" "),a("li",[s._v("add (添加) : 在提交前先将代码提交到暂存区")]),s._v(" "),a("li",[s._v("commit (提交) : 提交到本地仓库。本地仓库中保存修改的各个历史版本")]),s._v(" "),a("li",[s._v("fetch (抓取) : 从远程库，抓取到本地仓库,不进行任何的合并动作，一般操作比较少。")]),s._v(" "),a("li",[s._v("pull (拉取) : 从远程库拉到本地库,自动进行合并(merge),然后放到到工作区，相当于fetch+merge")]),s._v(" "),a("li",[s._v("push (推送) : 修改完成后，需要和团队成员共享代码时，将代码推送到远程仓库")])])]),s._v(" "),a("h3",{attrs:{id:"git-简单的工作机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-简单的工作机制"}},[s._v("#")]),s._v(" Git 简单的工作机制")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/r2zRpLFnQ7Ak8Dj.png",alt:"image-20220402145605081"}})]),s._v(" "),a("p",[s._v("Git 中主要存在的结构以及构成：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/dnJNfX2iKyLmpcC.png",alt:"image-20220402162550386"}})]),s._v(" "),a("p",[s._v("Git 常用远程代码托管平台")]),s._v(" "),a("ul",[a("li",[s._v("局域网：GitLab")]),s._v(" "),a("li",[s._v("互联网：GitHub、Gitee")])]),s._v(" "),a("h2",{attrs:{id:"二、git-常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、git-常用命令"}},[s._v("#")]),s._v(" 二、Git 常用命令")]),s._v(" "),a("h3",{attrs:{id:"git-安装和配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-安装和配置"}},[s._v("#")]),s._v(" Git 安装和配置")]),s._v(" "),a("p",[s._v("进入Git"),a("a",{attrs:{href:"https://www.git-scm.com/download/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方下载地址"),a("OutboundLink")],1),s._v("下载安装文件，之后根据提示进行安装即可。")]),s._v(" "),a("blockquote",[a("p",[s._v("安装中的选择注意：使用 Vim 编辑器，分支名选择让 Git 决定，默认为 master ，其余大多数选择默认即可。")])]),s._v(" "),a("h3",{attrs:{id:"git-提交命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-提交命令"}},[s._v("#")]),s._v(" Git 提交命令")]),s._v(" "),a("p",[s._v("Git 中会用到一些 Linux 常用的命令，通常初始化一个 Project 并使用 Git 进行管理，推送到远程，整个流程中所需要使用到的简单的 Git 指令：")]),s._v(" "),a("p",[s._v("① 在首次使用之前，要设置用户名和邮箱")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"username"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"useremail"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("② 创建 Git 仓库：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" study\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" study\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" README.md\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" README.md\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"first commit"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" origin https://gitee.com/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -u origin "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"master"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("③ 如果已有仓库：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" existing_git_repo\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" origin https://gitee.com/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -u origin "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"master"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("常见命令以及对应作用解释：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#用户名 设置用户签名")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#邮箱 设置用户签名")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#初始化本地库")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" status "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看本地库状态")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#文件名 添加到暂存区")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"日志信息"')]),s._v(" 文件名 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#提交到本地库")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reflog "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看历史记录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset --hard 版本号 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#版本穿梭")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("查看历史版本：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reflog "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看版本信息")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看版本详细信息")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("强制回退到某个版本：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset --hard 版本号\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("Git 的切换版本，实际上是切换了 Head 指针，将 Head （代表当前所在版本指针）指向某一个具体的版本。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/s4Vd9qCGUOegy81.png",alt:"image-20220402151143631"}})]),s._v(" "),a("h3",{attrs:{id:"git-分支操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-分支操作"}},[s._v("#")]),s._v(" Git 分支操作")]),s._v(" "),a("p",[s._v("在 Git 中，版本控制过程时，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/Bamg784EKAL1GQV.png",alt:"image-20220402155012687"}})]),s._v(" "),a("p",[s._v("创建分支可以支持同时并行推进多个功能开发，提高开发效率。 各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch 分支名 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#创建分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch -v "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout 分支名 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#切换分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge 分支名 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#把指定的分支合并到当前分支上")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b 分支名 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#创建一个不存在的分支并且切换到该分支")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("特别注意：在当前分支上执行 "),a("code",[s._v("git merge <另一个分支>")]),s._v(" 指令的时候，可能会产生冲突，这个时候我们需要将冲突处理才能继续后面针对该文件的操作。")]),s._v(" "),a("blockquote",[a("p",[s._v("冲突产生的原因：合并分支时，两个分支在同一个文件的同一个位置有两套完全不同的修改。Git 无法替我们决定使用哪一个。必须人为决定新代码内容。")])]),s._v(" "),a("h4",{attrs:{id:"解决冲突"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决冲突"}},[s._v("#")]),s._v(" 解决冲突")]),s._v(" "),a("p",[s._v("编辑有冲突的文件，删除特殊符号，决定要使用的内容")]),s._v(" "),a("p",[s._v("特殊符号：")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD \n当前分支的代码 \n======= \n合并过来的代码 \n>>>>>>> fix\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("针对自己的项目情况，决定这两个部分的去留问题。")]),s._v(" "),a("h4",{attrs:{id:"创建分支和切换分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建分支和切换分支"}},[s._v("#")]),s._v(" 创建分支和切换分支")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/GBalEv83V1A7gI5.png",alt:"image-20220402160020001"}})]),s._v(" "),a("h3",{attrs:{id:"git-团队协作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-团队协作"}},[s._v("#")]),s._v(" Git 团队协作")]),s._v(" "),a("p",[s._v("Git 被创建的初衷之一就是为了适应团队协作开发。")]),s._v(" "),a("p",[s._v("团队内协作的流程如下：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/P4SbxrXfdTLk8gp.png",alt:"image-20220402160110946"}})]),s._v(" "),a("p",[s._v("在团队协作中，通常约定的规范，只允许以下七种 commit 的标识：")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("init：初始提交\nfeat：新功能（feature）\nfix：修补 bug\ndocs：文档（documentation）\nstyle：空格, 分号等格式修复（不影响代码运行的变动）\nrefactor：重构（不是新增的功能，也不是修改 bug 的代码变动）\n️perf：提升性能\ntest：增加测试\nchore：开发工具变动(构建、脚手架工具等)\nrevert：代码回退\nWIP：工作正在进行中\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("h2",{attrs:{id:"三、git-远程托管平台"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、git-远程托管平台"}},[s._v("#")]),s._v(" 三、Git 远程托管平台")]),s._v(" "),a("h3",{attrs:{id:"远程仓库的操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#远程仓库的操作"}},[s._v("#")]),s._v(" 远程仓库的操作")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git remote -v #查看当前所有远程地址别名\ngit remote add 别名 远程地址 #起别名\ngit push 别名 分支 #推送本地分支上的内容到远程仓库\ngit clone 远程地址 #将远程仓库的内容克隆到本地\ngit pull 远程库地址别名 远程分支名 #将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/09/wxlDpoYkXFym6EU.png",alt:"image-20220409120623531"}})]),s._v(" "),a("h2",{attrs:{id:"四、常用操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、常用操作"}},[s._v("#")]),s._v(" 四、常用操作")]),s._v(" "),a("h3",{attrs:{id:"git-提交代码的通用方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-提交代码的通用方式"}},[s._v("#")]),s._v(" Git 提交代码的通用方式")]),s._v(" "),a("p",[s._v("1、在develop分支拉取最新代码：git pull；\n2、在本地的开发分支 A 中 rebase develop分支（有冲突则在本地的开发分支A解决冲突后继续合并）：git rebase develop；\n3、在 develop 分支 merge 本地的开发分支A：git merge A；\n4、将 develop 分支提交到远程：git push")]),s._v(" "),a("blockquote",[a("p",[s._v("git rebase 和 git merge 的区别：")]),s._v(" "),a("p",[s._v("rebase 操作可以把本地未 push 的分叉提交历史整理成直线；目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。")])]),s._v(" "),a("p",[s._v("merge 的操作示意：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/FJWjTd2vk5Dq74l.png",alt:"image-20220402164921787"}})]),s._v(" "),a("p",[s._v("rebase 的操作示意：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2022/04/02/NPJLFeZh7j2bEH6.png",alt:"image-20220402164948951"}})]),s._v(" "),a("h3",{attrs:{id:"git-合并多次-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-合并多次-commit"}},[s._v("#")]),s._v(" Git 合并多次 commit")]),s._v(" "),a("p",[s._v("目的：将多次连续的 git commit 记录合并，只留下一个 commit 记录。")]),s._v(" "),a("p",[s._v("操作：")]),s._v(" "),a("p",[s._v("① 首先使用 "),a("code",[s._v("git log")]),s._v(" 查看一下 git 的历史记录")]),s._v(" "),a("p",[s._v("② 使用 "),a("code",[s._v("git rebase -i HEAD~n")]),s._v(" 合并多次 git commit")]),s._v(" "),a("blockquote",[a("p",[s._v("其中：n 为需要在当前 head 之前合并 commit 的条数。")])]),s._v(" "),a("p",[s._v("可以看到：")]),s._v(" "),a("blockquote",[a("p",[s._v("pick 5e187c7dbe8\tadd center style indent\npick 6d577eb3440\tadd center style\npick f9b9508a3ab\tadd center style\npick 111ab9cc261\tupdate templates")])]),s._v(" "),a("p",[s._v("这里使用的是 4 次 commit 的压缩。之后我们编辑该页面，通常的编辑方法是将后面三个的 pick 更改为 "),a("code",[s._v("squash")]),s._v(" ，如下所示：")]),s._v(" "),a("blockquote",[a("p",[s._v("pick 5e187c7dbe8\tadd center style indent\nsquash 6d577eb3440\tadd center style\nsquash f9b9508a3ab\tadd center style\nsquash 111ab9cc261\tupdate templates")])]),s._v(" "),a("p",[s._v("之后我们保存退出，之后如果有冲突，先解决冲突再继续操作。 git 的 bash 命令行会给出相应的提示。之后依次执行：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rebase --continue\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("继续 rebase 操作，如果想放弃这次操作，执行 "),a("code",[s._v("git rebase --abort")]),s._v(" 命令。继续 rebase 操作，会得到：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is a combination of 4 commits.")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# The first commit’s message is:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" center style indent\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# The 2nd commit’s message is:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" center style\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# The 3rd commit’s message is:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" center style\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# The 4th commit’s message is:")]),s._v("\nupdate templates\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("此时我们将需要去掉的 message 信息之前加上 "),a("code",[s._v("#")]),s._v(" 注释掉，最后保存退出即可，这样就只看到一条 commit 记录了。")]),s._v(" "),a("h3",{attrs:{id:"git-修改-commit-的信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-修改-commit-的信息"}},[s._v("#")]),s._v(" Git 修改 commit 的信息")]),s._v(" "),a("p",[s._v("使用命令：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit --amend\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("会进入当前所在的版本记录的 commit 中的备注信息编辑页面。利用 vim 编辑器修改 message 信息，保存退出即可修改 commit 的备注信息。")]),s._v(" "),a("h3",{attrs:{id:"git-暂存当前工作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-暂存当前工作"}},[s._v("#")]),s._v(" Git 暂存当前工作")]),s._v(" "),a("p",[s._v("如果有一个新增的 bug 需要修复，这个时候我们通常手头还有正在进行的工作，那么我们应该先将手头的工作进行暂存，使用：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("将当前分支上没有提交的修改提交到暂存区，之后我们创建一个新的分支修改 bug 。等待 bug 修复完毕切换回原来的分支，我们使用：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash list\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("查看当前暂存区的内容。我们此时可以使用：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash apply\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("来将暂存区内的内容恢复，但是此时并不会删除 stash 内的内容，我们需要使用：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash drop\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("来删除 stash 中的内容。如果需要恢复原来暂存的内容并且同时删除内容，使用：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash pop\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("命令来弹出暂存区的内容，并且删除目标 stash 部分。")]),s._v(" "),a("h3",{attrs:{id:"git-强制退回到某个版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-强制退回到某个版本"}},[s._v("#")]),s._v(" Git 强制退回到某个版本")]),s._v(" "),a("p",[s._v("使用该命令可以强制 Git 退回到某个 commit 版本的记录：")]),s._v(" "),a("blockquote",[a("p",[s._v("注意：该操作将会失去当前的修改，慎用！")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset --hard "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("RevisionNumber"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])])}),[],!1,null,null,null);t.default=n.exports}}]);