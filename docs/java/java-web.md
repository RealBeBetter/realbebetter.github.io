---
title: 【Java】Java Web 基础知识
date: 2021-07-10 19:31:02
tags:
- Java
- Web
---

## 一、Web相关概念

### 软件架构

- C/S	客户端/服务器端
- B/S	浏览器端/服务器端（不需要专门为客户端开发程序）

### 资源分类

- 静态资源：所有用户访问后，得到的结果都是一样的，称为静态资源。静态资源可以直接被浏览器解析。
  - 例如：HTML、CSS、JavaScript
- 动态资源：每个用户访问相同资源后，得到的结果可能不一样，成为动态资源。动态资源被访问后，需要被转换成静态资源之后，才能返回给浏览器进行解析（响应）。
  - 例如：servlet、jsp、php、asp

### 网络通信

- IP：计算机设备在网络中的唯一标识
- 端口：应用程序中在计算机中的唯一标识，范围：0-65536
- 传输协议：规定了数据通信的规则
  - 基础协议
    - TCP：安全的、面向连接的协议：三次握手、四次挥手，速度慢
    - UDP：不安全的、面向无连接的协议，速度快

## 二、Web服务器软件Tomcat

### 服务器

安装了服务器软件的计算机，本质上还是计算机

### 服务器软件

接收用户的请求，处理请求，对用户的请求做出响应

### Web服务器软件

接收用户的请求，处理请求，对用户的请求做出响应

在web服务器软件中，我们可以部署web项目，让用户通过浏览器来访问这些项目

项目的容器，就是web容器

### 常见的Java相关的web服务器软件

- webLogic	Oracle公司的，大型Java EE服务器，支持所有的Java EE规范，收费
  - Java EE：Java在企业级开发中的使用的技术规范的总和，一共规定了13项大的规范
- webSphere     IBM公司的，大型Java EE服务器，支持所有的Java EE规范，收费
- JBoss     JBoss公司的，大型Java EE服务器，支持所有的Java EE规范，收费
- Tomcat      Apache基金组织的，中小型的Java EE服务器，仅仅支持少量的Java EE规范servlet/jsp，开源免费

## 三、Tomcat

### 下载

[下载链接](https://tomcat.apache.org/)

![image-20210418194830540](https://i.loli.net/2021/04/18/sYE7PlRmytOM6Ix.png)

根据系统版本，选择下载响应的版本，我这里下载其中的64-bit版本

### 安装

下载好相关的版本压缩包之后，解压缩到一个英文路径下即可，安装目录不要有空格和中文

### 卸载

删除解压缩之后的文件夹即可

![image-20210418195103463](https://i.loli.net/2021/04/18/wSqApEldstmK178.png)

目录结构如上所示。之后大多Apache相关的项目，目录结构均类似。

bin	可执行文件（binary）	conf	配置文件（configuration）

lib	依赖jar包（libraries）	logs	日志文件

temp	临时文件（temporary）	webapps	存放web项目，用户所需要访问的项目就放在webapps目录下

work	存放运行时的数据

### 启动

找到bin目录下的startup文件，根据对应的操作系统启动不同的后缀名文件，双击启动即可

![image-20210418201239148](https://i.loli.net/2021/04/18/pRG6BFvsNgcoOP7.png)

**Error信息汇总**

①启动时命令行窗口一闪而过

这是因为启动文件在执行的时候会自动扫描系统内部的Java变量

解决：需要在系统环境变量中配置JAVA_HOME环境变量，并且将环境变量配置为jdk的安装目录

②打开startup批处理文件后，中文显示乱码信息

这个时候打开conf目录下的logging.properties文件，修改47行的属性值为

```properties
java.util.logging.ConsoleHandler.encoding = GBK
```

③启动localhost:8080时失败

问题还是因为没有配置好JRE环境

解决：配置好jdk相关的环境变量

1.在计算机中的“新建系统变量”窗口中，新建一个名为“JAVA_HOME”的环境变量，变量值为Java的安装路径，如D:\Java\jdk-14.0.1

![image-20210418203643873](https://i.loli.net/2021/04/18/Za4FWPn3j56mIMv.png)![image-20210418203758580](https://i.loli.net/2021/04/18/GyVrQcvH5eM1uEb.png)

2.设置Path环境变量，该变量已经存在，所以在列表中选择Path，点击下方的“编辑”按钮，在弹出的窗口中添加如下信息：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin

![image-20210418203826772](https://i.loli.net/2021/04/18/TwJfSRnk1CsjqGt.png)

3.和JAVA_HOME一样，新建一个名为“classpath”的环境变量，变量值为：

```
%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
```

![image-20210418203859773](https://i.loli.net/2021/04/18/SWIN2esfgTjkQqv.png)

配置完之后，再进入cmd中输入java，即可看到相关信息。此时在浏览器中输入localhost:8080，可以看到tomcat的界面

![image-20210418204019936](https://i.loli.net/2021/04/18/5WnmhXroulwsa6R.png)

④启动报错

这个错误出现的原因是因为Tomcat在启动的时候会占用8080端口号，我们在使用tomcat软件的时候如果出现启动报错，是因为被别的软件或者服务占用了8080端口号。这样的解决方案有两个：①找到占用8080端口号的程序服务，结束该程序或者服务；②修改Tomcat自身的端口号

第一种解决方法，在cmd中输入netstat -ano命令

![image-20210418205118940](https://i.loli.net/2021/04/18/YZTJOByfluKnasq.png)

可以查到占用8080端口的程序的PID为11156，启动任务管理器，选择查看，根据进程id排序，找到该pid对应的程序，结束任务即可。

![image-20210418205403208](https://i.loli.net/2021/04/18/txmd2456kWJsN7I.png)

第二种，修改自身的端口号。在conf目录下的server.xml文件中，修改其中69行代码的port值。

这时候我们一般会修改端口为80，因为80是http协议的默认端口号，这样我们在访问时，就不需要输入端口号。

```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

### 关闭

①正常关闭：双击运行bin/shutdown.bat文件  /  在startup.bat文件打开之后的窗口中Ctrl + C

②强制关闭：点击启动窗口的关闭按钮

### 配置

部署项目的方式：

①直接将项目放到webapps目录下即可

启动方式：在浏览器中输入localhost:8080/项目文件夹名称/项目资源文件名（项目的访问路径）-->虚拟目录

②简化部署方式：将项目打包成一个war格式的包，再将war包放置在webapps文件夹下。

打包步骤：将项目压缩成zip格式，之后修改文件后缀名为war

war包放在webapps目录下之后会自动解压缩，删除war文件后解压缩的包也会自动删除

③在conf/server.xml文件中配置项目

在Host标签内配置新的标签<Context>并且配置好对应的属性值

```xml
<!--部署项目-->
<Context docBase="D:\hello" path="/hello"/>
```

其中docBase值的是项目存放的位置，path指的是用户访问的子路径名（虚拟目录）

④在apache-tomcat-8.5.65\conf\Catalina\localhost路径下创建一个新的xml文件（名称自定），编辑文件，添加新的Context标签，删除path属性

```xml
<Context docBase="D:\hello"/>
```

这样配置之后，虚拟目录就是xml文件的名称

### 动态项目和静态项目

**目录结构**

Java动态项目的目录结构

- 项目的根目录
  - WEB-INF目录
    - web.xml文件：web项目的核心配置文件
    - classes目录：放置的是classes的字节码文件目录
    - lib目录：放置的是依赖jar包

### Tomcat集成IDEA

将Tomcat集成到IDEA中，并且创建Java EE项目，部署项目。

①点击run，选择Edit configuration，选择Templates，选择到Tomcat Server

![image-20210419000934954](https://i.loli.net/2021/04/19/PUpCzT5As78ku1l.png)

②点击右侧的Configure即可，选择apache目录即可

![image-20210419001112312](https://i.loli.net/2021/04/19/TF4Cdos8riDV5GO.png)

③根据需要选择浏览器，之后点击OK即可

![image-20210419001212112](https://i.loli.net/2021/04/19/N3nogCzb2ZDP6pX.png)

### 创建项目运行

①创建一个新的Java项目

![image-20210420175821929](https://i.loli.net/2021/04/20/jR1ocbXJWdIAqBQ.png)

②右键点击项目的名称，之后选择Add Framework Support

![image-20210420180019336](https://i.loli.net/2021/04/20/ZyJfn769gA2uDRF.png)

勾选上述的选项，之后点击确认即可。

③创建项目完毕之后，简单编写一下index.jsp文件，按照普通的HTML文件编写

```html
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
  Hello Tomcat!
  </body>
</html>
```

这样编写之后，我们选择run->Edit Configuration，选择添加Tomcat环境部署，并且修改其中的虚拟路径为默认的主页路径

![image-20210420181018391](https://i.loli.net/2021/04/20/w2cdOiPERNWGM4Q.png)

修改界面如下所示

![image-20210420181123541](https://i.loli.net/2021/04/20/wFYvV1xTQElALHp.png)

如果没有这个界面需要点击Templates添加Tomcat服务器的环境，之后再在Deployment中添加开发项目

![image-20210420181231892](https://i.loli.net/2021/04/20/V6wzIDWT1lK534e.png)

因为在开发中，时常会往Tomcat中添加多个新的资源，想要重新加载新的资源文件的话需要重新启动Tomcat项目，比较繁琐而且影响性能，我们将上述的On update action和下面的选项一律改成Update resources选项，实现资源的即时更新，避免了繁琐地启动Tomcat服务。

④编写完界面之后点击运行

这个时候运行完毕就会直接跳转到浏览器并且打开刚才编写的界面。

![image-20210420181555300](https://i.loli.net/2021/04/20/176eDB5S8fCigjR.png)

结果符合编写内容

## 四、Servlet

### 概念

Servlet	Server Applet，运行在服务器端的小程序

Servlet本质上就是一个接口，定义了Java类被浏览器访问到（Tomcat识别）的规则

我们在使用的时候，需要自定义一个类，实现servlet接口，并且覆写其中的一些方法。

### 使用步骤

①创建一个Java EE项目

根据之前创建的项目，在src目录下新建类

②定义一个类，实现Servlet接口

在src下新建cn.itcast.web.servlet.ServletDemo1类，代码如下

```java
public class ServletDemo1 implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    // 提供服务的方法
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("Hello , servlet!");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}
```

如果无法正常导包，需要将\apache-tomcat-8.5.65\lib\servlet-api.jar这一路径下的servlet-api.jar包导入到WEB-INF目录下的lib子目录并且添加为库文件。

③实现这个接口中的一些抽象方法

这里主要实现的是service方法，我们直接打印输出相关信息即可。

④配置Servlet

在web.xml文件中配置servlet

```xml
<!--配置servlet-->
<servlet>
    <servlet-name>demo1</servlet-name>
    <servlet-class>cn.itcast.web.servlet.ServletDemo1</servlet-class>
</servlet>

<!--配置servlet的映射-->
<servlet-mapping>
    <servlet-name>demo1</servlet-name>
    <url-pattern>demo1</url-pattern>
</servlet-mapping>
```

配置好之后，我们直接启动，运行结果就是会在控制台打印输出service类中的语句。

### 执行原理

①当服务器接收到客户端浏览器的服务请求后，会解析请求URL路径，获取访问的Servlet的资源路径

②查找web.xml文件中是否有对应的`<url-pattern>`标签体内容

③如果有，则再找到servlet-class对应的全限定名

④Tomcat会将字节码文件加载进内存，并且创建其对象

⑤调用相关的方法

### Servlet中的生命周期

①被创建：执行init方法，只执行一次

* Servlet什么时候被创建？
  * 默认情况下，第一次被访问时，Servlet被创建
    * 可以配置执行Servlet的创建时机
  * 在<servlet>标签下配置
    * 第一次被访问时，创建：<load-on-startup>的值为负数
    * 在服务器启动时，创建：<load-on-startup>的值为0或正整数
* Servlet的`init()`方法，只执行一次。说明一个Servlet在内存中只存在一个对象，Servlet是单例的
  * 多个用户同时访问时，可能存在线程安全问题
  * 解决：尽量不要在Servlet中定义成员变量，如果需要使用到，可以定义局部变量；需要用到的话，要避免多线程同时操作

②提供服务：执行service方法，执行多次

- 每次访问Servlet时，Service方法都会被调用一次

③被销毁：执行destroy方法，执行一次

- Servlet被销毁时执行。服务器关闭时，Servlet被销毁
- 只有服务器正常关闭时，才会执行destroy方法。destroy方法是在服务器关闭之前执行的

```java
public class ServletDemo2 implements Servlet {

    /*初始化方法
     * 在servlet被创建的时候执行，只会被执行一次
     * */
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("init...");
    }

    /*
    * 获取ServletConfig对象，ServletConfig : Servlet的配置对象
    * */
    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    /*提供服务方法
     * 每一次Servlet被访问时执行，执行多次
     * */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("service...");
    }

    /*
    * 获取Servlet的一些信息，版本等
    * */
    @Override
    public String getServletInfo() {
        return null;
    }

    /*
     * 销毁方法
     * 在servlet被关闭时执行/在服务器被关闭时执行，执行一次
     * */
    @Override
    public void destroy() {
        System.out.println("destroy...");
    }
}
```

## 五、Http

### 概念

Hyper Text Transfer Protocol，超文本传输协议

传输协议：定义了客户端和服务器端通信时发送数据的格式

特点：

1.基于TCP/IP的高级协议
2.默认端口号：80
3.基于请求/响应模型的：一次请求对应一次响应
4.无状态的：每次请求之间相互独立，不能交互数据

历史版本：
1.0：每一次请求响应都会建立新的连接

1.1：复用连接，对于缓存的支持比较好，能够提高连接使用的效率

### 数据格式

- Request和Response是由服务器创建的两个对象，交由我们来使用。
- Request对象是用来获取请求消息的，Response对象是用来设置响应消息的。

**Request继承体系**

ServletRequest				  	--接口
继承
HttpServletRequest  			--接口
实现
org . apache. catalina . connector . RequestFacade	--类(tomcat )

**Request功能**

获取请求消息：

- 获取请求行数据

  - GET  /day14/ demo1?name=zhangsan  HTTP/1.1

  - 方法：

  - 1、获取请求方式：GET
    String getMethod( )
    2、获取虚拟目录：/day14
    String getContextPath()
    3、获取Servlet路径：/demo1
    String getServletPath()
    4、获取get方式请求参数：name=zhangsan
    String getQueryString()

    5、获取请求URI：/day14/demo1
    String getRequestURI()：/day14/demo1
    StringBuffer getRequestURL() ：http://localhost/day14/demo1
    URL：统一资源定位符	范围相比于下者更小
    URI：统一资源标识符	范围更大
    6、获取协议及版本：HTTP/1.1
    String getProtocol()
    7、获取客户机的IP地址：
    String getRemoteAddr( )

- 获取请求头数据

  - 方法:
    * `String getHeader(String name)`：通过请求头的名称获取请求头的值
    `Enumeration<string> getHeaderNames()`：获取所有的请求头名称

- 获取请求体数据

  - 请求体：只有POST请求方式才有请求体，在请求体中封装了POST请求的请求参数
  - 步骤：
    1、获取流对象：
    `BufferedReader getReader()`：获取字符输入流，只能操作字符数据
    `Servlet Inputstream getInputStream()`：获取字节输入流，可以操作所有类型数据
    2、从流对象中拿数据

**其他功能**

1、获取请求参数通用方式
`String getParameter(String name)`：根据参数名称获取参数值username=zs&password=123
`String[] getParameterValues(String name)`：根据参数名称获取参数值的数组hobby=xx&hobby=game
`Enumeration<String> getParameterNames()`：获取所有请求的参数名称
`Map<String, String[]> getParameterMap()`：获取所有参数的map集合

中文乱码问题：
* get方式：tomcat 8已经将get方式乱码问题解决
* post方式：会发生乱码问题
  * 解决：在获取参数前，设置request的编码`request.setCharacterEncoding("utf-8");`这个设置的参数需要和页面中指定的Charset一致。

2、请求转发：一种在服务器内部的资源跳转方式
步骤：
1.通过request对象获取请求转发器对象：`RequestDispatcher getRequestDi spatcher(String path)`
2.使用RequestDispatcher对象来进行转发：`forward(ServletRequest request, ServletResponse response)`
特点：
1.浏览器地址栏路径不发生变化
2.只能转发到当前服务器内部资源中
3.转发是一次请求

3、共享数据

域对象：一个有作用范围的对象，可以在范围内共享数据
request域：代表一次请求的范围， 一般用于请求转发的多个资源中共享数据
方法:
`void setAttribute(String name ,0bject obj)`：存储数据
`Object getAttribude(String name)`：通过键获取值
`void removeAttribute(String name )`：通过键移除键值对

4、获取ServletContext

`ServletContext getServletContext()`方法，通过request对象调用。

