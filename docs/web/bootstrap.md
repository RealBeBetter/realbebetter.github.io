---
title: 【Web】Bootstrap框架认识和使用
date: 2021-06-04 01:04:16
tags:
- Web
---

Bootstrap是一个Web开发的框架

> 百度百科：
> Bootstrap是美国[Twitter](https://baike.baidu.com/item/Twitter/2443267)公司的设计师Mark Otto和Jacob Thornton合作基于HTML、CSS、[JavaScript](https://baike.baidu.com/item/JavaScript/321142) 开发的简洁、直观、强悍的[前端](https://baike.baidu.com/item/前端/5956545)开发框架，使得 Web 开发更加快捷。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言[Less](https://baike.baidu.com/item/Less)写成。Bootstrap一经推出后颇受欢迎，一直是[GitHub](https://baike.baidu.com/item/GitHub)上的热门开源项目，包括[NASA](https://baike.baidu.com/item/NASA)的MSNBC（[微软全国广播公司](https://baike.baidu.com/item/微软全国广播公司/8750737)）的Breaking News都使用了该项目。 国内一些移动开发者较为熟悉的框架，如[WeX5](https://baike.baidu.com/item/WeX5)前端开源框架等，也是基于Bootstrap源码进行性能优化而来。

## 一、入门

- 优点：
    - 定义了很多的css样式和js插件，开发人员可以直接使用
    - 响应式布局：一套页面可以兼容多种不同分辨率的设备

### 下载使用

点击[下载链接](https://getbootstrap.com/docs/4.0/getting-started/download/#)进入下载页面，之后将压缩包解压即可。获取到其中的dist文件夹中的子文件夹，将它们导入项目的文件夹内即可。

如果使用的是Webstorm，可以直接创建Bootstrap项目，创建之后会自动开启下载所需要的文件。

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
    <!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 -->
    <!--[if lt IE 9]>
      <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<h1>你好，世界！</h1>

<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
</body>
</html>
```

## 二、响应式布局

同一套页面可以兼容不同分辨率的设备。

Bootstrap实现响应式布局依赖于栅格系统，将一行平均分为12个栅格，可以指定一个元素占据几个栅格。

### 使用

1. 定义容器。相当于之前的table
    - 容器分类
        - container：左右两侧有留白，不同设备上固定宽度
        - container-fluid：每一种设备都是100%设备
2. 定义行。相当于之前的tr样式：row
3. 定义元素。指定该元素在不同的设备上，所占的格子数目。样式：`col-设备代号-格子数目`
    - 设备代号:
        - xs：超小屏幕手机(<768px) : col-xs-12
        - sm：小屏幕平板(2768px)
        - md：中等屏幕桌面显示器(2992px)
        - lg：大屏幕大桌面显示器(21200px)

### 注意事项

1. 如果一行中超出12个栅格，超出部分将会自动换行
2. 栅格类属性会向上兼容，但不会向下兼容（举例：xs代号可以在所有代号的设备上正常显示）
3. 如果真实设备宽度小于了栅格类属性设置的设备代码的最小值，会出现一个元素沾满一整行

## 三、全局CSS样式

### 全局样式

#### 按钮

```html
<!-- Standard button -->
<button type="button" class="btn btn-default">（默认样式）Default</button>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<button type="button" class="btn btn-primary">（首选项）Primary</button>

<!-- Indicates a successful or positive action -->
<button type="button" class="btn btn-success">（成功）Success</button>

<!-- Contextual button for informational alert messages -->
<button type="button" class="btn btn-info">（一般信息）Info</button>

<!-- Indicates caution should be taken with this action -->
<button type="button" class="btn btn-warning">（警告）Warning</button>

<!-- Indicates a dangerous or potentially negative action -->
<button type="button" class="btn btn-danger">（危险）Danger</button>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<button type="button" class="btn btn-link">（链接）Link</button>
```

显示的样式：

![image-20210604002619446](https://s2.loli.net/2022/03/31/UHS5BWkbsQh9KMA.png)

#### 图片

```html
<!-- 时刻让图片以 100% 比例显示 -->
<img src="..." class="img-responsive" alt="Responsive image">
<!-- 方形、圆形、相框 -->
<img src="..." alt="..." class="img-rounded">
<img src="..." alt="..." class="img-circle">
<img src="..." alt="..." class="img-thumbnail">
```

显示的样式：

![image-20210604002715553](https://s2.loli.net/2022/03/31/uCQ3wDFyOYZVLtM.png)

#### 表格

在table标签中添加class的属性为table，之后可以添加其他样式设置表格现实的样式

```html
<table class="table table-striped">
	条纹状表格
</table>
```

```html
<table class="table table-bordered">
	带边框的表格
</table>
```

```html
<table class="table table-hover">
    鼠标悬停有阴影效果
</table>
```

#### 表单

给表单项添加class属性值：`class = “form-control”`

行内表格样式：

```html
<form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>
```

### 组件

#### 导航条

定义了一个导航条，主要实现的有响应式布局，下拉框，表单等

实现的效果如下所示：

![image-20210604005125450](https://s2.loli.net/2022/03/31/6RcDVbZMuINdr7j.png)

代码使用：

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
```

#### 分页条

实现的效果如下所示：

![image-20210604005031912](https://s2.loli.net/2022/03/31/om1JMNZPGxQ7KqB.png)

使用的代码如下所示：

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li>
      <a href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li>
      <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
```

其中，选中的页面（当前页面）我们可以li标签的`class = “active”`，禁用的li标签我们可以设置为`class = “disabled”`

### 插件

#### 轮播图

主要是一个轮播图的实现，可以将图片添加进去，实现一个轮播图的效果

```html
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img src="..." alt="...">
            <div class="carousel-caption">
                ...
            </div>
        </div>
        <div class="item">
            <img src="..." alt="...">
            <div class="carousel-caption">
                ...
            </div>
        </div>
        ...
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
```
