---
title: 【Java】JVM（下）
date: 2021-05-21
tags:
- Java
---
## 四、类加载和字节码技术

### 类文件结构

![image-20210325183540435](https://s2.loli.net/2022/04/08/Ke2vsYlQzSH8Xn4.png)

![image-20210325183717293](https://s2.loli.net/2022/04/08/Ww2isvOezuQ9TVH.png)

![image-20210325183808759](https://s2.loli.net/2022/04/08/pwx4VgiZhK5lFma.png)

![image-20210325183903397](https://s2.loli.net/2022/04/08/msvDeakyEuL9X4i.png)

![image-20210325184037793](https://s2.loli.net/2022/04/08/QwGRCF3qI2ZiYJE.png)

![image-20210325184845340](https://s2.loli.net/2022/04/08/KIMXeBtgPkhCmTn.png)

![image-20210325184450360](https://s2.loli.net/2022/04/08/xkdfP81TQNWhapG.png)

![image-20210325185025493](https://s2.loli.net/2022/04/08/7pNvZfQBG85Okdh.png)

![image-20210325185204157](https://s2.loli.net/2022/04/08/W2rut1ofk3UAYcs.png)

![image-20210325185341790](https://s2.loli.net/2022/04/08/lcbCMOexSqARsv1.png)

![image-20210325185556662](https://s2.loli.net/2022/04/08/BLhqa8Ktxo4jpNM.png)

![image-20210325185610484](https://s2.loli.net/2022/04/08/vFeVHNYIJSLZycf.png)

![image-20210325185910414](https://s2.loli.net/2022/04/08/nCY19jrvUd3iPBA.png)

### 字节码指令

![image-20210325190112864](https://s2.loli.net/2022/04/09/M4LWHbcduxyrXfN.png)

![image-20210325195243335](https://s2.loli.net/2022/04/09/po8muJNflHPMRGz.png)

![image-20210325195753963](https://s2.loli.net/2022/04/09/yYePSEGsHcxK4OC.png)

![image-20210325195829138](https://s2.loli.net/2022/04/09/PqTWk64BSucnCvz.png)

![image-20210325195911657](https://s2.loli.net/2022/04/09/7P6S9ImgoMnZY4u.png)

![image-20210325200028260](https://s2.loli.net/2022/04/09/4DacRCktuAWPmUI.png)

![image-20210325200048656](https://s2.loli.net/2022/04/09/HKx1UBePhGvsay9.png)

![image-20210325200203428](https://s2.loli.net/2022/04/09/UfuTgLGPZkJY9nc.png)

![image-20210325200401619](https://s2.loli.net/2022/04/09/6SRHExOVjyI1JYQ.png)

![image-20210325200503749](https://s2.loli.net/2022/04/09/3TaCoHwkOVQXrjs.png)

![image-20210325200551086](https://s2.loli.net/2022/04/09/TrJUAnRkSfN6HcQ.png)

![image-20210325201134614](https://s2.loli.net/2022/04/09/BWLy7xrOcYVXuqD.png)

![image-20210325202722167](https://s2.loli.net/2022/04/09/xU8KPR5yVmWE4GS.png)

![image-20210325202753274](https://s2.loli.net/2022/04/09/VmrlQwBiT1hexXM.png)

![image-20210325203118692](https://s2.loli.net/2022/04/09/zfpc3A895WVqTY4.png)

![image-20210325203345916](https://s2.loli.net/2022/04/09/7cRnNCSObvY9h3M.png)

**多态的原理**

![image-20210325203819554](https://s2.loli.net/2022/04/09/mnH6PWseDftCOMz.png)

用HSDB工具，利用进程ID获取进程相关信息。

![image-20210325204120985](https://s2.loli.net/2022/04/09/z6E1C5MRSkJNFPt.png)

![image-20210325204656800](https://s2.loli.net/2022/04/09/gUhPAkBsLdZveGD.png)

### 编译期处理

![image-20210327145450462](https://s2.loli.net/2022/04/09/Gwr7B9lPitjqhsv.png)

#### **默认构造器**

![image-20210327145652021](https://s2.loli.net/2022/04/09/YlpWxSahg6jm4Zb.png)

#### 自动拆装箱

![image-20210327145813371](https://s2.loli.net/2022/04/09/sHapIrDz6eli4Zq.png)

#### 泛型集合取值

![image-20210327150134769](https://s2.loli.net/2022/04/09/QFhp5Ne79Bv2dom.png)

在字节码文件中，在第十四行中，调用接口，这一步做到了擦除泛型的操作。将泛型统一使用`Object`对象来操作，最后在27行的时候用`checkcast`执行了类型转换，转换回`Integer`。

擦除的是字节码上的泛型信息，可以看到`LocalVariableTypeTable`（局部变量类型表）仍然保留了方法参数泛型的信息。

![image-20210327150650307](https://s2.loli.net/2022/04/09/ZHBELDuIgFwYROQ.png)

#### 泛型反射

![image-20210327151340316](https://s2.loli.net/2022/04/09/61wHaYOMgVdLZu9.png)

![image-20210327151507379](https://s2.loli.net/2022/04/09/w82OEbVvakdlzpQ.png)

#### foreach循环

![image-20210327152843131](https://s2.loli.net/2022/04/09/Vc1UpGZOfASF6M2.png)

#### Switch字符串

![image-20210327154245038](https://s2.loli.net/2022/04/09/CotchXTlauWkvgQ.png)

![image-20210327154325673](https://s2.loli.net/2022/04/09/ylNkDTx4MGHuaLr.png)

如果hashcode相等，将会进一步利用equals方法进行比较。

![image-20210327162718663](https://s2.loli.net/2022/04/09/nQUOWJlKtMH3uYD.png)

#### Switch枚举类

Switch枚举类在转换成字节码之后，会生成一个静态合成类。

![image-20210328160739476](https://s2.loli.net/2022/04/09/TeKQkpUF7aLArIg.png)

![image-20210328161023156](https://s2.loli.net/2022/04/09/qmbinSyogE2zreB.png)

在这样的结构中，实际上是根据合成类的数组下标的值找到对应的case项。

#### 枚举类

枚举类的字节码生成，与上述的Switch枚举类类似，会生成静态类。

![image-20210328161312617](https://s2.loli.net/2022/04/09/YK7O4Hi8hw2SknR.png)

#### Try-with-resources

![image-20210328161631524](https://s2.loli.net/2022/04/09/8zyxG4KdBP1Ycrb.png)

上述的代码在经过字节码转换后，会被转换为：

![image-20210328161835711](https://s2.loli.net/2022/04/09/knTIhV49u3PGbim.png)

![image-20210328161927559](https://s2.loli.net/2022/04/09/b7pq3tnNxBSzY81.png)

#### 方法重写时的桥接方法

![image-20210328162525503](https://s2.loli.net/2022/04/09/S2VoIniPFUt8vwT.png)

![image-20210328162756624](https://s2.loli.net/2022/04/09/HROFx5NA4CYsQkc.png)

#### 匿名内部类

![image-20210328162914226](https://s2.loli.net/2022/04/09/HP2Uk4OAuhZsoM6.png)

### 类加载阶段

#### 加载

![image-20210328163303867](https://s2.loli.net/2022/04/09/6NfkMs48hKijuDq.png)

![image-20210328163754384](https://s2.loli.net/2022/04/09/fiBpEONY7tb2Ro9.png)

#### 链接

链接阶段分为三个步骤：**验证、准备、解析**

验证阶段：验证类是否符合JVM规范，安全性检查

准备阶段：**当static变量是final的基本类型或者String字符串常量，则赋值操作就在准备阶段完成**

解析阶段：将常量池中的符号解析为直接引用

- 验证：验证类是否符合JVM规范，安全性检查
  用UE等支持二进制的编辑器修改HelloWorld.class的魔数，在控制台运行
- 准备：为static量分配空间，设置默认值
  - static 变量在JDK 7之前存储于instanceKlass末尾，从JDK 7开始，存储于`_ java_ mirror`末尾
  - static 变量分配空间和赋值是两个步骤，分配空间在准备阶段完成，赋值在初始化阶段完成
  - 如果static变量是final的基本类型，那么编译阶段值就确定了，赋值在准备阶段完成
  - 如果static变量是final的，但属于引用类型，那么赋值也会在初始化阶段完成

![image-20210328165519199](https://s2.loli.net/2022/04/09/9CzmIfxo4ZYADka.png)

```java
Class C {
	D d = new D();
}
Class D {
}
```

#### 初始化

`<cinit>()V`方法
初始化即调用`<cinit>()V`，虚拟机会保证这个类的【构造方法】的线程安全。

**发生的时机**

概括得说，类初始化是【懒惰的】

- main 方法所在的类，总会被首先初始化
- 首次访问这个类的静态变量或静态方法时
- 子类初始化，如果父类还没初始化，会引发
- 子类访问父类的静态变量，只会触发父类的初始化
- Class.forName
- new会导致初始化

不会导致类初始化的情况

- 访问类的static final静态常量(基本类型和字符串)不会触发初始化
- 类对象.class 不会触发初始化
- 创建该类的数组不会触发初始化
- 类加载器的loadClass方法
- Class.forName的参数2为false时

### 类加载器

![image-20210328171548823](https://s2.loli.net/2022/04/09/c8D34AZpe16xyFT.png)

#### 启动类加载器

用getClassLoader方法得到类加载器，并且根据参数指定类交由特定的类加载器。

![image-20210328172025443](https://s2.loli.net/2022/04/09/2esqYWJ5ryA74MX.png)

上述代码的执行结果：

![image-20210328172230982](https://s2.loli.net/2022/04/09/sLxOQit1JIXFUk7.png)

- 可以用这个办法替换核心类
  - `java - Xbootclasspath: <new bootclasspath>`
  - `java -Xbootclasspath/a:<追加路径>`
  - `java -Xbootclasspath/p: <追加路径>`

因为启动类加载器使用的是C++编写的，所以打印结果是`null`；如果是应用程序类加载器和扩展类加载器，则分别打印`AppClassLoader`、`ExtClassLoader`。

#### 扩展类加载器

![image-20210328173006999](https://s2.loli.net/2022/04/09/S5ezO23lfWnouEM.png)

#### 应用程序类加载器

#### 双亲委派模式

所谓的双亲委派，就是指调用类加载器的`loadClass()`方法时，查找类的规则。

> 这里的双亲，翻译为上级更合适，因为它们并没有继承关系

#### 线程上下文类加载器

![image-20210328173505576](https://s2.loli.net/2022/04/09/1G7oPrniyJ25mq3.png)

![image-20210328173625781](https://s2.loli.net/2022/04/09/hVjQZAaH26ObEXI.png)

在JDk源码中，使用的是`ClassLoader.getSystemClassLoader()`方法来加载`DriverManager`类的。这一加载器其实就是`ApplicationClassLoader`加载器。所以真正开始使用的不是启动类加载器bootstrap，反而是应用程序类加载器，打破了原有的双亲委派模式。

![image-20210328180527279](https://s2.loli.net/2022/04/09/BcRQoewanUC341t.png)

#### 重点部分—破坏双亲委派机制的实现

使用线程上下文类加载器(Thread Context ClassLoader)。这个类加载器可以通过java.lang.Thread类的`setContextClassLoader()`方法进行设置，如果创建线程时还未设置，他将会从父线程中继承一个，如果在应用程序的全局范围内都没有设置过的话，那这个类加载器默认就是应用程序类加载器。

有了线程上下文加载器，JNDI服务【Java Naming and Directory Interface（JAVA命名和目录接口）】就可以使用它去加载所需要的SPI代码，也就是父类加载器请求子类加载器去完成类加载的动作，这种行为实际上就是**打通了双亲委派模型层次结构来逆向使用类加载器**，实际上已经违背了双亲委派模型的一般性原则，但这也是无可奈何的事情。Java中所有涉及SPI的加载动作基本上都采用这种方式，例如JNDI、JDBC、JCE、JAXB和JBI等。

部分源代码如下所示：

![image-20210328174052239](https://s2.loli.net/2022/04/09/2DJl3Z5AzqGR8Pg.png)

------

**SPI（Service Provider Interface）的使用**在一些项目中，在jar包下会有一个META-INF的文件夹，里面有一个services的子文件夹，内部存放着一些类的全限定名文件，文件内容是实现类名称。

![image-20210328174506881](https://s2.loli.net/2022/04/09/nSzuU3TIqFOa2Mp.png)

以这样的方式得到实现类，体现的是【**面向接口编程+解耦**】的编程思想，在一些框架中都使用了这一思想：JDBC、Servlet初始化器、Spring容器、Dubbo（对SPI进行了扩展）。

![image-20210328174910607](https://s2.loli.net/2022/04/09/PC8ihyqGDJIjtKv.png)

![image-20210328175007174](https://s2.loli.net/2022/04/09/piMQjEBnzVwtrGe.png)

#### 自定义类加载器

![image-20210328180734181](https://s2.loli.net/2022/04/09/ZpQg8aTx2Pu6ncO.png)

步骤：

1. 继承 ClassLoader 父类

2. 要遵从双亲委派机制，重写 findClass 方法

   注意不是重写 loadClass 方法，否则不会走双亲委派机制

3. 读取类文件的字节码

4. 调用父类的 defineClass 方法来加载类

5. 使用者调用该类加载器的 loadClass 方法

### 运行期优化

运行期间，JVM虚拟机会对代码做一定的优化。

**编译器**

编译器是一种计算机程序，负责把一种编程语言编写的源码转换成另外一种计算机代码，后者往往是以二进制的形式被称为目标代码(object code)。这个转换的过程通常的目的是生成可执行的程序。

编译器的产出是「另外一种代码」，然后这些代码等着被别人拿来执行，如果还不能直接被执行，那么还需要再编译或解释一遍，再交由计算机硬件执行。

编译器，往往是在「执行」之前完成，产出是一种可执行或需要再编译或者解释的「代码」。

**解释器**

解释器是一种计算机程序，它直接执行由编程语言或脚本语言编写的代码，并不会把源代码预编译成机器码。一个解释器，通常会用以下的策略来执行程序代码：

分析源代码，并且直接执行。
把源代码翻译成相对更加高效率的中间码，然后立即执行它。
执行由解释器内部的编译器预编译后保存的代码。

**两者的异同**

> 相同点：都是一种计算机程序
>
> 不同点：①编译器将源码转换成另一种计算机代码，解释器执行代码；②编译器不执行程序代码，解释器执行程序代码

#### 即时编译

> JIT[编译器](https://baike.baidu.com/item/编译器)，英文写作Just-In-Time Compiler，中文意思是[即时编译器](https://baike.baidu.com/item/即时编译器/18428531)。

![image-20210328185703536](https://s2.loli.net/2022/04/09/barhlU9Wox6Ms5I.png)

##### 分层编译

> 对于占据大部分的不常用的代码，我们无需耗费时间将其编译成机器码，而是采取解释执行的方式运行；另一方面，对于仅占据小部分的热点代码，我们则可以将其编译成机器码，以达到理想的运行速度。执行效率上简单比较一下 `Interpreter < C1 < C2` ，总的目标是发现热点代码（ hotspot 名称的由来），并优化之。

**逃逸分析**

逃逸分析的基本行为就是分析对象动态作用域：当一个对象在方法中被定义后，它可能被外部方法所引用，例如作为调用参数传递到其他地方中，称为方法逃逸。

> JVM判断新创建的对象是否逃逸的依据有：
>
> **一、对象被赋值给堆中对象的字段和类的静态变量。**
>
> **二、对象被传进了不确定的代码中去运行。**

对于逃逸分析，目的就是发现新建的对象是否“逃逸”。在下面的代码中，后续的执行阶段中已经完成了逃逸分析，循环后期的运行速度大幅提升。高亮部分就是关闭逃逸分析。逃逸分析完成之后，代码的执行速度会大大加快，执行效率也会提升。

![image-20210328192828901](https://s2.loli.net/2022/04/09/RaXcBPjpMDA1KnE.png)

##### 方法内联

![image-20210328210100942](https://s2.loli.net/2022/04/09/Y9yaJ3XnVGPOZ6W.png)

实验案例中的代码：

![image-20210328210344021](https://s2.loli.net/2022/04/09/1SqvWG2mspOgVxb.png)

##### 字段优化

针对（静态）变量读写进行优化

![image-20210328210712720](https://s2.loli.net/2022/04/09/JaqrtXO6FRN3sZb.png)

方法是否内联会影响到成员变量读取的优化。

在测试代码（如下）中，这种优化相当于首次读取就已经完成了求长度以及取下标的操作，省去了1999次Field读取操作。

但是如果刚才的代码没有进行方法内联（被禁用），则不会进行上述的首次读取缓存操作，最终会导致效率下降。

![image-20210328211524295](https://s2.loli.net/2022/04/09/vnHK2aFsELzx18W.png)

#### 反射优化

**定义**

> 反射机制是在运行状态中，对于任意的一个类，都能够知道这个类的所有属性和方法，对任意一个对象都能够通过反射机制调用一个类的任意方法，这种动态获取类信息及动态调用类对象方法的功能称为java的反射机制。

**作用**

> ①动态地创建类的实例，将类绑定到现有的对象中，或从现有的对象中获取类型。
>
> ②应用程序需要在运行时从某个特定的程序集中载入一个特定的类。

**优化**

反射的方法调用，在第1-15次调用中是非常快的，也就是前十五次的反射调用是非常快的，但是在第十六次及以后，对于反射的调用就变得很慢了。原因是在反射相关的源码中，有一个名为膨胀阈值的参数，缺省值为15。

```java
ReflectionFactory.inflationThreshold();
private static int inflationThreshold = 15;
```

注意：通过查看 `ReflectionFactory` 源码可知：

- `sun.reflect.noInflation` 可以用来禁用膨胀（直接生成 `GeneratedMethodAccessorl` ，但首次生成比较耗时，如果仅反射调用一次，不划算）
- `sun.reflect.inflationThreshold` 可以修改膨胀阈值

要想直接使用生成的`MethodAccessor`，而非使用本地的`MethodAccessor`，可以使用`RefletionFactory.noInflation = true;`来禁用膨胀。

## 五、内存模型

### Java内存模型

Java内存模型是指**Java Memory Model（JMM）**，内存模型与之前的内存结构不是同一个概念。

JMM定义了一套在多线程读写共享数据（成员变量、数组）时，对数据的**原子性、可见性、有序性**的规则和保障。

#### 原子性

在Java中，由两个线程，对一个静态变量0分别进行5000次的自增和自减，最终输出的结果会是0吗？答案是不一定，多次运行的结果并不相同，可能是正数，也可能是负数，也可能是0。原因是因为：**Java中对静态变量的自增自减操作并不是原子操作**。

![image-20210328215405647](https://s2.loli.net/2022/04/09/9zApR1bfsrunxXq.png)

Java中对于静态变量的自增自减会在主内存和线程内存中进行数据交换。也就是说，对于共享的变量，比如静态变量，进行线程操作的话，会在主内存和线程内存中进行数据交换。共享变量储存在主内存中，这里的主内存区别于计算机组成原理中的主存。

![image-20210328215637790](https://s2.loli.net/2022/04/09/2NtL7jGiyZhAknd.png)

之前的案例中，出现负数的情况，有可能如下所示：

![image-20210328220156581](https://s2.loli.net/2022/04/09/hZIOmGKyufi6TJq.png)

正数的情况就是将线程1、2的执行顺序调换了，这种情况就属于更新数据丢失，最终打印的值并不能体现实际的变换过程。因为在实际的运行过程中，线程是会交错运行的，这就是导致刚才的案例结果不确定的原因。

要避免这样的更新丢失情况出现，解决办法就是使用同步`synchronized()`。

```java
synchronized (Object) {
	// 要进行原子操作的代码
}
```

同步的大体概念是使用monitor监视需要同步的线程的运行情况，Owner中的线程与EntryList中的线程、WaitSet中的线程，当同步中的线程正在运行的时候，就会让其他想要访问或者使用同步代码块中的变量的线程阻塞或者等待，从而达到原子性的效果。

如何理解：你可以把obj想象成一个房间，线程t1，t2想象成两个人。
当线程t1执行到synchronized(obj)时就好比t1进入了这个房间，并反手锁住了门，在门内执行count++代码。
这时候如果t2也运行到了synchronized(obj) 时，它发现门被锁住了，只能在门外等待。
当t1执行完synchronized{}块内的代码，这时候才会解开门上的锁，从obj房间出来。t2 线程这时才可以进入obj房间，反锁住门，执行它的count--代码。
注意：上例中t1和t2线程必须用synchronized锁住同一个obj对象，如果t1锁住的是m1对象，t2 锁住的是m2对象，就好比两个人分别进入了两个不同的房间，没法起到同步的效果。

#### 可见性

![image-20210328222112248](https://s2.loli.net/2022/04/09/OzX9Ycl54Eh2pkL.png)

在这个案例中，循环并不会像预期中的那样停下来，会陷入一个死循环中。

但是：在该代码中，将`while()`语句块中添加`System.out.println()`语句，程序也能自己停下来。这是因为：`println()`方法中使用了`synchronized()`方法，会强制将t线程读取的JIT编译器的优化产生的高速缓存区转换为主内存，获取到run变量的更新，最终导致程序自主停止。

在涉及到`synchronized()`语句时，特定情况下，既可以保证原子性，也能够保证可见性。

下图表明了为何会出现程序的可见性问题（JIT编译器优化后的高速缓存）：

![image-20210328222230816](https://s2.loli.net/2022/04/09/gtCBWRDhGxMQzbA.png)

![image-20210328222315146](https://s2.loli.net/2022/04/09/4eHja2RYuVrIvSk.png)

![image-20210328222356016](https://s2.loli.net/2022/04/09/JLsKy4dMcnj18qV.png)

由于主线程和t线程读取的变量并不是在同一个区域，从而导致主线程修改的变量值没有传到t线程，这就是可见性的问题。这样导致了主线程的修改失败，从而使得刚才的程序一直陷入死循环。

**解决办法**

引入关键字`volatile`（易变），前面讲到的synchronized是一种阻塞式同步，在线程竞争激烈的情况下会升级为**重量级锁**，性能相对更低，而volatile则是java虚拟机提供的最轻量级的同步机制。

volatile可以用来修饰成员变量和静态成员变量，它可以避免线程从自己的工作缓存中查找变量的值，必须到主存中获取它的值，线程操作volatile变量都是直接操作主存。

> volatile	adj.易变的; 无定性的; 无常性的; 可能急剧波动的; 不稳定的; 易恶化的; 易挥发的; 易发散的;

解决可见性的痛点在于：数据的更新不能即使更新到每一个线程中，导致数据被”脏读“。而volatile的出现正是为了解决这种现象的出现。

> **被volatile修饰的变量能够保证每个线程能够获取该变量的最新值，从而避免出现数据脏读的现象。**

![image-20210328224510544](https://s2.loli.net/2022/04/09/eQXZDyswzhLn1OF.png)

它保证的是在多个线程之间，一个线程对volatile变量的修改对另一个线程可见，**保证的是可见性**，**不能保证原子性**。仅用在一个写线程，多个读线程的情况。

#### 有序性

![image-20210328224358153](https://s2.loli.net/2022/04/09/LAX8p697lu2gqCb.png)

上面这段代码被执行后，可能有几种情况？

- 情况1：线程1先执行，这时 `ready = false` ，所以进入 else 分支结果为 1
- 情况2：线程2先执行 `num = 2` ，但没来得及执行 `ready = true` ，线程 1 执行，还是进入 else 分支，结果为 1
- 情况3：线程2执行到 `ready = true` ，线程 1 执行，这回进入 if 分支，结果为 4 （因为 num 已经执行过了）

除了这三种情况，还有可能结果为0。因为在线程2执行`ready = true`，切换到线程1，进入if分支，相加为0，再切回线程执行`num = 2`。

这种现象叫做**指令重排**，是JIT编译器在运行时做的一些优化。

解决方法就是使用volatile修饰变量，可以禁用指令重排。

> **同一个线程内，JVM会在不影响正确性的前提下调整语句的执行顺序。**

这种特性我们称之为【指令重排】，多线程下的指令重排会影响正确性，例如double-check locking模式实现单例。

![image-20210329122955677](https://s2.loli.net/2022/04/09/8hxKIvDYGkb4jwT.png)

以上的实现特点是：

- 懒惰实例化
- 首次使用 `getInstance()` 才使用 `synchronized` 加锁，后续使用时无需加锁

**happens-before**

happens-before规定了哪些写操作对其他的读操作可见，它是可见性和有序性的一套规则总结。

> t.join()方法只会使主线程（或者说调用t.join()的线程）进入等待池并等待t线程执行完毕后才会被唤醒。并不影响同一时刻处在运行状态的其他线程。

#### CAS和原子类

![image-20210329124327644](https://s2.loli.net/2022/04/09/agpPIHcf1NrSRV3.png)

**乐观锁和悲观锁**

- CAS是基于乐观锁的思想：最乐观的估计，不怕别的线程来修改共享变量，就算改了也没关系，我吃亏点再重试。
- synchronized是基于悲观锁的思想：最悲观的估计，得防着其它线程来修改共享变量，我上了锁你们都别想改，我改完了解开锁，你们才有机会。

**原子操作类**

`juc (java.utilconcurrent)` 中提供了原子操作类，可以提供线程安全的操作，例如：`AtomicInteger`、`AtomicBoolean` 等，它们底层就是采用 CAS 技术 + volatile 来实现的。

### synchronized优化

Java HotSpot虚拟机中，每个对象都有对象头（包括class指针和Mark Word）。Mark Word平时存储这个对象的哈希码、分代年龄，当加锁时，这些信息就根据情况被替换为标记位、线程锁记录指针、重量级锁指针、线程ID等内容。

#### 轻量级锁

如果一个对象虽然有多线程访问，但多线程访问的时间是错开的(也就是没有竞争)，那么可以使用轻量级锁来优化。这就好比学生(线程A)用课本占座，上了半节课，出门了（CPU时间到），回来一看, 发现课本没变，说明没有竞争，继续上他的课。
如果这期间有其它学生(线程B) 来了，会告知(线程A)有并发访问，线程A随即升级为重量级锁，进入重量级锁的流程。
而重量级锁就不是那么用课本占座那么简单了，可以想象线程A之前，把座位用一个铁栅栏围起来。

#### 锁膨胀

![image-20210329140454426](https://s2.loli.net/2022/04/09/ZOJysmkK6wFbnzh.png)

#### 重量锁

![image-20210329141857579](https://s2.loli.net/2022/04/09/IrOvE3ypK5kTjzQ.png)

#### 偏向锁

![image-20210329143223539](https://s2.loli.net/2022/04/09/v5QmD6UAzuyahg2.png)

#### 其他优化

①减少上锁时间：同步代码块中的代码尽量短

②减少锁的粒度

> 将一个锁拆分成多个锁，提高并发度

- ConcurrentHashMap
- LongAdder 分为 base 和 cells 两部分。没有并发争用的时候或者是 cells 数组正在初始化的时候，会使用 CAS 来累加值到 base ，有并发争用，会初始化 cells 数组，数组有多少个 cell ，就允许有多少线程并行修改，最后将数组中每个 cell 累加，再加上 base 就是最终的值
- LinkedBlockingQueue 入队和出队使用不同的锁，相对于 LinkedBlockingArray 只有一个锁效率要高

在访问 hashmap 的时候，只锁住链表头，每次只锁住一个链表，其他链表的读取不受影响，相当于锁的粒度减少了，降低了上锁的难度。

③锁粗化

- 多次循环进入同步块不如同步块内多次循环
- 另外 JVM 可能会做相应的优化：把多次 append 的加锁操作粗化为一次（因为都是对同一个对象加锁，没必要重入多次）

```java
new StringBuffer().append("a").append("b").append("c");
```

锁粗化在实际操作中使用比较多，在多次循环步骤需要加锁的时候，建议将锁加在循环外部，将整个循环部分放在锁的内部，减少上锁的次数，这就是属于锁粗化，避免在循环的时候，每进行一次循环，加一次锁。

④锁消除

JVM会进行代码的逃逸分析。例如某个加锁对象是方法的局部变量，不会被其他线程所访问到，这时候就会被即时编译器忽略掉所有同步操作。

⑤读写分离

- CopyOnWriiteArrayList
- CopyOnWriteSet
