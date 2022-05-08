---
title: 【Git】分布式版本控制系统
date: 2022-05-08 20:21:13
tags:
- Project
---

## 一、概述

分布式版本控制系统没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样工作的时候，无需联网，因为版本库就在你自己的电脑上。多人协作只需要各自的修改推送给对方，就能互相看到对方的修改。

版本控制的原因：从个人开发过渡到团队协作，不可避免地需要将多人的修改进行合并。

### 集中版本控制

常用的集中版本控制工具：CVS、SVN、VSS

集中化的版本控制系统诸如 CVS、SVN 等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。

缺点就是中心服务器宕机，那么版本控制将不可用。

### 分布式版本控制

常见的分布式版本控制工具：Git、Mercurial、Bazaar、Darcs

像 Git 这种分布式版本控制工具，客户端提取的不是最新版本的文件快照，而是把代码仓库完整地镜像下来（本地库）。这样任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。

### Git工作流程

![image-20220401102649228](https://s2.loli.net/2022/04/01/q5vN14LHjJ6hp3n.png)

命令如下：

> 1. clone (克隆) : 从远程仓库中克隆代码到本地仓库
> 2. checkout (检出) : 从本地仓库中检出一个仓库分支然后进行修订
> 3. add (添加) : 在提交前先将代码提交到暂存区
> 4. commit (提交) : 提交到本地仓库。本地仓库中保存修改的各个历史版本
> 5. fetch (抓取) : 从远程库，抓取到本地仓库,不进行任何的合并动作，一般操作比较少。
> 6. pull (拉取) : 从远程库拉到本地库,自动进行合并(merge),然后放到到工作区，相当于fetch+merge
> 7. push (推送) : 修改完成后，需要和团队成员共享代码时，将代码推送到远程仓库

### Git 简单的工作机制

![image-20220402145605081](https://s2.loli.net/2022/04/02/r2zRpLFnQ7Ak8Dj.png)

Git 中主要存在的结构以及构成：

![image-20220402162550386](https://s2.loli.net/2022/04/02/dnJNfX2iKyLmpcC.png)

Git 常用远程代码托管平台

- 局域网：GitLab
- 互联网：GitHub、Gitee

## 二、Git 常用命令

### Git 安装和配置

进入Git[官方下载地址](https://www.git-scm.com/download/)下载安装文件，之后根据提示进行安装即可。

> 安装中的选择注意：使用 Vim 编辑器，分支名选择让 Git 决定，默认为 master ，其余大多数选择默认即可。

### Git 提交命令

Git 中会用到一些 Linux 常用的命令，通常初始化一个 Project 并使用 Git 进行管理，推送到远程，整个流程中所需要使用到的简单的 Git 指令：

① 在首次使用之前，要设置用户名和邮箱

```shell
git config --global user.name "username"
git config --global user.email "useremail"
```

② 创建 Git 仓库：

```shell
mkdir study
cd study
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/../...git
git push -u origin "master"
```

③ 如果已有仓库：

```shell
cd existing_git_repo
git remote add origin https://gitee.com/../...git
git push -u origin "master"
```

常见命令以及对应作用解释：

```shell
git config --global user.name #用户名 设置用户签名
git config --global user.email #邮箱 设置用户签名
git init #初始化本地库
git status #查看本地库状态
git add #文件名 添加到暂存区
git commit -m "日志信息" 文件名 #提交到本地库
git reflog #查看历史记录
git reset --hard 版本号 #版本穿梭
```

查看历史版本：

```shell
git reflog #查看版本信息
git log #查看版本详细信息
```

强制回退到某个版本：

```shell
git reset --hard 版本号
```

Git 的切换版本，实际上是切换了 Head 指针，将 Head （代表当前所在版本指针）指向某一个具体的版本。

![image-20220402151143631](https://s2.loli.net/2022/04/02/s4Vd9qCGUOegy81.png)

### Git 分支操作

在 Git 中，版本控制过程时，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。

![image-20220402155012687](https://s2.loli.net/2022/04/02/Bamg784EKAL1GQV.png)

创建分支可以支持同时并行推进多个功能开发，提高开发效率。 各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。

```shell
git branch 分支名 #创建分支
git branch -v #查看分支
git checkout 分支名 #切换分支
git merge 分支名 #把指定的分支合并到当前分支上
git checkout -b 分支名 #创建一个不存在的分支并且切换到该分支
```

特别注意：在当前分支上执行 `git merge <另一个分支>` 指令的时候，可能会产生冲突，这个时候我们需要将冲突处理才能继续后面针对该文件的操作。

> 冲突产生的原因：合并分支时，两个分支在同一个文件的同一个位置有两套完全不同的修改。Git 无法替我们决定使用哪一个。必须人为决定新代码内容。

#### 解决冲突

编辑有冲突的文件，删除特殊符号，决定要使用的内容

特殊符号：

```text
<<<<<<< HEAD 
当前分支的代码 
======= 
合并过来的代码 
>>>>>>> fix
```

针对自己的项目情况，决定这两个部分的去留问题。

#### 创建分支和切换分支

![image-20220402160020001](https://s2.loli.net/2022/04/02/GBalEv83V1A7gI5.png)

### Git 团队协作

Git 被创建的初衷之一就是为了适应团队协作开发。

团队内协作的流程如下：

![image-20220402160110946](https://s2.loli.net/2022/04/02/P4SbxrXfdTLk8gp.png)

在团队协作中，通常约定的规范，只允许以下七种 commit 的标识：

```text
init：初始提交
feat：新功能（feature）
fix：修补 bug
docs：文档（documentation）
style：空格, 分号等格式修复（不影响代码运行的变动）
refactor：重构（不是新增的功能，也不是修改 bug 的代码变动）
️perf：提升性能
test：增加测试
chore：开发工具变动(构建、脚手架工具等)
revert：代码回退
WIP：工作正在进行中
```

## 三、Git 远程托管平台

### 远程仓库的操作

```text
git remote -v #查看当前所有远程地址别名
git remote add 别名 远程地址 #起别名
git push 别名 分支 #推送本地分支上的内容到远程仓库
git clone 远程地址 #将远程仓库的内容克隆到本地
git pull 远程库地址别名 远程分支名 #将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并
```

![image-20220409120623531](https://s2.loli.net/2022/04/09/wxlDpoYkXFym6EU.png)

## 四、常用操作

### Git 提交代码的通用方式

1、在develop分支拉取最新代码：git pull；
2、在本地的开发分支 A 中 rebase develop分支（有冲突则在本地的开发分支A解决冲突后继续合并）：git rebase develop；
3、在 develop 分支 merge 本地的开发分支A：git merge A；
4、将 develop 分支提交到远程：git push

> git rebase 和 git merge 的区别：
>
> rebase 操作可以把本地未 push 的分叉提交历史整理成直线；目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

merge 的操作示意：

![image-20220402164921787](https://s2.loli.net/2022/04/02/FJWjTd2vk5Dq74l.png)

rebase 的操作示意：

![image-20220402164948951](https://s2.loli.net/2022/04/02/NPJLFeZh7j2bEH6.png)

### Git 合并多次 commit

目的：将多次连续的 git commit 记录合并，只留下一个 commit 记录。

操作：

① 首先使用 `git log` 查看一下 git 的历史记录

② 使用 `git rebase -i HEAD~n` 合并多次 git commit

> 其中：n 为需要在当前 head 之前合并 commit 的条数。

可以看到：

> pick 5e187c7dbe8	add center style indent
> pick 6d577eb3440	add center style
> pick f9b9508a3ab	add center style
> pick 111ab9cc261	update templates

这里使用的是 4 次 commit 的压缩。之后我们编辑该页面，通常的编辑方法是将后面三个的 pick 更改为 `squash` ，如下所示：

> pick 5e187c7dbe8	add center style indent
> squash 6d577eb3440	add center style
> squash f9b9508a3ab	add center style
> squash 111ab9cc261	update templates

之后我们保存退出，之后如果有冲突，先解决冲突再继续操作。 git 的 bash 命令行会给出相应的提示。之后依次执行：

```shell
git add . 
git rebase --continue
```

继续 rebase 操作，如果想放弃这次操作，执行 `git rebase --abort` 命令。继续 rebase 操作，会得到：

```shell
# This is a combination of 4 commits.
# The first commit’s message is:
add center style indent

# The 2nd commit’s message is:
add center style

# The 3rd commit’s message is:
add center style

# The 4th commit’s message is:
update templates
```

此时我们将需要去掉的 message 信息之前加上 `#` 注释掉，最后保存退出即可，这样就只看到一条 commit 记录了。

### Git 修改 commit 的信息

使用命令：

```shell
git commit --amend
```

会进入当前所在的版本记录的 commit 中的备注信息编辑页面。利用 vim 编辑器修改 message 信息，保存退出即可修改 commit 的备注信息。

### Git 暂存当前工作

如果有一个新增的 bug 需要修复，这个时候我们通常手头还有正在进行的工作，那么我们应该先将手头的工作进行暂存，使用：

```shell
git stash
```

将当前分支上没有提交的修改提交到暂存区，之后我们创建一个新的分支修改 bug 。等待 bug 修复完毕切换回原来的分支，我们使用：

```shell
git stash list
```

查看当前暂存区的内容。我们此时可以使用：

```shell
git stash apply
```

来将暂存区内的内容恢复，但是此时并不会删除 stash 内的内容，我们需要使用：

```shell
git stash drop
```

来删除 stash 中的内容。如果需要恢复原来暂存的内容并且同时删除内容，使用：

```shell
git stash pop
```

命令来弹出暂存区的内容，并且删除目标 stash 部分。

### Git 强制退回到某个版本

使用该命令可以强制 Git 退回到某个 commit 版本的记录：

> 注意：该操作将会失去当前的修改，慎用！

```shell
git reset --hard <RevisionNumber>
```

