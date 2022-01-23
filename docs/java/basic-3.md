---
title: 【Java】基础知识部分-多线程、网络编程
date: 2021-05-03
tags:
- Java
---
## 七、多线程

### 实现多线程

#### 进程和线程

进程：是系统正在运行的程序，

- 系统进行资源分配和独立调用的基本单位；
- 每一个进程都有它自己的内存空间和系统资源；

线程：是进程中的单个顺序控制流，是一条执行路径

- 单线程：一个进程中只有一条执行路径，则称为单线程程序
- 多线程：一个进程中如果有多条执行路径，则成为多线程程序

#### 实现多线程

方式一：继承`Thread`类

1. 创建`MyThread`类继承`Thread`类
2. 重写`Thread`类中的`run()`方法
3. 创建`MyThread`类对象
4. 启动线程

```java
public class MyThread extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(i);
        }
    }
}
```

```java
public class MyThreadDemo {
    public static void main(String[] args) {
        MyThread myThread1 = new MyThread();
        MyThread myThread2 = new MyThread();
        // 直接调用run方法并没有启动多线程，需要调用start方法启动多线程
        /*myThread1.run();
        myThread2.run();*/
        myThread1.start();
        myThread2.start();
    }
}
```

注意：

一、为什么要重写`run()`方法？

因为run方法就是多线程在执行的时候需要被执行的内容，`run()`封装了被线程执行的代码

二、`run()`和`start()`方法有什么区别？

`run()`：封装线程被执行的代码，直接调用，相当于普通方法的调用

`start()`：启动线程，然后由JVM调用该线程的`run()`方法

#### 设置和获取线程名称

- 设置线程名称方法 `void setName(String name)`将此线程的名称更改为参数中的值
- 获取线程名称 `String getName()` 返回此线程的名称
- 返回当前正在执行的线程对象的引用：`public static Thread currentThread()`

```java
public class MyThread extends Thread{

    public MyThread() {

    }

    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":" + i);
        }
    }
}



/*
* Thread中本身有一个名为name的成员变量
* private volatile String name;
*
无参构造方法
public Thread() {
    this(null, null, "Thread-" + nextThreadNum(), 0);
}
带参构造方法，可以在自己定义的类中添加无参构造之后再自己定义带参构造设置名字
public Thread(String name) {
    this(null, null, name, 0);
}
全参构造方法
public Thread(ThreadGroup group, Runnable target, String name,
              long stackSize, boolean inheritThreadLocals) {
    this(group, target, name, stackSize, null, inheritThreadLocals);
}
获取线程名字方法
public final String getName() {
    return name;
}
设置名字方法
public final synchronized void setName(String name) {
        checkAccess();
    if (name == null) {
        throw new NullPointerException("name cannot be null");
    }

    this.name = name;
    if (threadStatus != 0) {
        setNativeName(name);
    }
}
初始化名字参数：
private static int threadInitNumber; 初始化值为0
private static synchronized int nextThreadNum() {
    return threadInitNumber++; 自动添加数值，返回当前值之后+1操作
}

* */
```

```java
public class MyThreadDemo {
    public static void main(String[] args) {
        /*MyThread mt1 = new MyThread();
        MyThread mt2 = new MyThread();
        mt1.setName("线程1");
        mt2.setName("线程2");
        mt1.start();
        mt2.start();*/

        MyThread mt1 = new MyThread("线程1");
        MyThread mt2 = new MyThread("线程2");

        mt1.start();
        mt2.start();

        // public static Thread currentThread()
        // 返回当前正在执行的线程对象的引用
        System.out.println(Thread.currentThread().getName());
    }
}
```

#### 线程调度

线程调度有两种模式

- 分时调度模型：所有线程轮流使用CPU的使用权，平均分配每个线程占用CPU的时间片
- 抢占式调度模型：优先让优先级高的线程使用CPU，如果线程的优先级相同，那么会随机选择一个，优先级高的线程获取的CPU时间片相对多一些

Java所使用的是抢占式调度模型。所以多线程的程序执行具有随机性，因为谁抢占到CPU的使用权是不一定的。

Thread类中获取线程优先级以及设置线程优先级的方法：

- `public final int getPriority()`返回此线程的优先级
- `public final void setPriority(int newPriority)`更改此线程的优先级

线程优先级的范围是1-10，默认线程优先级是5；线程优先级高仅仅只是线程获得时间片的概率高，并不是线程一定能够每次都抢占到时间片。可能需要在多次运行之后，才能看到想要的结果。

```java
public class ThreadPriority extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":" + i);
        }
    }
}
```

```java
public class ThreadPriorityDemo {
    public static void main(String[] args) {
        ThreadPriority priority1 = new ThreadPriority();
        ThreadPriority priority2 = new ThreadPriority();
        ThreadPriority priority3 = new ThreadPriority();

        priority1.setName("飞机");
        priority2.setName("高铁");
        priority3.setName("火车");

        System.out.println(priority1.getPriority());  // 5
        System.out.println(priority2.getPriority());  // 5
        System.out.println(priority3.getPriority());  // 5


        // IllegalArgumentException : 如果优先级不在范围 MIN_PRIORITY到 MAX_PRIORITY
        // priority1.setPriority(10000);

        System.out.println(Thread.MIN_PRIORITY);    // 1
        System.out.println(Thread.MAX_PRIORITY);    // 10
        System.out.println(Thread.NORM_PRIORITY);   // 5

        // 线程优先级高仅仅表示获取到执行权限的概率更高，并不是每次都能获取执行
        priority1.setPriority(1);
        priority2.setPriority(5);
        priority3.setPriority(10);

        priority1.start();
        priority2.start();
        priority3.start();
    }
}
```

#### 线程控制

![image-20210522192936473](https://i.loli.net/2021/05/22/6c48iTey3Xmvs1G.png)

首先创建对应的线程类，代码如下所示：

```java
public class ThreadSleep extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":" + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

```java
public class ThreadSleepDemo {
    public static void main(String[] args) {
        ThreadSleep ts1 = new ThreadSleep();
        ThreadSleep ts2 = new ThreadSleep();
        ThreadSleep ts3 = new ThreadSleep();

        ts1.setName("曹操");
        ts2.setName("刘备");
        ts3.setName("孙权");

        ts1.start();
        ts2.start();
        ts3.start();
    }
}
```

`Thread.sleep()`的作用是让线程进行休眠，参数为指定的休眠时间。

创建线程类`ThreadDemo`，之后通过创建实例对象，对两个方法进行验证使用。

```java
public class ThreadDemo extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":" + i);
        }
    }
}
```

`Thread.join()`方法，是等待线程结束。

```java
public class ThreadJoinDemo {
    public static void main(String[] args) throws InterruptedException {
        ThreadJoin tj1 = new ThreadJoin();
        ThreadJoin tj2 = new ThreadJoin();
        ThreadJoin tj3 = new ThreadJoin();

        tj1.setName("Join1");
        tj2.setName("Join2");
        tj3.setName("Join3");

        tj1.start();
        // join() 等待该线程死亡
        tj1.join();
        tj2.start();
        tj3.start();
    }
}
```

`Thread.setDaemon()`设置守护线程，当前所运行的线程全为守护线程的时候，Java虚拟机将退出。

```java
public class ThreadDaemonDemo {
    public static void main(String[] args) {
        ThreadDaemon td1 = new ThreadDaemon();
        ThreadDaemon td2 = new ThreadDaemon();

        td1.setName("关羽");
        td2.setName("张飞");

        // 设置主线程
        Thread.currentThread().setName("刘备");

        // 设置守护线程，在主线程结束之后立刻结束
        // setDaemon(boolean on) 标志着该线程是daemon线程或用户线程
        // 当运行的线程都是守护线程的时候，Java虚拟机将退出
        td1.setDaemon(true);
        td2.setDaemon(true);

        td1.start();
        td2.start();

        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + i);
        }
    }
}
```

#### 线程生命周期

![image-20210524003100680](https://i.loli.net/2021/05/24/8aMHBPpbfSGyrsQ.png)

#### 多线程的实现方法

有两种方法来创建一个新的执行线程，一是声明一个类是一类Thread。这类应重写类Thread的run方法，子类的一个实例可以被分配和启动。创建一个线程的另一个方式是声明一个类实现Runnable接口，该类实现run方法。然后可以分配该类的实例，在创建`Thread`时作为参数传递并启动。

方式二：实现Runnable接口

- 定义一个类MyRunnable实现Runnable接口
- 在MyRunnable类中重写run方法
- 创建MyRunnable类的对象
- 创建Thread类的对象，将MyRunnable对象作为构造方法的参数
- 启动线程

```java
public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + i);
        }
    }
}
```

```java
public class MyRunnableDemo {
    public static void main(String[] args) {
        MyRunnable mr = new MyRunnable();

        // Thread(Runnable target) 分配一个新的 Thread 对象
        Thread tr1 = new Thread(mr);
        Thread tr2 = new Thread(mr);
        /*tr1.start();
        tr2.start();*/

        // Thread(Runnable target, String name) 分配一个新的 Thread对象
        Thread tr3 = new Thread(mr, "火车");
        Thread tr4 = new Thread(mr, "高铁");
        tr3.start();
        tr4.start();
    }
}
```

相比于直接继承自Thread类，实现Runnable接口的好处：

- 避免了Java的单继承，在实现多线程的时候还可以再继承自另一个接口或者类
- 适合多个相同程序的代码去处理同一个资源的情况，把线程和程序的代码、数据有效分离，较好地体现了面向对象的设计思想

### 线程同步

案例：多窗口售卖电影票，总票数100

![image-20210524172442855](https://i.loli.net/2021/05/24/gWAKJdSYPD5ZknH.png)

实现代码如下所示：

```java
public class SellTicket implements Runnable {

    private int tickets = 100;

    @Override
    public void run() {
        while (true) {
            if (tickets > 0) {
                System.out.println(Thread.currentThread().getName() + "正在出售第" + tickets + "张票");
                tickets--;
            }
        }
    }
}
```

```java
public class SellTicketDemo {
    public static void main(String[] args) {
        SellTicket st = new SellTicket();

        Thread th1 = new Thread(st, "窗口1");
        Thread th2 = new Thread(st, "窗口2");
        Thread th3 = new Thread(st, "窗口3");
        th1.start();
        th2.start();
        th3.start();
    }
}
```

#### 思考

现实生活中，卖票也是需要时间的；反映在程序中，我们给每一次的卖票过程中添加一个Sleep方法，每一次卖票让线程休息100ms。

修改run方法，如下：

```java
@Override
public void run() {
    while (true) {
        if (tickets > 0) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "正在出售第" + tickets + "张票");
            tickets--;
        }
    }
}
```

这样引发的运行结果会出现问题：①同一张的票出现多次；②出现负数编号的票

> 窗口1正在出售第100张票
> 窗口3正在出售第100张票
> 窗口2正在出售第100张票
>
> ......
>
> 窗口3正在出售第0张票
> 窗口2正在出售第-1张票

问题的原因主要是**线程执行的随机性**，分析过程如下：

![image-20210524174413883](https://i.loli.net/2021/05/24/Y91DdlwLisIynHp.png)

#### 线程数据安全

上述案例中的ticket变量之所以会出现不合理的情况，是因为同一时刻被多个线程所访问，导致数据被不合理修改。

判断数据安全：

- 是否是多线程环境
- 是否有共享数据
- 是否有多条语句操作共享数据

解决数据安全问题：

- 设计思想：让程序没有安全问题的环境
- Java提供了同步代码块的解决方式

锁多条代码块操作共享数据，可以使用同步代码块实现：

```java
synchronized (任意对象) {
    // 多条语句操作共享数据代码
}
```

相当于给代码块内部的代码加锁，任意对象可以看成是一把锁。

```java
public class SellTicket implements Runnable {

    private int tickets = 100;
    private Object obj = new Object();

    @Override
    public void run() {
        while (true) {
            synchronized (obj) {
                if (tickets > 0) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + "正在出售第" + tickets + "张票");
                    tickets--;
                }
            }
        }
    }
    
}
```

最好的加锁方式就是重新定义一个对象，传输到任意对象的位置；这样当不同线程使用的时候，就会默认变成加了不同的锁，从而实现加锁的目的。

- 好处：解决了多线程的数据安全问题
- 弊端：当线程很多的时候，每次线程在运行同步代码块之前都需要判断上锁的状态，这是很耗费资源的，会拖累运行效率

#### 同步方法

同步方法就是在方法上添加关键字 `synchronized` ，加锁的对象是`this`

同步方法格式：

```java
private synchronized void methodName() {}
```

同步静态方法就是在静态方法上添加关键字 `synchronized`，加锁的对象是 `类名.class`

同步静态方法格式：

```java
private static synchronized void methodName() {}
```

#### 线程安全的类

`StringBuffer`

- 线程安全的可变序列。
- 从JDK 5开始，被StringBuilder替代。通常应该使用StringBuilder，因为它支持所有相同的操作不执行同步，执行速度更快。

`Vector`

- 从Java 2平台v1.2开始，该类改进了List接口。与新的集合实现不同，它实现了同步，这意味着它是线程安全的。如果不需要线程同步，建议使用ArrayList对象。

`Hashtable`

- 该类实现了一个Hash表，他将键映射到值。任何非NULL对象都可以用作键或者值。
- 从Java 2平台v1.2开始，该类改进了Map接口。与新的集合实现不同，它实现了同步，这意味着它是线程安全的。如果不需要线程同步，建议使用HashMap对象。

上述对应的线程安全类都有其对应的普通实现类，实例如下：

```java
public static void main(String[] args) {
    StringBuffer sb1 = new StringBuffer();
    StringBuilder sb2 = new StringBuilder();

    Vector<String> vector = new Vector<String>();
    ArrayList<String> arrayList = new ArrayList<String>();

    Hashtable<String, String> hashtable = new Hashtable<String, String>();
    HashMap<String, String> hashMap = new HashMap<String, String>();

    // synchronizedList(List<T> list) 返回由指定列表支持的同步（线程安全）列表
    List<String> strings = Collections.synchronizedList(new ArrayList<String>());
}
```

```java
public static void main(String[] args) {
    StringBuffer sb1 = new StringBuffer();
    StringBuilder sb2 = new StringBuilder();

    Vector<String> vector = new Vector<String>();
    ArrayList<String> arrayList = new ArrayList<String>();

    Hashtable<String, String> hashtable = new Hashtable<String, String>();
    HashMap<String, String> hashMap = new HashMap<String, String>();

    // synchronizedList(List<T> list) 返回由指定列表支持的同步（线程安全）列表
    List<String> strings = Collections.synchronizedList(new ArrayList<String>());
}
```

`Vector`和`Hashtable`现在已经不常用了，经常已经被后面的形式所替代。

#### Lock锁

Lock锁提供了比`synchronized`同步块更为广泛的锁操作，可以实现更多复杂的锁操作。

Lock中提供了获得锁和释放锁的操作：

- void lock() 获得锁
- void unlock() 释放锁

其中Lock是一个接口，不能直接实例化，我们使用到它的具体实现类`ReentrantLock`来进行实例化。

构造方法：

```java
public ReentrantLock() {}  // 获得一个ReentrantLock的实例
```

案例：卖票案例，利用Lock锁对象来实现

```java
public class SellTicket implements Runnable{
    private int tickets = 100;
    // 创建锁的对象
    private Lock lock = new ReentrantLock();
    @Override
    public void run() {
        while (true) {
            try {
                lock.lock();
                if (tickets > 0) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + "正在出售第" + tickets + "张票");
                    tickets--;
                }
            } finally {
                lock.unlock();
            }
        }
    }
}
```

在这个过程中，在`lock()`和`unlock()`之间的代码就会默认是上锁的代码。作用效果和`synchronized`是一样的，但是为了防止上锁的代码部分在执行的过程中出现问题，我们将`unlock()`的调用放到finally代码块中，这样我们才能保证整个程序在运行的过程中不会出现问题。

#### 生产者消费者问题

生产者消费者问题，实际上就是两类线程的问题：

- 一类是生产者线程用于生产数据
- 一类是消费者线程用于消费数据

用于解耦生产者和消费者之间的关系，通常会采用一个共享数据的区域，我们通常把它看成是一个仓库

- 生产者生产数据之后直接放在共享的数据区域中，并不需要关心消费者的行为
- 消费者只需要从共享区域中获取到共享的数据，并不需要关心生产者的行为

为了体现生产者和消费者之间的等待和唤醒，Java中提供了几个方法供我们使用：

![image-20210525130816145](https://i.loli.net/2021/05/25/eS3GtUIWywgskMo.png)

实现案例：

牛奶生产者和消费者，通过一个存放牛奶的奶箱实现两者的交流

![image-20210525131042096](https://i.loli.net/2021/05/25/cQ8EXlMJxLuvV9y.png)

开发步骤：

①创建生产者类`Producer`

```java
public class Producer implements Runnable{
    private Box box;

    public Producer(Box box) {
        this.box = box;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            box.put(i);
        }
    }
}
```

②创建消费者类对象`Customer`

```java
public class Customer implements Runnable{
    private Box box;
    public Customer(Box box) {
        this.box = box;
    }

    @Override
    public void run() {
        while (true) {
            box.get();
        }
    }
}
```

③创建共享数据对象`Box`

```java
public class Box {
    // 定义一个成员变量，表示是第几瓶奶
    private int milk;
    // 定义一个成员变量，表示奶箱的状态
    private boolean state = false;
    // 定义一个存储牛奶以及获取牛奶的方法
    public synchronized void put(int milk) {
        // 如果存在牛奶，等待消费
        if (state) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        // 如果没有牛奶，则生产牛奶
        this.milk = milk;
        System.out.println("送奶工将第" + this.milk + "瓶奶送到");
        // 生产牛奶完毕，修改奶箱状态
        state = true;
        // 唤醒其他等待的线程
        notifyAll();

    }
    public synchronized void get() {
        // 如果没有牛奶，等待生产
        if (!state) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        // 如果存在牛奶，进行消费
        System.out.println("消费者将第" + this.milk + "瓶奶取走");
        // 消费完毕，修改奶箱状态
        state = false;
        // 唤醒其他线程
        notifyAll();
    }
}
```

④创建操作实现类`BoxDemo`

```java
public class BoxDemo {
    public static void main(String[] args) {
        // 创建奶箱对象，表示这是共享数据区
        Box box = new Box();

        // 创建生产者对象，把奶箱对象作为构造方法参数传递，因为在这个类中要调用存储牛奶的操作
        Producer p = new Producer(box);
        // 创建消费者对象，把奶箱对象作为构造方法参数传递，因为在这个类中要调用取走牛奶的操作
        Customer c = new Customer(box);

        // 创建两个线程，分别把生产者和消费者对象作为参数传递
        Thread t1 = new Thread(p);
        Thread t2 = new Thread(c);
        // 启动线程
        t1.start();
        t2.start();
    }
}
```

最终的运行结果：

> 送奶工将第1瓶奶送到
> 消费者将第1瓶奶取走
> 送奶工将第2瓶奶送到
> 消费者将第2瓶奶取走
> 送奶工将第3瓶奶送到
> 消费者将第3瓶奶取走
> 送奶工将第4瓶奶送到
> 消费者将第4瓶奶取走
> 送奶工将第5瓶奶送到
> 消费者将第5瓶奶取走

## 八、网络编程

### 概述

![image-20210525135210984](https://i.loli.net/2021/05/25/pRDMqWzeQcbw6Xl.png)

**网络编程**

- 在网络通信协议下，实现网络互连的不同计算机上运行的程序间可以进行数据交换

#### 网络编程三要素

![image-20210525135553182](https://i.loli.net/2021/05/25/NBzj4r8J2dPfub1.png)

#### IP地址

IP地址是网络中设备的唯一标识，IP地址分为两大类

![image-20210525135716104](https://i.loli.net/2021/05/25/2KvzMBjTmNxqoli.png)

**常用命令**

- `ipconfig`	用来查看本机IP地址相关信息
- `ping ip地址`	检查网络的连通信

**特殊地址**

`127.0.0.1`  回送地址，可以代表本机地址，一般用来测试使用

**`InetAddress`类**

为了方便网络编程，Java提供了`InetAddress`类用来获取IP地址

`InetAddress`类表示Internet协议（IP）地址

![image-20210525140730850](https://i.loli.net/2021/05/25/gOYUGduB4kyeh2Z.png)

使用案例：

```java
public static void main(String[] args) throws UnknownHostException {
    // InetAddress address = InetAddress.getByName("DESKTOP-6QQI4OP");
    InetAddress address = InetAddress.getByName("192.168.123.231");

    // 获取IP地址的主机名
    String hostName = address.getHostName();
    System.out.println("主机名：" + hostName);

    // 获取IP地址
    String ip = address.getHostAddress();
    System.out.println("IP地址：" + ip);
}
```

#### 端口

端口：设备上应用程序的唯一标识

端口号：用两个字节表示的整数，取值范围值0-65535；其中，0-1023之间的端口号用于一些知名的网络服务和应用，普通的应用程序需要使用1024以上的端口号。如果端口号被另外一个服务或应用所占用，会导致当前应用启动失败。

#### 协议

协议：计算机网络中，连接和通信的规则被称为网络通信协议

![image-20210525142344571](https://i.loli.net/2021/05/25/DnKNRCOrhpTS1u6.png)

![image-20210525142538654](https://i.loli.net/2021/05/25/618A3EnULTaDvKm.png)

**三次握手示意图**

![image-20210525142625268](https://i.loli.net/2021/05/25/TKfXQmubqczU1Ye.png)

### TCP和UDP

#### UDP通信程序

UDP是一种不可靠的网络传输协议，他在通信两端各建立一个Socket对象，但是这两个Socket只是发送/接收数据的对象；因此对基于UDP通信协议的双方而言，没有所谓的客户端服务器的概念。

Java提供了`DatagramSocket`类作为基于UDP协议的Socket

**发送数据的步骤**

①创建发送端的Socket对象`DatagramSocket`

②创建数据，并把数据打包

③调用`DatagramSocket`对象的方法发送数据

④关闭发送端

```java
public class SendDemo {
    public static void main(String[] args) throws IOException {
        // 创建发送端的 Socket 对象 DatagramSocket
        // DatagramSocket() 构建一个数据报套接字绑定到本地主机的任何可用的端口
        DatagramSocket ds = new DatagramSocket();

        // 创建数据，并把数据打包
        // DatagramPacket(byte[] buf, int offset, int length, InetAddress address, int port)
        // 构造一个指定长度的数据包，发送到指定主机上的指定端口号
        byte[] bytes = "Hello, World".getBytes();
        /*int length = bytes.length;
        InetAddress address = InetAddress.getByName("192.168.123.231");
        int port = 10010;
        DatagramPacket dp = new DatagramPacket(bytes, length, address, port);*/
        DatagramPacket dp = new DatagramPacket(bytes, bytes.length, InetAddress.getByName("192.168.123.231"), 10010);

        // 调用 DatagramSocket 对象的方法发送数据
        // void send(DatagramPacket p)  从这个套接字发送数据报包
        ds.send(dp);

        // 关闭发送端
        // void close() 关闭该数据报套接字
        ds.close();
    }
}
```

**接收数据的步骤**

①创建一个接收端的Socket对象用于接收数据（`DatagramSocket`）

②创建一个数据包用于接收数据

③调用`DatagramSocket`的方法用于接收数据

④解析数据包，并在控制台打印数据

⑤关闭接收端

```java
public class ReceiveDemo {
    public static void main(String[] args) throws IOException {
        // ①创建一个接收端的Socket对象用于接收数据（DatagramSocket）
        DatagramSocket ds = new DatagramSocket(10010);

        // ②创建一个数据包用于接收数据
        // DatagramPacket(byte[] buf, int length)  构造一个DatagramPacket用于接收数据包长度为 length 的数据包
        byte[] bytes = new byte[1024]; // 实际数据长度大小可能并没有这么多
        DatagramPacket dp = new DatagramPacket(bytes, bytes.length);

        // ③调用 DatagramSocket 的方法用于接收数据
        ds.receive(dp);

        // ④解析数据包，并在控制台打印数据
        // byte[] getData() 返回数据缓冲区
        byte[] data = dp.getData();
        // int getLength()  返回要发送的数据的长度或收到的数据的长度
        int length = dp.getLength();
        String dataStr = new String(data, 0, length);
        System.out.println(dataStr);

        // ⑤关闭接收端
        ds.close();
    }
}
```

运行时，先运行接收端，接收端会一直开启等待数据发送；之后运行发送端，发送端发送数据由接收端接收之后，接收端会执行相关操作，最后在控制台打印输出相关的数据。

![image-20210525150404039](https://i.loli.net/2021/05/25/BuXkefgq8EZRLFs.png)

#### 练习：UDP通信

按下面要求实现程序：

- UDP发送数据：数据来自于键盘输入，直到输入的数据是886，发送数据结束
- UDP接收数据：数据来自于发送程序，因为不知道什么时候停止接收数据，故采用死循环接收

发送端程序：

```java
public class SendDemo {
    public static void main(String[] args) throws IOException {
        // 从键盘录入数据进行发送，直到录入的数据是886，停止录入
        // 创建发送端的Socket对象 DatagramSocket
        DatagramSocket ds = new DatagramSocket();

        // 自己封装一个键盘录入
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        while ((line = br.readLine()) != null) {
            // 判断数据是否是 886
            if ("886".equals(line)) {
                break;
            }
            // 创建发送端的数据包对象
            byte[] bytes = line.getBytes();
            DatagramPacket dp = new DatagramPacket(bytes, bytes.length, InetAddress.getByName("192.168.123.231"), 10086);

            // 调用DatagramSocket对象的相关方法进行发送
            ds.send(dp);
        }

        // 关闭发送端
        ds.close();
    }
}
```

接收端程序：

```java
public class ReceiveDemo {
    public static void main(String[] args) throws IOException {
        // 创建接收端对象
        DatagramSocket ds = new DatagramSocket(10086);
        while (true) {
            // 调用 DatagramSocket对象的接收方法
            byte[] bytes = new byte[1024];
            DatagramPacket dp = new DatagramPacket(bytes, bytes.length);
            // 接收数据，对数据进行解析
            ds.receive(dp);
            String data = new String(dp.getData(), 0, dp.getLength());
            System.out.println(data);
            // 关闭接收端，死循环接收数据，无操作
        }
    }
}
```

#### TCP通信程序

TCP通信协议是一个可靠的网络通信协议。它在通信的两端各建立一个Socket对象，从而在通信的两端形成网络虚拟链路，一旦建立了虚拟的网络链路，两端的程序就可以通过虚拟链路进行通信。
Java对基于TCP协议的网络通信提供了良好的封装，使用Socket对象来代表两端的通信端口，并通过Socket产生IO流来进行网络通信。
Java为客户端提供了Socket类，为服务器端提供了`ServerSocket`类。

**TCP发送数据**

步骤：

①创建客户端的Scoket对象

②获取输出流，写数据

③释放资源

```java
public class ClientDemo {
    public static void main(String[] args) throws IOException {
        // 创建Scoket对象
        // Socket(InetAddress address, int port) 创建一个流套接字，并将其与指定的IP地址中的指定端口号连接起来
        // Socket s = new Socket(InetAddress.getByName("192.168.123.231"), 10000);
        // Socket(String host, int port) 创建一个流套接字，并将其与指定的主机上的指定端口号连接起来
        Socket s = new Socket("192.168.123.231", 10000);

        // 获取输出流，写数据
        // OutputStream getOutputStream() 返回此套接字的输出流
        OutputStream os = s.getOutputStream();
        os.write("Hello, World!".getBytes());

        // 释放资源
        os.close();
        s.close();
    }
}
```

**TCP接收数据**

步骤：

①创建服务器端的`Socket`对象（`ServerSocket`）

②监听客户端连接，并返回`Socket`对象

③获取输入流，读数据，并把数据显示输出在控制台

④释放资源

```java
public class ServerDemo {
    public static void main(String[] args) throws IOException {
        // 创建服务器端的Socket对象（`ServerSocket`）
        ServerSocket ss = new ServerSocket(10010);

        // 获取输入流，读数据，并把数据显示输出在控制台
        // Socket accept() 监听要对这个套接字作出的连接并接受它
        Socket s = ss.accept();
        InputStream is = s.getInputStream();
        byte[] bytes = new byte[1024];
        int len = is.read(bytes);
        String data = new String(bytes, 0, len);
        System.out.println(data);

        // 释放资源
        s.close();
        ss.close();

    }
}
```

运行时先运行服务器端程序，之后再运行客户端程序；由服务器端程序监听连接状态，客户端程序发送连接请求，通过TCP协议进行连接通信，之后各自分别进行数据的发送和接收。

#### 练习：TCP通信

案例一：需求如下：

- 客户端：发送数据，接收服务器端反馈
- 服务器端：接收数据，给出反馈

```java
public class ServerDemo {
    public static void main(String[] args) throws IOException {
        // 创建ServerSocket对象
        ServerSocket ss = new ServerSocket(10010);

        // 监听连接，得到Socket对象
        Socket s = ss.accept();
        InputStream is = s.getInputStream();
        byte[] bytes = new byte[1024];

        // 读取数据，释放资源
        int len = is.read(bytes);
        String data = new String(bytes, 0, len);
        System.out.println("服务器端：" + data);

        // 给客户端发出反馈
        OutputStream os = s.getOutputStream();
        os.write("数据已成功发送".getBytes(StandardCharsets.UTF_8));

        // 释放资源
        ss.close();
    }
}
```

```java
public class ClientDemo {
    public static void main(String[] args) throws IOException {
        // 首先创建Socket对象
        Socket s = new Socket("192.168.123.231", 10010);

        // 获取输出流，写数据
        OutputStream os = s.getOutputStream();
        os.write("Hello TCP Server".getBytes());

        // 接收服务器端的反馈
        InputStream is = s.getInputStream();
        byte[] bytes = new byte[1024];
        int len = is.read(bytes);
        String data = new String(bytes, 0, len);
        System.out.println("客户端：" + data);

        // 释放资源
        s.close();
    }
}
```

案例二：需求如下所示，要求运用TCP协议

- 客户端：数据来自于键盘，直到输入的数据的数字是886，输入结束
- 服务器端：数据来自于客户端，将客户端的数据显示在控制台

```java
public class ClientInputData {
    public static void main(String[] args) throws IOException {
        // 创建一个 Socket 对象
        Socket s = new Socket("192.168.123.231", 10010);

        // 从键盘读取数据，一直到读取到特定字符结束读取
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // 封装输出流对象
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
        String line;
        while ((line = br.readLine()) != null) {
            if ("886".equals(line)) {
                break;
            }
            // 获取输出流，写数据
            /*OutputStream os = s.getOutputStream();
            os.write(line.getBytes(StandardCharsets.UTF_8));*/
            bw.write(line);
            bw.newLine();
            bw.flush();
        }

        // 释放资源
        s.close();
    }
}
```

```java
public class ServerInputData {
    public static void main(String[] args) throws IOException {
        // 创建一个 ServerSocket 对象
        ServerSocket ss = new ServerSocket(10010);

        // 监听连接，获取 Socket 对象
        Socket s = ss.accept();
        /*InputStream is = s.getInputStream();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr);*/
        BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }

        // 释放资源
        ss.close();
    }
}
```

案例三：需求如下：

- 客户端：数据来自于文本文件，接收服务器反馈
- 服务器：接收到的数据写入文本文件，给出反馈，代码用线程进行封装，为每一个客户端开启一个线程

①创建线程类

```java
public class ServerThread implements Runnable {
    private Socket s;
    public ServerThread(Socket s) {
        this.s = s;
    }

    @Override
    public void run() {
        // 接收数据写到文本文件
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
            // BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day14_NetPrograming\\Copy.java"));
            // 解决名称问题
            int count = 0;
            File file = new File("D:\\Java\\IdeaProjects\\JavaBasic\\day14_NetPrograming\\Copy(" + count + ").java");
            while (file.exists()) {
                count++;
                file = new File("D:\\Java\\IdeaProjects\\JavaBasic\\day14_NetPrograming\\Copy(" + count + ").java");
            }
            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine();
                bw.flush();
            }

            // 给出反馈
            BufferedWriter bwServer = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
            bwServer.write("文件上传成功！");
            bwServer.newLine();
            bwServer.flush();

            // 释放资源
            s.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

②创建服务器类

```java
public class ThreadServer {
    // 服务器：接收到的数据写入文本文件，给出反馈，代码用线程进行封装，为每一个客户端开启一个线程
    public static void main(String[] args) throws IOException {
        // 创建服务器 Socket 对象
        ServerSocket ss = new ServerSocket(10010);

        // 监听服务器连接，获取Socket对象
        while (true) {
            Socket s = ss.accept();
            new Thread(new ServerThread(s)).start();
        }

        // 不需要关闭服务器
    }
}
```

③创建客户端类

```java
public class ThreadClient {
    public static void main(String[] args) throws IOException {
        // 创建客户端 Socket 对象
        Socket s = new Socket("192.168.123.231", 10010);

        // 封装上传的文本文件
        BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day14_NetPrograming\\src\\TCP_exercise\\ThreadClient.java"));
        // 封装输出流写数据
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));

        String line;
        while ((line = br.readLine()) != null) {
            bw.write(line);
            bw.newLine();
            bw.flush();
        }

        s.shutdownOutput();

        // 接收反馈
        BufferedReader brClient = new BufferedReader(new InputStreamReader(s.getInputStream()));
        String read = brClient.readLine();
        System.out.println(read);

        // 释放资源
        br.close();
        s.close();
    }
}
```

## 
