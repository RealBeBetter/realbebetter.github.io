---
title: 【Web】JQuery、Ajax框架
date: 2021-07-11 19:51:10
tags:
- Web
---

# JQuery框架

## 一、概念

一个JavaScript框架，简化js开发

jQuery是一个快速、 简洁的JavaScript框架， 是继Prototype之后又一 个优秀的JavaScript代码库 (或JavaScript框架) 。jQuery设计的宗旨是“write Less, Do More”，即倡导写更少的代码,做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式， 优化HTML文档操作、事件处理、动画设计和Ajax交互。

JavaScript框架：本质上就是一些js文件，封装了js的原生代码

## 二、快速入门

### 下载使用

进入[网站](https://www.jq22.com/jquery-info122)可以查看到各种版本的jQuery版本包，选择需要使用的版本下载或者引用都可。

建议生产环境中使用min.js结尾的版本，体积更小，加载速度更快

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
```

第一个程序：

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/jquery-3.5.1.min.js"></script>
</head>
<body>
  <div id="div1">div1...</div>
  <div id="div2">div2...</div>
</body>
<script>
  // 使用jQuery获取元素
  var div1 = $("#div1");
  alert(div1.html());
  var div2 = $("#div2");
  alert(div2.html());
</script>
</html>
```

其中，`$`是一个jQuery中内置的函数名。可以通过这个方法获取到html中的各种元素。

### jQuery对象和js对象

```javascript
// 使用js获取div元素
var divs = document.getElementsByTagName("div");
alert(divs);      // [object HTMLCollection]  数组
// 使用jQuery方式获取div元素
var $divs = $("div");
alert($divs);     // [object Object]  数组
// 二者区别在于：使用js数组对象的时候，要进行遍历操作；使用jq对象的时候不需要
var html = $divs.html("aaa");

/*区别：
* jq对象使用更加方便简洁
* jq对象和js对象中的方法不通用
* jq对象和js对象相互转换：
* jq ---> js  jq[index] / jq.get(index)
* js ---> jq  $(js Object)
* */
```

## 三、选择器

选择器：筛选具有相同特征的元素（标签）

### 分类

基本选择器

- 标签选择器(元素选择器)
  - 语法: `$("html标签名")`获得所有匹配标签名称的元素
- id选择器
  - 语法: `$("#id的属性值")`获得与指定id属性值匹配的元素
- 类选择器
  - 语法: `$(".class的属性值")`获得与指定的class属性值匹配的元素

层级选择器

- 后代选择器
  - 语法: `$("A B")`选择A元素内部的所有B元素，包括孙子元素等
- 子选择器
  - 语法: `$("A > B")`选择A元素内部的所有B子元素，不包括孙子元素

属性选择器

- 属性名称选择器
  - 语法: `$("A[属性名]")`包含指定属性的选择器
- 属性选择器
  - 语法: `$("A[属性名='值']")`包含指定属性等于指定值的选择器，也有不等于选择器
  - 语法：`$("A[属性名^='值']")`匹配以值开始的属性
  - 语法：`$("A[属性名$='值']")`匹配以值结束的属性
  - 语法：`$("A[属性名*='值']")`匹配包含某些值的属性
- 复合属性选择器
  - 语法: `$("A[属性名='值'][]...")`包含多个属性条件的选择器

过滤选择器

- 首元素选择器
  - 语法: `:first`获得选择的元素中的第一 个元素
- 尾元素选择器
  - 语法: `:last`获得选择的元素中的最后一个元素
- 非元素选择器:
  - 语法: `:not(selecter)` 不包括指定内容的元素
- 偶数选择器
  - 语法: `:even`偶数，从0开始计数
- 奇数选择器
  - 语法:`:odd`奇数，从0开始计数
- 等于索引选择器
  - 语法: `:eq(index)` 指定索引元素
- 大于索引选择器
  - 语法: `:gt(index)` 大于指定索引元素
- 小于索引选择器
  - 语法: `:lt(index)` 小于指定索引元素
- 标题选择器
  - 语法: `:header` 获得标题元素，固定写法

表单过滤选择器

- 可用元素选择器
  - 语法: `:enabled` 获得可用元素
- 不可用元素选择器
  - 语法: `:disabled` 获得不可用元素
- 选中选择器
  - 语法: `:checked` 获得单选/复选框选中的元素
- 选中选择器
  - 语法: `:selected` 获得下拉框选中的元素

### 基本语法

事件绑定：为jQuery获取到的元素添加事件绑定

```html
<input type="button" value="点击" id="b1">
```

```javascript
// 需求：给按钮绑定事件
// 1. 获取元素
$("#b1").click(function () {
    alert("abc");
})
```

添加事件绑定的时候直接使用jq提供的方法，使用匿名函数的方式。

入口函数：jq中的执行入口

```javascript
// js中原生的onload，页面加载完毕时执行该函数
window.onload = function() {

}
// jq入口函数，当页面加载结束时执行，相当于js中原生的onload
$(function () {
    
});

/*
* window.onload和$(function)的区别
* window.onload只能使用一次，定义多次将只会执行最后定义的那次
* $(function)可以执行多次
* */
```

样式控制：利用jq中的方法控制css样式

```javascript
// 样式控制
$(function () {
   // $("#div1").css("background-color","red");
   $("#div1").css("backgroundColor","red");
});
```

两种写法都能生效，参数为键值对的形式。

### DOM操作

#### 内容操作

`html()`	获取/设置元素的标签体内容，设置的时候会将标签体内容全部替换

`text()`	获取/设置元素的标签体纯文本内容，设置的时候会将标签体内容全部替换

`val()`	  获取/设置元素的value属性值

#### 属性操作

通用属性操作

> attr():获取/设置元素的属性
> removeAttr():删除属性
> prop():获取/设置元素的属性
> removeProp():删除属性

**attr和prop区别**：
1.如果操作的是元素的固有属性，则建议使用prop
2.如果操作的是元素自定义的属性，则建议使用attr

对class属性操作

> addClass():添加class属性值
> removeClass():删除class属性值
> toggleClass():切换class属性
> css():获取/设置元素的css样式

`toggleClass("one")`：判断如果元素对象上存在class="one"，则将属性值one删除掉。如果元秦对象上不存在，则添加属性值one

#### CRUD操作

- append():父元素将子元秦追加到末尾
  - 对象1.append(对象2):将对象2添加到对象1元秦内部，并且在末尾
- prepend():父元素将子元素追加到开头
  - 对象1. prepend(对象2) :将对象2添加到对象1元秦内部，并且在开头
- appendTo()
  - 对象1. appendTo(对象2):将对象1添加到对象2内部，并且在末尾
- prependTo()
  - 对象1. prependTo(对象2) :将对象1添加到对象2内部，并且在开头
- after():添加元素到元素后边
  - 对象1.after(对象2) :将对象2添加到对象1后边。对象1和对象2是兄弟关系
- before():添加元素到元素前边
  - 对象1. before(对象2) :将对象2添加到对象1前边。对象1和对象2是兄弟关系
- insertAfter()
  - 对象1. insertAfter(对象2) :将对象2添加到对象1后边。对象1和对象2是兄弟关系
- insertBefore()
  - 对象1.  insertBefore(对象2) :将对象2添加到对象1前边。对象1和对象2是兄弟关系
- remove()：移除元素
  - 对象.remove() :将对象删除
- empty() :清空元素的所有后代元素
  - 对象. empty():将对象的后代元素全部清空，但是保留当前对象以及其属性节点

## 四、动画

三种方式显示和隐藏元秦

默认显示和隐藏方式

- show( [speed,[easing],[fn]])
- hide([speed, [easing],[fn]])
- toggle([speed],[easing],[fn])

滑动显示和隐藏方式

- slideDown([ speed],[easing],[fn])
- slideUp( [speed, [easing],[fn]])
- slideToggle([speed],[easing],[fn])

淡入淡出显示和隐藏方式

- fadeIn( [speed],[easing],[fn])
- fadeOut([speed],[easing],[fn])
- fadeToggle([speed,[easing],[fn]])

参数：
speed:动画的速度。三个预定义的值("slow","normal", "fast" )或表示动画时长的毫秒数值(如: 1000)
easing:用来指定切换效果，默认是"swing", 可用参数" linear"
	swing:动画执行时效果是先慢，中间快，最后又慢
	linear :动画执行时速度是匀速的
fn :在动画完成时执行的函数，每个元素执行一次

## 五、遍历

js的遍历方式

- for(初始化值;循环结束条件;步长)

jq的遍历方式

- jq对象.each(callback)
- $.each(object，[callback])
- for. .of

```javascript
$(function () {
    let cities = $("#city li");
    for (let i = 0; i < cities.length; i++) {
        console.log(i + ":" + cities[i].innerHTML);
    }
    
    cities.each(function (index, element) {
        // 获取li元素 this
        // console.log(this.innerHTML);
        // 获取li元素 参数列表添加 索引,元素
        console.log(index + ":" + element.innerHTML);
        if ("上海" === $(element).html()){
            // function内部，返回true跳过本次循环，相当于continue
            // 返回false，结束循环，相当于break
            return false;
        }
        alert(index + ":" + element.innerHTML);
    });

    $.each(cities, function (index, element) {
        console.log(index + ":" + $(element).html());
    });

    // for ... of 该方法是jq 3.0 版本之后提供的方法
    for (city of cities) {
        console.log($(city).html());
    }
});
```

## 六、事件绑定

jquery标准的绑定方式

- jq对象.事件方法(回调函数) ;

  - 注：如果调用事件方法，不传递回调函数，则会触发浏览器默认行为

  - 表单对象.submit();//让表单提交

  - ```javascript
    $(function () {
        // 1. 获取name对象，绑定点击事件
        $("#name").click(function () {
            alert("我被点击了...");
        });
    
        // 2. 链式编程，绑定多个事件
        $("#name").mouseover(function () {
            alert("鼠标来了...");
        }).mouseout(function () {
            alert("鼠标走了...");
        }).focus();     // 让文本框获得焦点
    });
    ```

- on绑定事件/off解除绑定

  - jq对象.on("事件名称" ,回调函数)

  - jq对象. off("事件名称")

  - 如果off方法不传递任何参数，则将组件上的所有事件全部解绑

  - ```javascript
    $(function () {
        // 1. 使用on绑定单击事件
        $("#btn1").on("click", function () {
            alert("点击事件绑定成功！");
        });
        // 2. 使用off解绑单击事件
        $("#btn2").click(function () {
            // $("btn1").off("click");
            $("#btn1").off();        // 将组件上所有事件解绑
        });
    });
    ```

- 事件切换: toggle

  - jq对象. toggle(fn1,fn2...)

  - 当单击jq对象对应的组件后，会执行fn1，第二次点击会执行fn2.....执行的过程是一个循环

  - ```javascript
    // 需要使用migrate插件
    $(function () {
        $("#btn1").toggle(function () {
            $("#myDiv").css("backgroundColor", "green");
        }, function () {
            $("#myDiv").css("backgroundColor", "red");
        });
    });
    ```

## 七、插件

### 实现方式

- `$.fn.extend(object)`

  - 增强通过jQuery获取的对象的功能

  - ```js
    $.fn.extend({
    	// 定义一个check方法，所有的jq对象都可以使用
    	check:function() {
    		alert(123);
    	}
    });
    // 调用方法
    $("#id").check();
    ```

- `$.extend(object)`

  - 增强jQuery对象自身的功能

  - ```js
    $.enxtend({
    	// 获取最大值
    	max:function(a, b) {
    		return a >= b ? a : b;
    	}
    });
    // 调用方法
    $.max(2, 3);
    ```

# Ajax框架

## 一、概念

Ajax：Asynchronous JavaScript And XML，异步的JavaScript 和XML

异步和同步：客户端和服务器端相互通信的基础上

- 同步：客户端必须等待服务器端的响应。在等待的期间客户端不能做其他操作。
- 异步：客户端不需要等待服务器端的响应。在服务器处理请求的过程中，客户端可以进行其他的操作。

同步的请求，客户端在发出请求之后，是需要等待服务端完成相应之后才能继续下一步操作的；而异步的请求发出之后，客户端可以继续下一步操作，不需要等到服务器响应完成之后再进行。

> Ajax是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
> 通过在后台与服务器进行少量数据交换，Ajax可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
> 传统的网页(不使用Ajax) 如果需要更新内容，必须重载整个网页页面。

使用Ajax的好处是能够提升用户交互体验，减少不必要的数据请求，节省带宽。

## 二、实现方式

### 原生的js方式

```js
function fun() {
    // 发送异步请求
    // 1. 创建核心对象
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 2. 建立连接
    /**
     * 参数：
     * 请求方式：GET、POST
     *      get 方式：请求参数直接在url后面拼接，send方法空参
     *      post方式：请求参数定义在send方法的参数中
     * 请求的URL
     * 同步或异步请求：true（异步） false（同步）
     */
    xmlhttp.open("GET", "ajaxServlet?username=xxx", true);

    // 3. 发送请求
    xmlhttp.send();

    // 4. 服务器处理请求
    // 首先要了解什么时候获取请求->服务器响应完成后获取
    xmlhttp.onreadystatechange = function () {
        // 判断就绪状态是否为4，响应状态码是否为200
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // 获取服务器的响应结果
            let responseText = xmlhttp.responseText;
        }
    }
}
```

### jQuery方式

`$.ajax()`

- 语法：`$.ajax({key, value});`

- ```js
  // 发送异步请求
  $.ajax({
      url: "ajaxServlet",      // 请求路径
      type: "POST",           // 请求方式
      // data: "username=xx&age=20", // 请求参数
      data: {"username": "xx", "age": 20},
      success: function (element) {
          alert(element);
      },     // 响应成功后的回调函数，参数为服务器端编写的回调数据
      error: function () {
          alert("出错了...");
      },     // 表示出现错误后执行的回调函数
      dataType: "json",       // 设置接收到的响应数据格式
  });
  ```

`$.get()`：发送get请求

- 语法：`$.get(url, [data], [callback], [type]);`

- ```js
  $.get(
      "ajaxServlet",              // 请求URL
      {"username":"jack"},        // 请求数据
      function () {
          alert("hello");
      },          // 回调函数
      "text"      //  响应数据格式
  );
  ```

`$.post()`：发送post请求

- 语法：`$.post(url, [data], [callback], [type]);`

- ```js
  $.post(
      "ajaxServlet",              // 请求URL
      {"username":"jack"},        // 请求数据
      function () {
          alert("hello");
      },          // 回调函数
      "text"      //  响应数据格式
  );
  ```

