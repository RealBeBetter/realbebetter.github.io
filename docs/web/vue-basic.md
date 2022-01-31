---
title: 【Web】Vue入门知识
date: 2021-06-04 15:11:10
tags:
- Web
---

Vue属于JavaScript框架，主要是为了简化DOM操作，响应式数据驱动

## 一、Vue基础

### 创建第一个Vue程序

1. 导入开发版本的Vue
2. 创建Vue实例对象，设置`el`属性和`data`属性
3. 使用简洁的**模板语法**将数据渲染到页面上

```html
<div id="app">
    {{message}}
</div>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
    var app = new Vue ({
        el:"#app",
        data:{
            message : "Hello Vue!"
        }
    })
</script>
```

### el挂载点

- vue实例的作用范围
  - Vue会管理el选项命中的元素及其内部的后代元素
- 是否可以选择其他的选择器
  - 可以使用其他的选择器,但是建议使用ID选择器
- 是否可以设置其他的DOM元素
  - 可以使用其他的双标签，不能使用HTML和BODY

### data数据对象

- Vue中用到的数据定义在data中
- data中可以写复杂类型的数据
- 渲染复杂类型数据时，遵守js的语法即可

```html
<body>
<div id="user">
    <h2>
        {{name}}
        {{users.main_female}}
        {{users.main_male}}
    </h2>
    <ul>
        <li>{{time[0]}}</li>
        <li>{{time[1]}}</li>
    </ul>
</div>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
    var helloWolrd = new Vue({
        el: "#user",
        data: {
            name: "Hello World",
            users: {
                main_male: "坚书直实",
                main_female: "一行瑠璃"
            },
            time: ["2021-06-11(中国大陆)", "2019-09-20(日本)"]
        }
    })
</script>
</body>
```

## 二、本地应用

### 指令

#### v-text

- `v-text`指令的作用是设置标签的内容(textContent)
- 默认写法会替换全部内容，使用差值表达式`{{}}`可以替换指定内容

```html
<body>
<div id="app">
    <h2 v-text="message + '!'">此处标签内部将全部替换成{{message}}！</h2>
    <h2 v-text="info + '!' ">此处将替换成{{info}}！</h2>
    <h2>{{ message + '!' }}!!!</h2>
</div>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
    var user = new Vue({
        el: "#app",
        data: {
            message: "雨下一整晚Real",
            info: "18888888888"
        }
    })
</script>
</body>
```

#### v-html

- v-html指令的作用是设置元素的innerHTML
- 内容中有html结构会被解析为标签
- v-text指令无论内容是什么，只会解析为文本（与v-text的区别）

```html
<body>
<div id="app">
    <h2 v-html="content"></h2>
    <h2 v-text="content"></h2>
</div>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
    var obj = new Vue({
        el: "#app",
        data: {
            content:"<a href='https://www.baidu.com'>百度</a>"
        }
    })
</script>
</body>
```

![image-20210604021356088](https://i.loli.net/2021/06/04/Z5RbG64rsapnEQB.png)

#### v-on

- v-on指令的作用是为元素绑定事件
- 事件名不需要写on
- 指令可以简写为@
- 绑定的方法定义在methods属性中

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <input type="button" value="v-on指令" v-on:click="printMessage">
    <input type="button" value="v-on简写" @click="printMessage">
    <input type="button" value="双击事件" @dblclick="printMessage">
    <h2 @click="addMark">{{message}}</h2>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            message: 'Hello World'
        },
        methods: {
            printMessage: function () {
                alert('Hello Vue!');
            },
            addMark: function () {
                this.message += '!!!';
            }
        }
    })
</script>
</body>
```

- 事件绑定的方法写成函数调用的形式，可以传入自定义参数
- 定义方法时需要定义形参来接收传入的实参
- 事件的后面跟上`.`修饰符可以对事件进行限制
- `.enter`可以限制触发的按键为回车，事件修饰符有多种

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <input type="button" value="v-on-supplement" @click="printHello('!')">
    <input type="text" value="keyup按钮" @keyup.enter="pressEnter">
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {},
        methods: {
            printHello: function (mark) {
                console.log('Hello World' + mark);
            },
            pressEnter: function () {
                alert('Enter');
            }
        }
    })
</script>
</body>
```

#### 案例：计数器

实现一个类似于电商购物车的计数器按钮一样的小插件，累加到10或者递减到0都会给出提示

- 创建Vue示例时：el(挂载点)，data(数据)，methods(方法)
- v-on指令的作用是绑定事件，简写为@
- 方法中通过this，关键字获取data中的数据
- v-text指令的作用是设置元素的文本值，简写为{{}}

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <button @click="sub">-</button>
    <span>{{num}}</span>
    <button @click="add">+</button>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            num: 1,
        },
        methods: {
            add: function () {
                if (this.num < 10) {
                    this.num++;
                } else {
                    alert('数量已经过大');
                }
            },
            sub: function () {
                if (this.num > 0) {
                    this.num--;
                } else {
                    alert('数量已经过小');
                }
            }
        }
    })
</script>
</body>
```

#### v-show

- v-show指令的作用是根据真假切换元素的显示状态
- 原理是修改元素的display，实现显示隐藏
- 指令后面的内容最终都会解析为布尔值
- 值为true元素显示，值为false元素隐藏

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <input type="button" value="切换显示状态" @click="changeDisplay">
    <input type="button" value="累加年龄" @click="addAge">
    <input type="button" v-show="isShow" value="测试按钮（切换显示）">
    <input type="button" v-show="age>=18" value="累加年龄（测试表达式）">
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            isShow: false,
            age: 17
        },
        methods: {
            changeDisplay: function () {
                this.isShow = !this.isShow;
            },
            addAge: function () {
                this.age++;
            }
        }
    })
</script>
</body>
```

#### v-if

- v-if指令的作用是根据表达式的真假切换元素的显示状态
- 本质是通过操纵dom元素来切换显示状态
- 表达式的值为true，元素存在于dom树中；为false，从dom树中移除

实际上，与v-show的区别在于操作的对象的不同。v-show操作的是元素的CSS样式属性，通过切换`display: none;`的存在状态切换元素的显示状态。v-if则直接操作DOM对象，通过切换DOM对象的有无直接切换显示效果。

开发中，如果切换频繁，使用v-show；反之，则用v-if。

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <input value="v-if切换" type="button" @click="toggleIsIf">
    <h2 v-if="isIf">v-if切换</h2>
    <input value="v-show切换" type="button" @click="toggleIsShow">
    <h2 v-if="isShow">v-show切换</h2>
    <input value="v-if条件表达式" type="button">
    <h2 v-if="day<=15">时间不多了</h2>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            isShow: false,
            isIf: false,
            day: 10
        },
        methods: {
            toggleIsShow: function () {
                this.isShow = !this.isShow;
            },
            toggleIsIf: function () {
                this.isIf = !this.isIf;
            }
        }
    })
</script>
</body>
```

#### v-bind

- v-bind指令的作用是为元素绑定属性
- 完整写法是`v-bind:属性名`
- 简写的话可以直接省略v-bind，只保留`:属性名`

编写的时候两种方式都可以，设置class等属性的时候，我们一般使用`:class="{active:isActive}"`这种方式来调用值的显示判断，而不是写繁琐的三元表达式。这种写法的含义：如果active后面的`isActive`的值为真时，class属性才会为`active`。

```html
<head>
    <style>
        .active {
            border: 5px solid red;
        }
    </style>
</head>
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <img :src="imgSrc" :title="imgTitle + '操作'">
    <br>
    <img :src="imgSrc" :title="imgTitle + '操作'" :class="isActive?'active':''" @click="toggleActive">
    <br>
    <img :src="imgSrc" :title="imgTitle + '操作'" :class="{active:isActive}" @click="toggleActive">
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            imgSrc: 'https://i.loli.net/2021/05/31/V8c59ltbjoQzfus.png',
            imgTitle: 'Redis',
            isActive: false
        },
        methods: {
            toggleActive: function () {
                this.isActive = !this.isActive;
            }
        }
    })
</script>
</body>
```

#### 案例：轮播图

目前已知熟练的使用轮播图的方式包括：

①使用Bootstrap框架套用模板样式实现

②使用Vue实现，通过按钮绑定点击事件，切换显示图片的索引实现

- 列表数据使用数组保存，保存轮播图中所有图片的src路径
- v-bind指令可以设置元素属性，比如src
- v-show和v-if都可以切换元素的显示状态，频繁切换用v-show

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <!-- 左箭头 -->
    <a href="javascript:void(0)" @click="prev" v-show="index!==0">&lt;</a>
    <img :src="imgSrc[index]">
    <!-- 右箭头 -->
    <a href="javascript:void(0)" @click="next" v-show="index<imgSrc.length-1">&gt;</a>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            imgSrc: [
                '1.jpg',
                '2.jpg',
                '3.jpg',
                '4.png',
            ],
            index: 0
        },
        methods: {
            prev: function () {
                if (this.index > 0) {
                    this.index--;
                }
            },
            next: function () {
                if (this.index < 4) {
                    this.index++;
                }
            }
        }
    })
</script>
</body>
```

#### v-for

- v-for指令的作用是根据数据生成列表结构
- 数组经常和v-for结合使用
- 语法是`( item,index ) in数据`
- item和index可以结合其他指令一起使用
- 数组长度的更新会同步到页面上，是响应式的

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <ul>
        <li v-for="(item,index) in arr">{{index + 1}}City：{{item}}</li>
    </ul>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            arr: ['北京', '上海', '广州', '深圳'],
        },
        methods: {}
    })
</script>
</body>
```

#### v-model

- v-model指令的作用是便捷的设置和获取表单元素的值
- 绑定的数据会和表单元素值相关联
- 绑定的数据←→表单元素的值（双向绑定）
- 无论修改其中哪一方，都会使双方的值发生变化

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <input type="button" value="修改message" @click="setMessage">
    <input type="text" v-model="message" @keyup.enter="getMessage">
    <h2>{{message}}</h2>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            message: 20,
        },
        methods: {
            getMessage: function () {
                alert(this.message);
            },
            setMessage: function () {
                this.message = 40;
            }
        }
    })
</script>
</body>
```

## 三、网络应用

Vue结合网络数据开发内容，我们需要使用到一个网络请求库axios

### axios

一个功能强大的网络请求库

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

```
axios.get(地址?key=value&key2=values).then(function(response){},function(err){})
axios.post(地址,{key:value,key2:value2}).then(function(response){},function(err){})
```

- axios必须先导入才可以使用
- 使用get或post方法即可发送对应的请求
- then方法中的回调函数会在请求成功或失败时触发
- 通过回调函数的形参可以获取响应内容，或错误信息

```html
<body>
<!-- 导入 axios 包，官网提供的 axios 在线地址 -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<input type="button" value="get请求" class="get">
<input type="button" value="post请求" class="post">
<script>
    /*
    * 1. 利用 get 请求获取三条信息
    * */
    document.querySelector(".get").onclick = function () {
        axios.get('https://autumnfish.cn/api/joke')
        .then(function (response) {
            console.log(response);
        }, function (err) {
            console.log(err);
        })
    }
    /*
    * 2. 利用 post 获取注册请求
    * */
    document.querySelector('.post').onclick = function () {
        axios.post('https://autumnfish.cn/api/user/reg',{username:'Real123'})
        .then(function (response) {
            console.log(response);
        }, function (err) {
            console.log(err);
        })
    }
</script>
</body>
```

### axios+Vue

- axios回调函数中的this已经改变，无法访问到data中数据
- 把this保存起来，回调函数中直接使用保存的this即可

```html
<body>
<!-- 2. HTML 结构-->
<div id="app">
    <input type="button" value="get请求" @click="getJoke">
    <p>{{joke}}</p>
</div>
<!-- 1. 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 导入 axios 包，官网提供的 axios 在线地址 -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>


    /* 3. 创建 Vue 实例 */
    var obj = new Vue({
        el: "#app",
        data: {
            joke: 0,
        },
        methods: {
            getJoke: function () {
                /*
                * 4. 利用 get 请求获取三条信息
                * */
                var that = this
                axios.get('https://autumnfish.cn/api/joke')
                    .then(function (response) {
                        that.joke = response.data;
                    }, function (err) {
                        console.log(err);
                    });
            }
        }
    })
</script>
</body>
```

