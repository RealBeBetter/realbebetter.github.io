---
title: 【Java】JVM（上）
date: 2021-05-21
tags:
- Java
---

## 一、什么是JVM

- 定义：Java Virtual Machine - java程序的运行环境（java 二进制字节码的运行环境）
- 好处：
  - 一次编写， 到处运行
  - 自动内存管理，垃圾回收功能
  - 数组下标越界越界检查
  - 多态
- 区别：JVM、JRE、JDK

![image-20210310195453022](https://gitee.com/realBeBetter/image/raw/master/img/uvon6RdsVPZ2TQA.png)

- 学习JVM的意义
  - 面试
  - 理解底层的实现原理
  - 中高级程序员的必备技能

- 常见的JVM

![image-20210310195818991](https://gitee.com/realBeBetter/image/raw/master/img/cfD9GPU17Hl6JV8.png)

- 学习路线

![学习路线](https://gitee.com/realBeBetter/image/raw/master/img/PtJIkKs59AGfrwE.png)

## 二、内存结构

- 程序计数器PC Register（Program Counter Register）
- 虚拟机栈（JVM Stacks）
- 本地方法栈（Native Method Stacks）
- 堆（Heap）
- 方法区（Method Area）

### 程序计数器PC Register（Program Counter Register）

程序计数器是通过**寄存器**实现的，用来记住**下一条JVM指令的执行地址**。

![image-20210310201006611](https://gitee.com/realBeBetter/image/raw/master/img/KMAwuHv6Q1PIt5F.png)

特点：①是线程私有的；②是JVM中唯一不会出现内存溢出的区域

### 虚拟机栈（JVM Stacks）

- 栈：程序运行需要的内存空间


- 栈帧：程序运行时一次方法的调用，即每个方法运行时需要的内存

- Java Virtual Machine Stacks（Java 虚拟机栈）
  - 每个线程运行时所需要的内存，称为虚拟机栈
  - 每个栈由多个栈帧(Frame)组成，对应着每次方法调用时所占用的内存
  - 每个线程只能有一 个活动栈帧，对应着当前正在执行的那个方法

**问题**

1.栈每次调用后会被弹出，**故垃圾回收不涉及栈内存**

2.栈内存分配不是越大越好，栈内存越大只是能够进行更多的方法调用，并不会使得程序运行变快

3.方法内的局部变量（非static）是线程私有的，不受到其他线程的干扰；若是线程共享的（static），需要考虑线程安全问题。总之，如果方法内局部变量没有逃离方法的作用范围，则是线程安全的；如果局部变量引用了对象，则逃离了方法的作用范围，则是线程不安全的。

*栈内存溢出*（*java.lang.StackOverFlowError*）

1. 栈帧过多（比如方法的递归调用，若设置条件不正确陷入过多次循环；json数据转换也有可能出现，使用`@jsonIgnore`解决）

2. 栈帧过大（单个栈帧的内存过大）

**线程运行诊断**

1.CPU占用过多

2.程序运行很长时间没有结果

![image-20210310210247573](https://gitee.com/realBeBetter/image/raw/master/img/BHs3bKIphWQrR5k.png)

### 本地方法栈（Native Method Stacks）

object中的一些方法无具体实现，是通过C/C++编写的，调用本地方法接口实现的，属于本地方法栈中的。

### 堆（Heap）

- Heap堆
  - 通过new关键字，创建对象都会使用堆内存
- 特点
  - 它是线程共享的，堆中对象都需要考虑**线程安全**的问题
  - 有垃圾回收机制

**堆内存溢出 `java.lang.OutOfMemoryError: Java heap space`**

堆内存溢出的原因：不断往堆内存中添加新的对象

由于实际情况中，堆内存可能稍大，一时间无法看出堆内存的溢出隐患，但是随着时间的积累与程序的运行，可能最终导致堆内存溢出问题，这个时候需要调节VM Option 使用 `-Xmx（内存大小）`命令调节堆内存，及时调试得知。

**堆内存诊断**

- jps工具
  - 查看当前系统中有哪些java进程
- jmap工具
  - 查看堆内存占用情况
- jconsole工具
  - 图形界面的，多功能的监测工具，可以连续监测

### 方法区（Method Area）

1. 方法区是在所有Java虚拟机线程中共享的
2. 存储了跟类相关的一些结构信息

> The Java Virtual Machine has a **method area that is shared** among all Java Virtual Machine threads. The method area is analogous to the storage area for compiled code of a conventional language or analogous to the "text" segment in an operating system process. **It stores per-class structures** such as the **run-time constant pool**, **field** and **method data**, and **the code for methods and constructors**, including **the special methods** (S2.9) used in class and instance initialization and interface initialization.

方法区创建于**虚拟机启动**的时候，**逻辑上属于堆的一部分**。

> **The method area is created on virtual machine start-up**. Although the method area is **logically part of the heap**, simple implementations may choose not to either garbage collect or compact it. **This specification does not mandate the location of the method area or the policies used to manage compiled code**. The method area may be of a fixed size or may be expanded as required by the computation and may be contracted if a larger method area becomes unnecessary. The memory for the method area does not need to be contiguous.

JVM内存结构在1.6版本和1.8版本存在差异：

![image-20210311202543653](https://gitee.com/realBeBetter/image/raw/master/img/qrwQkAP9RHvWpOa.png)

#### **方法区内存溢出**

类加载器（Class Loader）用来加载类的二进制字节码

Class Writer 用来生成类的二进制字节码

JVM方法区内存溢出，jdk1.6版本时，提示的错误是**永久代空间内存溢出`java.lang.OutOfMemoryError: PermGen space`**

jdk1.8版本时，提示的错误是 **元空间内存溢出 `java.lang.OutOfMemoryError: Metaspace`**

- 1.8以前会导致永久代内存溢出

  - ```
    永久代内存溢出java.lang.OutOfMemoryError: PermGen space
    -XX:MaxPermSize=8m
    ```

- 1.8之后会导致元空间内存溢出

  - ```
    元空间内存溢出java.lang.OutOfMemoryError: Metaspace
    -XX:MaxMetaspaceSize=8m
    ```

#### **方法区常量池（Constant Pool）** 

- 常量池，就是一张表。虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量等信息
- 运行时常量池，常量池是*.class文件中的。当该类被加载，它的常量池信息就会放入运行时常量池，并把里面的符号地址变为真实地址

#### **字符串池（String Table）**

常量池最初存在字节码文件中，当常量被运行时时，就会被加载到运行时常量池中，但是此时均为常量池中的一些符号，还没有成为Java中的对象。 

直到运行到具体的字节码行数，才会把它放入字符串池中，变成真正的字符串对象。【用到的才会创建，否则不会创建】

字符串池是一个hashtable的结构，不能扩容。

针对创建的字符串池的问题，询问字符串创建的是否相等：

因为原有的s3是放入了字符串池中的，之后由于s4相当于`new`了一个新的字符串对象ab，存放的位置是堆空间。二者的地址不一样，实际上是相当于两个对象，所以不相等，输出`false`。s1、s2、s3都是用字符串常量创建的变量，“a”、“b”、“ab”都是创建之后放在堆内存中并加入到字符串常量池中的，而又s1和s2拼接而来的字符串s4并没有放在字符串常量池中 ，仅仅是放在堆内存中。

![image-20210311211846769](https://gitee.com/realBeBetter/image/raw/master/img/VHKFTtUgsa9kNCb.png)

由于javac在编译期间能够确切地知道编译之后s5的结果，而不是像s4那样更改其他变量而导致新的结果，所以能够直接invoke virtual调用虚拟，使用常量池中已有的常量，所以s3==s5成立，输出`true`。s4的创建是使用变量创建，而s5则是通过字符常量直接拼接，所以二者有区别。【动态创建的字符串没有存放在字符串常量池中，比如s4就为动态创建】

![image-20210311213343600](https://gitee.com/realBeBetter/image/raw/master/img/haBOozvWd6UlwLx.png)

#### **StringTable特性**

- 常量池中的字符串仅是符号，第一次用到时才变为对象
- 利用串池的机制，来避免重复创建字符串对象
- 字符串变量拼接的原理是StringBuilder (1.8)
- 字符串常量拼接的原理是编译期优化
- 可以使用`intern`方法，主动将串池中还没有的字符串对象放入串池

根据前面的知识，要想将动态创建的字符串对象放入字符串池，可以使用intern方法（如果有则不放入，如果没有则放入，并且该方法会返回串池中的对象）。【s.intern】

![image-20210311221442495](https://gitee.com/realBeBetter/image/raw/master/img/5gc2YedMTPbGqhK.png)

下面的案例中，x最先被放入串池中，所以s2返回的是串池中已有的对象“ab”，而s则是堆中的对象，调用intern方法的时候发现字符串池中已有“ab”，所以有则不会放入，此时“ab”是原有字符串池中，x对象放入的，并不是s经过intern方法调用后放入的，所以后面`s==x`输出`false`。

![image-20210311221300863](https://gitee.com/realBeBetter/image/raw/master/img/qYMskIdozcZiAwJ.png)

【**intern方法在1.6和1.8版本的区别**】

- 常量池中的字符串仅是符号，**第一次用到时才变为对象**
- 利用串池的机制，来避免重复创建字符串对象
- 字符串变量拼接的原理是StringBuilder（1.8）
- 字符串常量拼接的原理是编译期优化
- 可以使用intern方法，主动将串池中还没有的字符串对象放入串池
  - 1.8将这个字符串对象尝试放入串池，如果有则并不会放入，如果没有则放入串池， 会把串池中的对象返回
  - 1.6将这个字符串对象尝试放入串池，如果有则并不会放入，如果没有会把此对象复制一份，放入串池，会把串池中的对象返回

#### **StringTable位置**

当jdk版本为1.6时，StringTable位置在常量池中，并整体处于永久代（方法区Method Area）中；但是当jdk版本为1.8时，StringTable处于堆空间中。 做出改变的原因是：永久代的内存回收效率很低，触发垃圾回收的阈值较高（时间很晚）。

演示程序：当版本为jdk1.6时，将数字转换成字符串并进行intern如池操作，循环多次，设置jvm的永久代内存限制，最终导致的是永久代的内存不足，所以可以证明jdk1.6的时候，字符串池的位置处于永久代中。

![image-20210315201026206](https://gitee.com/realBeBetter/image/raw/master/img/ot8pIqFRJaCwVhr.png)

![image-20210315201230753](https://i.loli.net/2021/03/15/gbelcVzDC64JRkt.png)

【演示程序】

设置内存限制之后，运行相同的上述程序，最终导致下面的错误：

![image-20210315201452850](https://gitee.com/realBeBetter/image/raw/master/img/RwXSKubvD5Pm8g4.png)

报错的解释意思是：当垃圾回收占用了98%以上的时间，却只回收了不到2%的内存。

```
-XX: +UseGCOverheadLimit
```

> Enables the use of a policy that limits the proportion of time spent by the JVM on GC before an OutOfMemoryError exception is thrown. This option is enabled, by default, and the parallel GC will throw an OutOfMemoryError if more than 98% of the total time is spent on garbage collection and less than **2%** of the heap is recovered. When the heap is small, this feature can be used to prevent applications from running for long periods of time with lttle or no progress. To disable this option,specify the option **-XX : -UseGCOverheadLimit**.

最终解决方法，调试JVM，加上-XX后面的代码，关闭这个错误提示。最终运行程序，提示的是堆空间内存不足。

![image-20210315201724442](https://gitee.com/realBeBetter/image/raw/master/img/eD1jIX9tNOozFsK.png)

![image-20210315201846353](https://gitee.com/realBeBetter/image/raw/master/img/tSHcCKFDwL3WI1X.png)

由此，可以看出：**jdk1.8中，串池用的是堆空间；1.6中，串池用的是永久代**。

#### **StringTable垃圾回收**

设置参数如下

```
// StringTable 垃圾回收
-Xmx10m -XX: +PrintStringTableStatistics -XX:+PrintGCDetaiIs -verbose:gc
```

具体实现思路：设置循环，产生常量字符串，并进行intern入池操作。当分配的字符串数量过多时，会触发GC。

#### **StringTable性能调优**

首先，StringTable是利用哈希表原理实现的。调优，①可以设置`-Xx:StringTableSize=适当的桶个数`，可以适当提高哈希查找的速度，避免哈希冲突，提高运行时间。②考虑是否将字符串对象入池，减少重复字符串的入池操作，选择性地进行入池操作。

程序演示

![image-20210315204129727](https://gitee.com/realBeBetter/image/raw/master/img/vZFoONkPCRjqbTm.png)

### 直接内存（Direct Memory）

#### 定义

- 不属于虚拟机内存，而属于操作系统的内存。
- Direct Memory
  - 常见于NIO操作时，用于数据缓冲区
  - 分配回收成本较高，但读写性能高
  - 不受JVM内存回收管理

#### 文件读写过程

传统的文件读取方式，整个过程的流程图

![image-20210315204735836](https://gitee.com/realBeBetter/image/raw/master/img/c1RaAXh6YQNmSTf.png)

使用直接内存之后，文件的读取流程：

![image-20210315205130570](https://gitee.com/realBeBetter/image/raw/master/img/YerpAigZRTHONP3.png)

直接内存的使用，不受JVM内存回收管理，有可能导致内存溢出。

![image-20210315205433840](https://gitee.com/realBeBetter/image/raw/master/img/YerpAigZRTHONP3.png)

因为直接内存的使用，不受JVM内存回收管理，属于操作系统的内存。因此，想要观察直接内存的使用，需要使用到系统提供的内存管理器（任务管理器）。但是，创建的直接内存却可以通过调用unsafe对象来进行回收，不能直接使用GC算法对操作系统中的直接内存进行回收。直接内存释放需要主动调用`unsafe`对象的`freeMemory()`方法。演示程序：

![image-20210315211641760](https://gitee.com/realBeBetter/image/raw/master/img/4WiDdVmZ3veCKJ5.png)

直接内存分配和回收原理：

- 使用了Unsafe对象完成直接内存的分配回收，并且回收需要主动调用`freeMemory`方法
- ByteBuffer的实现类内部，使用了Cleaner (虚引用) 来监测ByteBuffer对象。一旦ByteBuffer对象被垃圾回收，那么就会由ReferenceHandler线程通过Cleaner的clean方法调用freeMemory来释放直接内存
