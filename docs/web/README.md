---
title: 【Web】HTML、CSS
date: 2021-06-30 16:17:10
tags:
- Web
---

# 一、常用标签

分类：成对标签、单标签（空标签）

特点：块标签、行内标签（内联标签）、行内块标签（内联块标签）

* 块标签特点：默认宽度100%，独占一行，可设置所有样式
  * div            布局用的，画块
  * p               段落
  * h1-h6       标题标签
  * hr              分割线，单标签

```html
<hr width="500" color="red" size="10" align="right">
```

* ul   li  无序列表，一般用在结构一样，样式一样的布局上 （导航）
* ol   li   有序列表  一般强调顺序的地方用有序列表 （排行榜，步骤）
* dl   dt   dd  自定义列表，一般用在结构有标题和对标题解释说明的地方 （京东的侧边导航）

```css
ul{
    list-style: none;  //取消默认的列表前边装饰
}
ol{
    list-style: none;
}
```

* 内联标签： 默认宽度由内容撑开，多个内联标签在一行显示，部分样式设置无效（width 、 height)
  * span  无语义，用来布局画块
  * strong  加粗，更有强调意义
  * b  加粗
  * em  倾斜，更有强调意义
  * i  倾斜
  * sup  上标字体
  * sub  下标字体
  * del   删除标签
  * br   换行标签
  * a   超链接
    * href  指定要跳转页面的路径
      * 网址   http://
      * 本地页面  （相对路径，找到要跳转的页面）
      * 锚点连接
        * 跳转到当前页面某个位置
        * 跳转到其他页面某个位置
      * 下载功能（要下载的文件路径放到href里即可）
      * 不知道跳转到哪  #代替
    * target  指定页面打开方式  _self(默认，当前窗口打开)   _blank 新窗口打开

```html
 <!-- 网址 -->
    <a href="http://www.baidu.com" target="_blank">跳转到百度</a>

    <!-- 相对路径 -->
    <!-- 同目录下可直接写文件名 -->
    <a href="1.第一个页面.html">跳转到本地页面</a>
    <!-- 同目录 ./(表示当前html所在文件夹) -->
    <a href="./1.第一个页面.html">跳转到本地页面</a>

    <!-- 不同目录下 ../表示的是当前页面所在文件夹的上一级目录 -->
    <a href="../1.html">跳转1.html</a>
    <a href="../../2.html">跳转到2.html</a>

    <!-- 锚点链接 : 本地页面某个位置 -->
    <a href="#eee">鹅鹅鹅</a>
    <a href="#jiji">木兰诗</a>
    <a href="#chuhe">悯农</a>

    <!-- 锚点连接：跳转其他页面的某个位置 -->
    <a href="./1.第一个页面.html#miaosha">第一个页面的秒杀位置</a>

    <!-- 下载文件 -->
    <a href="./我的机密文件.doc">下载机密文件</a>

    <p id="eee">鹅鹅鹅，曲项向天歌</p>

    <p id="jiji">唧唧复唧唧，木兰当户织</p>

    <p id="chuhe">锄禾日当午，汗滴禾下土</p>
```

* 内联块标签： 默认宽度由内容撑开，多个内联块标签在一行显示，可设置所有样式

  * img 图片标签，单标签

    * src  指定图片路径地址
    * alt  图片加载不出来时显示
    * title  鼠标移入图片时显示（其他标签也可设置该属性）
    * width  图片宽
    * height 图片高

    ```html
     <!-- 绝对路径 -->
        <img src="https://img2.baidu.com/it/71992034,1360591119&fm=26&fmt=auto&gp=1.jpg" alt="赵四">
        <img src="https://img2.baidu.com/it/u=3471992034,1360591119&fm=26&fmt=auto&gp=0.jpg" width="200" height="100" alt="" title="尼古拉斯">
    
        <!-- <img src="C:\Users\Administrator\Desktop\新建文件夹\实训1\day01\1.png" alt="">
         -->
    
         <!-- 相对路径 -->
         <img src="1.png" alt="">
         <img src="./1.png" alt="">
    
         <img src="../2.png" alt="">
    ```


### 表格

* 块标签
  * table   表格最大标签，表格中所有内容都放在table里
  * tr    一行
  * caption  表格标题
  * thead  表头
  * tbody  表格主体内容
  * tfoot  表格页脚
    * 写thead tbody tfoot 好处
      * 打乱顺序写，还可以保持从头到脚显示
      * 表格内容巨大时，可通过tbody将表格分段，加载一个tbody显示一个tbody
* 内联块标签
  * th   单元格，有小标题的语义
  * td  普通单元格

#### 属性

* table标签上属性
  * border   边框线
  * cellspacing  单元格与单元格空隙
  * cellpadding  单元格里内容到边框线的空隙
  * align   整个表格在浏览器中居中

* 单元格上的属性
  * rowspan  跨行合并
  * colspan   跨列合并
  * align   当前单元格内容居中

* tr  上属性
  * align  整个一行单元格内容居中

#### css样式

单元格边框合并

```css
		table{
            /* border-collapse: separate;  默认值，边框线独立*/
            border-collapse: collapse;  /* 边框线合并*/
        }
```

## 表单相关

#### 标签

* form 标签  块标签 提交表单时可写form标签
* input标签  内联块 表单元素
* select-option  内联块  下拉列表
* textarea  内联块  文本域
* label  标签

#### 属性

* form标签上属性
  * action  指定要提交的地址
  * method 提交方式 不设置默认是get
    * get  |  post 
* input标签上属性
  * type属性
    * text  文本框
    * password 密码框
    * radio   单选按钮
    * checkbox  复选按钮
    * submit  提交
    * image 以图片形式提交
    * button  普通按钮
    * reset  重置按钮
  * name 属性  表单元素要提交时必须设置该属性
  * value 属性  默认值
  * maxlength  可输入的最大长度
  * minlength  可输入的最小长度
  * required   必填项 ， 不能为空
  * checked  单选按钮和复选按钮的默认选中项
  * readonly  只读，可提交的
  * disabled  禁用，不可提交和修改
  * placeholder  提示用户要输入什么内容

* 下拉列表上的属性
  * selected   下拉列表的默认选中项

#### 样式

```css
input{
    /* 取消输入框聚焦时默认的加粗边框线 */
    outline: none;
}
textarea{
    /* 禁止用户拖拽文本域 */
    resize: none;
}
```



```html
 <form action="#" method="get">
     用户名：<input type="text" name="username" maxlength="5" required  minlength="2" value="小明">   <br><br>

     <input type="text" value="只可远观" readonly name="look"> <br><br>
     <input type="text" value="不可亵渎眼" disabled name="eye"> <br><br>

     密码： <input type="password" name="pass" placeholder="请输入密码"> <br> <br>

     性别： <input type="radio" id="boy" checked name="sex" value="boy"> 
     <label for="boy">男</label>  

     <input type="radio" name="sex" value="girl"> 女 <br><br>

     爱好： <input type="checkbox" id="game" name="hobby" value="game">  
     <label for="game">玩游戏</label>

     <input type="checkbox" name="hobby" value="book"> 读书
     <input type="checkbox" name="hobby" checked value="TV"> 看电视  <br><br>

     地址： <select name="address">
     <option>北京</option>
     <option>上海</option>
     <option>广州</option>
     <option selected>长沙</option>
     </select>  <br> <br>

     个人简介： <textarea name="me" cols="30" rows="10"></textarea>  <br><br>

     <input type="submit">
     <input type="reset">
     <input type="button" value="发送验证码">
     <input type="image" src="./1.png">
</form>
```

# 二、css引入方式

### 1.内部样式

```html
  <style>
      div{
          width: 200px;
          height: 200px;
          background-color: red;
      }
</style>
```



### 2.外部样式

* 先在外边新建一个后缀为.css的文件，通过link标签引入使用

```html
<link rel="stylesheet" href="./style.css">
```



### 3.行间样式

```html
 <p style="width: 100px; height: 100px; background-color: blue;"></p>
```



### 4.引入方式优先级

遵循就近原则，哪个离标签最近，就用那个样式

行间样式 > 内部样式和外部样式 （看谁离的近，就用谁）

