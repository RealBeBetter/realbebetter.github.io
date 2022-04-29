---
title: 【Web】JavaScript基础知识
date: 2021-06-03 22:26:18
tags:
- Web
---

## 一、JavaScript相关介绍

### 浏览器执行js流程

浏览器分成两部分：渲染引擎和JS引擎

渲染引擎：用来解析HTML与CSS，俗称内核，比如chrome浏览器的blink，老版本的webkit

JS引擎：也称为JS解释器。用来读取网页中的JavaScript代码。对其处理后运行。比如chrome浏览器的V8

浏览器本身并不会执行JS代码。而是通过内置JavaScript引擎(解释器)来执行JS代码。JS 引擎执行代码时逐行解释每一句源码(转换为机器语言)， 然后由计算机去执行，所以JavaScript语言归为脚本语言会逐行解释执行。

### js的组成

JavaScript是一种解释型语言。

ECMAScript、BOM、DOM

ECMAScript：ECMAScript规定了JS的编程语法和基础核心知识,是所有浏览器厂商共同遵守的一套S语法工业标准。

文档对象模型( Document Object Model，简称DOM)：是W3C组织推荐的处理可扩展标记语言的标准编程接口。通过DOM提供的接口可以对页面上的各种元素进行操作(大小位置、颜色等)。

BOM (Browser Object Model，简称BOM)：是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。通过BOM可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等。

### js编写位置

行内、嵌入、外部

**行内**

<!-- 行内式的 JavaScript -->
<input value="按钮" type="button" onclick="alert('Hello, World!')" />

**嵌入**

<script>
    /* 内嵌式的 JavaScript */
    alert("Hello World");
</script>


**外部**

<script src="js/my.js"></script>

```javascript
alert("Hello World 外部JS文件")
```

### js的输入输出

<script>
    // 用户输入框
    prompt("请输入您的年龄：");
    // 弹出警示框
    alert("Hello World");
    // console 控制台输出
    console.log("控制台能看到的");
</script>


注意：prompt返回的数据类型是string

## 二、变量

变量的声明方式是`var`，取的是变量（Variable）的前三个字母

	<script>
	    // 声明变量 var
	    var age;
	    // 变量赋值
	    age = 18;
	    // 控制台打印
	    console.log(age);
	</script>

变量的命名：只允许有字母、数字、美元符号$、下划线_组成；且不能以数字开头；不能是关键字

## 三、数据类型

**JavaScript是一种弱类型或者动态语言**

在代码运行时,变量的数据类型是**由JS引擎根据=右边变量值的数据类型来判断**的，运行完毕之后，量就确定了数据类型。

JavaScript拥有动态类型，同时也意味着相同的变量可用作不同的类型：

```javascript
var x = 16;
x = "real";
```

### 简单数据类型

Number、String、Boolean、Undefined、Null

八进制前面加0、十六进制前面加0x

**特殊**

Infinity：表示无穷大，大于任何数字

-Infinity：表示无穷小，小于任何数字

NaN：Not a Number，表示不是一个数字，代表一个非数值

![image-20220401092750382](https://s2.loli.net/2022/04/01/OVkxQGClnrU75M8.png)

**字符串**

使用中遇到引号，遵循“**外双内单、外单内双**”的原则。

使用length属性，可以获取字符串的长度；拼接使用+号；字符串和其他类型的数据拼接，结果是一个字符串

**Boolean**

与数字类型相加的时候，true为1，false为0

**Undefined和Null**

undefined类型和数字相加，结果是一个NaN

Null和数字相加，返回的是原先的数字

**typeof获取数据类型**

```javascript
x = "real";
console.log(x.length);
console.log(typeof x);		// string
var y = null;
console.log(typeof y);		// object
```

### 复杂数据类型

Object

其中，null的数据类型属于pbject类型

### 数据类型转换

表单、prompt获取到的数据类型都是string类型，如果需要用到类型转换，则需要使用数据类型转换。

**转换成字符串**

![image-20210531225741065](https://s2.loli.net/2022/04/01/y4QRguZha7efN8S.png)

**转换成数字**

![image-20210531230137864](https://s2.loli.net/2022/04/01/BJ3ZM6ydsuAOwKU.png)

隐式转换中的运算不能使用+号，即便是`+0`，还是会变成字符串类型

**转换为布尔型**

![image-20210531231101776](https://s2.loli.net/2022/04/01/6nr7CeTkPXBLWjt.png)

注意：代表空、否定的值都会被转换为`false`；如：`‘’`、0、NaN、null、undefined。其余的全部转为`true`。

## 四、运算符

### 算数运算符

![image-20210531231744505](https://s2.loli.net/2022/04/01/HPM4ei9bGyq8Q31.png)

自增自减运算符分为前置和后置，和其他的语言一致。前置：先运算，再返回值；后置：先返回值，再运算

### 比较运算符

![image-20210531232225329](https://s2.loli.net/2022/04/01/2irfmsjnyaogI78.png)

### 逻辑运算符

![image-20210531232443808](https://s2.loli.net/2022/04/01/SeubDaw4KZCmRAc.png)

### 赋值运算符

![image-20210531232543286](https://s2.loli.net/2022/04/01/S5Na48i29j6LwJo.png)

### 运算符优先级

![image-20220401092550976](https://s2.loli.net/2022/04/01/Dl9UOtEfkMuXVzw.png)

### 规范

#### 标识符命名规范

- 变量、函数的名称一定要有意义
- 变量的名称一般用名词
- 函数的名称一般用动词

#### 编码格式规范

运算符两侧加上空格，单行注释先添加一个空格之后再写内容

## 五、数组

数组的创建：两种方式

- 使用`new`关键字

  - ```javascript
    var a = new Array();
    a = [1, 2, 3, 4, 5];
    alert(typeof a);    // object
    alert(a);           // 1,2,3,4,5
    ```

- 使用字面量创建

  - ```javascript
    var a = [1, 2, 3, 4, 5];
    alert(typeof a);
    ```

js中的数组可以存放各种不同的数据类型，创建的数组默认是属于object类型的数据。

## 六、函数

函数的定义格式

```javascript
function printHelloWorld () {
    alert("Hello, World");
}
printHelloWorld();
```

带有参数的函数的定义

```javascript
function getSum (start, end) {
    var sum = 0;
    for (var i = start; i <= end; i++) {
        sum += i;
    }
    console.log(sum);
}
getSum(1, 100);
```

带有参数的函数中，形参可以看作是不用声明的变量。

注意：如果调用函数的时候，实参的个数多于形参的个数，函数将会取到形参的个数，剩下的不管；如果实参的个数小于形参，将会默认剩下没有输入的实参为一个undefined格式的变量，届时根据函数的规则，输出`NaN`。

*形参不传值，默认是undefined*

带有返回值的函数的定义

```javascript
function returnHelloWorld () {
    return 'Hello, World!';
}
console.log(returnHelloWorld());
```

使用上跟一般的函数没有区别，可以返回由一个变量接收的值。

### 作用域

关于作用域，在ES6之前，分为全局作用域和局部作用域。

简单来说，就是在函数内部定义的变量是一个局部作用域；而在函数外部定义的变量是一个全局作用域，整个JavaScript范围内均有效。

局部变量包含在函数内部声明定义的变量以及函数的形参

注意：**在函数内部，没有声明直接使用的变量属于全局变量**

关于局部变量和全局变量的生命周期以及运行效率

全局变量：当浏览器关闭的时候才会销毁，比较占用内存资源

局部变量：当程序执行完毕的时候就会销毁，相比全局变量比较节约资源

**块级作用域**

块级作用域是在ES6的时候新增的，在这之前是没有块级作用域的。

**作用域链**

内部函数访问外部函数的变量，采取的是链式查找的方式决定使用哪个值；这种结构我们称之为作用域链。（就近原则）

因为js中允许函数的嵌套定义，而其他语言一般是不允许的。

## 七、预解析

JavaScript代码是由浏览器中的JavaScript解析器来执行的。JavaScript 解析器在运行JavaScript代码的时候分为两步：预解析和代码执行。

- 预解析：js引擎会把JavaScript部分所有的var还有function提升到当前作用域的最前面

  - 变量预解析（变量提升）：将所有变量的声明提升到当前作用域的最前面，不提升赋值操作

    - ```javascript
      console.log(num);   // undefined
      var num = 10;
      ```

    - ```javascript
      fun();		// 报错，预解析只是将声明提前，并没有将赋值操作提前
      var fun = function () {
          // 该操作相当于将函数赋值给一个变量，交由这个变量一种调用权限
          return "Hello World!";
      }
      ```

  - 函数预解析（函数提升）：将所有函数的声明（函数体）提升到当前作用域的最前面，不调用函数

    - ```javascript
      func();		// 正常执行函数，因为将函数的声明提升到了当前作用域的最前面
      function func () {
          alert("Hello World!");
      }
      ```

  - 根据函数预解析，我们查看一个典型的案例：

    - ```javascript
      var a = 18;
      f1();
      function f1 () {
          var b = 9;
          console.log(a);		// undefined
          console.log(b);		// 9
          var a = '123';
      }
      ```

    - 根据函数与变量的预解析，其实上面的代码相当于执行的是下面的内容：

      ```javascript
      // 相当于执行的是下面的代码
      var a;
      function f1 () {
          var b;
          var a;
          b = 9;
          console.log(a);
          console.log(b);
          a = '123';
      }
      a = 18;
      f1();
      ```

  - 接下来再看一个案例，比较复杂的函数调用的案例：

    - ```javascript
      f1();
      console.log(c);
      console.log(b);
      console.log(a);
      
      function f1() {
          var a = b = c = 9;
          console.log(a);
          console.log(b);
          console.log(c);
      }
      ```

    - 这样的代码，整体执行相关事项以及执行过程如下所示（根据预解析以及变量声明的作用域判断）

      ```javascript
      // 相当于执行下面的代码内容
      function f1() {
          var a = 9;
          b = 9;
          c = 9;
          // var a = b = c = 9;  // 相当于 var a = 9; b = 9; c = 9;
          // 即a是局部作用域，b、c均为全局作用域
          console.log(a);     // 9
          console.log(b);     // 9
          console.log(c);     // 9
      }
      
      f1();
      console.log(c);     // 9
      console.log(b);     // 9
      console.log(a);     // 报错 a is not defined
      ```

- 代码执行：按照代码写的顺序从上往下执行

## 八、对象

在JavaScript中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。

对象是由**属性和方法**组成的。

- 属性：事物的**特征**，在对象中用属性来表示（常用名词）
- 方法：事物的**行为**，在对象中用方法来表示（常用动词）

**使用字面量创建对象**

```javascript
var user = {
    name: '雨下一整晚Real',
    age: 18,
    sex: '男',
    // 方法后面跟的是一个匿名函数
    printHelloWorld: function () {
        console.log('Hello World');
    }
}
var name = user.name;
var userElement = user['name'];
user.printHelloWorld();
console.log(userElement);
console.log(name);
```

**变量、属性、函数、方法总结**

- 变量：单独声明赋值，单独存在
- 属性：对象里面的变量称为属性，不需要声明，用来描述该对象的特征
- 函数：单独存在的，通过“函数名()”的方式就可以调用
- 方法：对象里面的函数称为方法，方法不需要声明，使用“对象.方法名()”的方式就可以调，方法用来描述该对象的行为和功能。

**使用new object创建对象**

```javascript
var user = new Object();
user.name = '雨下一整晚Real';
user.age = 18;
user.sex = '男';
user.printHelloWorld = function () {
    console.log('Hello World');
}
console.log(user.name);
console.log(user.age);
console.log(user.sex);
user.printHelloWorld();
```

**利用构造函数的方法创建对象**

```javascript
function User(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
var user1 = new User('雨下一整晚Real', 18, '男');
console.log(user1.name);
console.log(user1.age);
```

构造函数的名称首字母必须大写，调用构造函数创建新的对象的时候要使用`new`关键字。

**对象的遍历**

- 直接打印对象名，会以json的格式输出对象的属性名以及值

  - User {name: "雨下一整晚Real", age: 18, sex: "男"}

- 使用for关键字进行遍历

  - ```javascript
    console.log(user1);
    for (let user1Key in user1) {
        console.log(user1Key);
        console.log(user1[user1Key]);
    }
    ```

  - 这样的结构也可以进行遍历，上面输出的是属性名，下面输出的是属性值。

## 九、内置对象

JavaScript中的对象分为三类：自定义对象、内置对象、浏览器对象

前面两种对象是JS基础内容，属于ECMAScript；第三个浏览器对象属于js独有的

内置对象就是指JS语言自带的一些对象，这些对象供开发者使用，并提供了一-些常用的或是最基本而必要的功能（属性和方法）

我们可以通过查阅网站[MDN](https://developer.mozilla.org/zh-CN/)来查询内置对象的一些事情。

**Math对象**

```javascript
console.log(Math.PI);
console.log(Math.max(1, 99, 2));
console.log(Math.max('name'));  // NaN
console.log(Math.max());        // -Infinity
```

**日期对象**

```javascript
new Date();
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

实际使用

```javascript
// 1. 如果没有参数，返回的是当前的系统时间
var time = new Date();
console.log(time);
// 2. 参数的常用写法：数字型和字符串型
var date1 = new Date(2021, 6, 3);   // 返回的是当前的日期的零点零时零分
console.log(date1);
var date2 = new Date('2021-6-3 17:43:00');
console.log(date2);
```

实际运用，返回当前的时间：

```javascript
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();    // 返回的是0-11，使用的时候要+1
var dates = date.getDate();     // 返回的是日期，号
var day = date.getDay();        // 返回的是0-6，使用的时候要+1
var days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
var trueDay = days[day];
console.log('您好！今天是' + year + '年' + (month + 1) + '月' + dates + '日' + trueDay);
```

常用的Date函数如下所示：

![image-20210603175544907](https://s2.loli.net/2022/04/01/IV1YdpCES8aLy7r.png)

**数组对象**

```javascript
// 1. 利用数组字面量
var array = [1, 2, 3, 4, 5];
console.log(array);
// 2. 使用new关键字创建
var array1 = new Array(1, 2, 3, 4, 5);
console.log(array1);
```

添加和删除数组元素的方法

![image-20210603180457699](https://s2.loli.net/2022/04/01/tiahfLCQJ5wWTH1.png)

数组排序

![image-20210603180721420](https://s2.loli.net/2022/04/01/EaUoglsGMR6VNuQ.png)

```javascript
// 数组排序
// 1. 数组反转
var array = new Array('Real', 'Virtual', 'Red', 'Pink');
array.reverse();
console.log(array);
// 2. 冒泡排序
var array1 = new Array(1, 6, 4, 2, 78, 64, 21);
array1.sort(function (a, b) {
    // return a - b; // 升序排序
    return b - a;  // 降序
});
console.log(array1);
```

**数组转换为字符串**

![image-20210603183151683](https://s2.loli.net/2022/04/01/WzudDtPAfocC3EZ.png)

```javascript
// 数组转换成字符串
// 1. toString() 将数组转换成字符串
var number = [1, 2, 3, 4, 5, 6];
console.log(number.toString());
// 2. join(分隔符)
var colors = ['green', 'purple', 'red'];
console.log(colors.join('-'));  // green-purple-red
console.log(colors.join(','));  // green,purple,red
```

**数组中的其他操作**

![image-20210603190624908](https://s2.loli.net/2022/04/01/BN4dr9VE6eR8jip.png)

## 十、基本包装类型

为了方便操作基本数据类型，JavaScript还提供了三个特殊的引用类型：String、Number和Boolean

基本包装类型就是把简单数据类型包装成为复杂数据类型，这样基本数据类型就有了属性和方法。

**字符串不可变**

```
var str = 'abc';
str = 'hello';
// 当重新给str赋值时，常量'abc'不会被修改，还是会存放在内存中
// 当重新给字符串赋值时，会重新在内存中开辟新的空间，这个特点就是字符串的不可变
// 由于字符串的不可变，在大量拼接字符串的时候会有效率问题
var str = '';
for (var i = 0; i < 10000000; i++) {
    str += i;
}
console.log(str);       // 这个结果会需要很长时间显示，因为需要不断开辟空间
```

**根据字符返回位置**

![image-20210603192102042](https://s2.loli.net/2022/04/01/Sd3KGjMTFysclna.png)

```javascript
var str = 'Real';
console.log(str.indexOf('a'));      // 根据字符返回索引
console.log(str.charAt(2));         // 根据索引返回字符
console.log(str.charCodeAt(2));     // 根据位置返回字符的ASCII码，判断用户按下了哪个键
console.log(str[2]);                // 返回字符串的索引值处的字符
```

**字符串的操作方法**

![image-20210603193002203](https://s2.loli.net/2022/04/01/bI2eumxjDzh4ySP.png)

```javascript
var str = 'Real';
console.log(str.concat('Virtual')); // RealVirtual
```

```javascript
var str = 'Real';
console.log(str.substr(0, 2));  // Re
```

**字符串分割和替换**

```
// 1. 字符串中的字符替换 replace 只会替换第一个字符
var str = '1345648786415646487652';
while (str.indexOf('6') !== -1) {
    str = str.replace('6', '*');
}
console.log(str);
// 2. 将字符串转换成数组 split 分割
str = '1345648786415646487652';
var strings = str.split('6');
console.log(typeof strings);    // object
console.log(strings);           // ["1345", "4878", "415", "4", "487", "52"]
```

## 十一、简单数据类型和复杂数据类型

简单类型又叫做**基本数据类型**或者**值类型**，复杂类型又叫做**引用类型**。

- 值类型：简单数据类型/基本数据类型，在存储时变量中存储的是值本身，因此叫做值类型
  - string , number，boolean , undefined，null
- 引用类型：复杂数据类型，在存储时变量中存储的仅仅是地址(引用)，因此叫做引用数据类型
  - 通过new关键字创建的对象(系统对象自定义对象)，如Object、Array、 Date等

堆栈空间分配区别：

1、栈(操作系统)：由操作系统自动分配释放存放函数的参数值、局部变量的值等。其操作方式类似于数据结构中的栈；简单数据类型存放到栈里面
2、堆(操作系统) : 存储复杂类型(对象)，一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。复杂数据类型存放到堆里面

垃圾回收一般不涉及栈内存，一般堆内存进行垃圾回收。new关键字创建的对象都存放在堆空间中。

注意：JavaScript中是没有堆栈的概念的。

# 【JavaScript】DOM

## 十二、DOM

文档对象模型( Document Object Model ，简称DOM ) ，是W3C组织推荐的处理可扩展标记语言( HTML或者XML )的标准编程接口。

W3C已经定义了一系列的DOM接口，通过这些DOM接口可以改变网页的内容、结构和样式。

- 文档：一个页面就是一个文档，DOM中使用document表示
- 元素：页面中的所有标签都是元素，DOM中使用element表示
- 节点：网页中的所有内容都是节点（标签、属性、文本、注释等），DOM中使用node表示

DOM把以上的元素都看成是对象。

主要了解两个方法：

```
document.getElementById()					// 通过id获取对象
document.getElementsByTagName()				// 获取某一类标签，返回一个伪数组
```

修改标签体内容，使用`object.innerHTML = '';`即可修改标签体内容

事件：某些组件被执行某些操作之后，触发某些代码的执行

```
onclick = ‘’;			// 单机事件
doubleClick = '';		// 双击事件
```

核心DOM模型包含三个对象：Document（文档对象）、Element（元素对象）、Node（节点对象，其他五个的父对象）

![image-20210603222658885](https://s2.loli.net/2022/04/01/wEc1xLXsIhOa3RB.png)

### Document（文档对象）

- 创建(获取)：在html dom模型中可以使用window对象来获取
  - window. document
  - document
- 方法：
  - 获取Element对象：
    - `getElementById()`：根据id属性值获取元素对象，id属性值一般唯一
    - `getElementsByTagName()`：根据元素名称获取元素对象们，返回值是一个数组
    - `getElementsByClassName()`：根据class属性值获取元素对象们，返回值是一个数组
    - `getElementsByName()`：根据name属性值获取元素对象们，返回值是一个数组
  - 创建其他DOM对象：
    - createAttribute(name)、createComment ()、createElement ()、createTextNode()
- 属性

### Element（元素对象）

- 获取/创建：通过document来获取和创建
- 方法：
  - `removeAttribute()`：删除属性
  - `setAttribute()`：设置属性

### Node（节点对象）

- 特点：所有dom对象都可以被认为是一个节点
- 方法：
  * CRUD dom树：
    * `appendChild()`：向节点的子节点列表的结尾添加新的子节点。
    * `removeChild()`：删除(并返回)当前节点的指定子节点。
    * `replaceChild()`：用新节点替换一个子节点。
- 属性：
  - `parentNode`返回节点的父节点。

## 十三、BOM

概念：Browser Object Model 浏览器对象模型

将浏览器的各个组成部分封装成对象。

组成：

* Window：窗口对象
  * 1.创建
  * 2.方法
    * 与弹出框有关的方法：
      * `alert()`显示带有一段消息和一个确认按钮的警告框。
      * `confirm()`显示带有一段消息以及确认按钮和取消按钮的对话框。
      * 如果用户点击确定按钮，则方法返回true
      * 如果用户点击取消按钮，则方法返回false
      * `prompt()`显示可提示用户输入的对话框。
      * 返回值：获取用户输入的内容
    * 与打开关闭有关的方法：
      * `close()`关闭浏览器窗口。关闭的是调用者的浏览器窗口
      * `open()`打开一个新的浏览器窗口。返回新的Window对象
    * 与定时器有关的方法：
      * `setTimeout()`在指定的毫秒数后调用函数或计算表达式。
      * 参数：1.js代码或者方法对象；2.毫秒值
      * 返回值：唯一标识，用于取消定时器
      * `clearTimeout()`取消 由setTimeout() 方法设置的timeout。
      * `setInterval()`按照指定的周期(以毫秒计)来调用函数或计算表达式。
      * `clearInterval()`取消由`setInterval()`设置的timeout 。
  * 3.属性
    * 获取其他BOM对象：
      * history
      * location
      * Navigator
      * Screen
    * 获取DOM对象：
      * document
  * 4.特点
    * Window对象不需要创建可以直接使用window使用。 `window.方法名();`
    * window引用可以省略。`方法名();`
* Navigator：浏览器对象
* Screen：显示器屏幕对象
* History：历史记录对象
  * 创建(获取)：`window.history`	`history`
  * 方法：
    * `back()`加载history 列表中的前一个URL。
    * `forward()`加载history列表中的下一个URL。
    * `go()`加载history列表中的某个具体页面。
      * 参数：
      * 正数：前进几个历史页面
      * 负数：后退几个历史页面
  * 属性：
    * length：返回当前窗口历史列表中的URL数量。
* Location：地址栏对象
  * 创建(获取) ：window.location/location
  * 方法：
    * `reload()`重新加载当前文档，刷新操作
  * 属性：
    * `href`设置或返回完整的URL，完成跳转操作一般需要加上http协议
