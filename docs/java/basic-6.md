---
title: 【Java】基础知识部分-多线程
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

