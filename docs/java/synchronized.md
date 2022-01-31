---
title: 【Java】synchronized关键字详解
date: 2021-12-26 21:28:12
tags:
- Java
---

# 一、并发编程三大特性

## 可见性

多个线程对同一个共享变量的环境中，单一线程对共享变量进行修改，不能让其他线程立马感知到。这就是个可见性的问题。主要解决方式：volatile关键字。

## 原子性

多线程环境下，对于一些指令的完成，可能被其他线程打断，导致只进行到一个并不存在的“中间态”，造成数据的一些错误。原子性应该是保证命令不可再分，要么完成要么失败。主要通过加锁的方式解决。

## 有序性

Java程序在执行之前，编译器会对程序做一些优化。这些优化有可能导致程序的实际执行顺序与开发者的编写顺序并不一致，导致了有序性的问题。主要解决方法使用volatile关键字。

测试Java并发的过程中，可以使用`jcstress`工具进行测试。

# 二、Java内存模型JMM

每一个线程，会有自己对应的工作内存，在对主内存中的共享变量进行操作的时候，会先读取主内存中共享变量的副本。线程的工作内存互不影响。

主内存是一个所有线程都可以访问到的内存区，对于所有线程都是共享的，主要存放一些共享变量信息。

![image-20210926222523059](https://gitee.com/realBeBetter/image/raw/master/img/image-20210926222523059.png)

主要需要注意的点：

①在进行Lock加锁操作，线程进行的首先就是将工作内存中的共享变量清空，刷新共享变量（从主内存中读取最新的共享变量值）

②进行Unlock解锁操作，线程进行的是将工作内存中的共享变量同步到主内存中

# 三、synchronized保证三大特性

## synchronized保证原子性

在synchronized操作的代码块中，可以保证同一时刻只有一个线程能够进行操作。保证并发安全，保证了原子性。

```java
synchronized (obj) {
	// 保证原子性的内容
}
```

这个`obj`对象就相当于一个锁，需要注意的是：这个`obj`一般也需要设置为共享变量，能够保证所有需要的线程能够访问到这把锁，这样才能保证锁的可用性。这个过程就相当于：我要开锁进房间，必须先去钥匙管理处拿钥匙，钥匙如果被拿走了，那么就表示有其他人（线程）在访问房间（语句块中的内容）；此时我能做的就只有等待钥匙被归还（锁被释放）。

## synchronized保证可见性

JMM中，可见性主要的问题是：其他线程修改了主内存中的共享变量，操作同一共享变量的线程不能感知到改变，操作的还是线程工作内存中的共享变量的副本。

synchronized关键字的作用，对应于Lock操作，进行原子操作，会将工作内存中的共享变量值进行刷新，这个过程保证了可见性。

## synchronized保证有序性

**as-if-serial语义**

为了提高程序的执行效率，编译器和CPU会对程序中的代码进行指令重排。但是如果代码之间存在依赖关系或者前后因果关系，就不会更改指令顺序，这样可能会造成运行结果改变。也就是说保证在单线程情况下，程序运行结果是正确的。

指令重排会对那些没有逻辑关系或者依赖关系的指令进行重排序，单线程环境下一般不会有影响，但是在多线程环境下，可能会出现问题。

synchronized操作后，虽然进行了重排序，保证同一时刻只有一个线程会进入同步代码块，也能保证有序性。

# 四、synchronized的特性

## 可重入

一个线程可以重复多次执行synchronized，可以重复获取同一把锁。这个重复指的是：**锁上之后再加一把锁**，并非是并列关系，而是嵌套关系。

```java
public static void main(String[] args) {
    Thread t1 = new Thread(() -> {
        synchronized (MyThread.class) {
            System.out.println("获得了锁1");
            synchronized (MyThread.class) {
                System.out.println("获得了锁2");
            }
        }
    });
    t1.start();
}
```

synchronized锁对象中存在一个计数器recursions，会记录获取锁的次数。

优点：①可以避免死锁。②可以更好的封装代码。

这个过程中，每次获取到锁，recursions的变量值就会+1，执行完同步代码块后，recursions的变量值就会-1，直到这个值变为0的时候，就会释放锁。

## synchronized不可中断

synchronized代码块中，当有一个线程获得锁之后，其余的线程只能处于阻塞或者等待状态。一直要等待锁被释放，才能获得锁。

```java
public class Uninterruptible {

    // 定义锁对象
    public static final Object object = new Object();
    public static void main(String[] args) throws InterruptedException {
        Runnable runnable = () -> {
            synchronized (object) {
                String name = Thread.currentThread().getName();
                System.out.println(name + "进入同步代码块");
                try {
                    Thread.sleep(50000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

        Thread t1 = new Thread(runnable);
        t1.start();
        Thread.sleep(1000);

        Thread t2 = new Thread(runnable);
        t2.start();

        // 停止第二个线程
        System.out.println("T2被中断前");
        t2.interrupt();
        System.out.println("T2被中断后");

        System.out.println(t1.getState());
        System.out.println(t2.getState());
    }

}
```

以上代码的运行结果：

> Thread-0进入同步代码块
> T2被中断前
> T2被中断后
> TIMED_WAITING
> BLOCKED

可以看到T2在等待锁被释放的过程中，一直处于阻塞状态，且调用了中断方法也没有停止T2线程。值得注意的是，切换调用`t2.stop();`之后，运行结果还是不变，也就是等待线程是不可中断的。

## Lock的可中断和不可中断

Lock是一个在Java中经常使用到的JDK提供的锁，本身是一个接口，我们经常使用到的是他的实现类。

![image-20210927130636097](https://gitee.com/realBeBetter/image/raw/master/img/image-20210927130636097.png)

实现类有以下几种：

![image-20210927130736017](https://gitee.com/realBeBetter/image/raw/master/img/image-20210927130736017.png)

使用较多的是ReentrantLock类。

```java
public class MyLock {

    private static final ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) throws InterruptedException {
        Runnable runnable = () -> {
            String name = Thread.currentThread().getName();
            try {
                lock.lock();
                System.out.println(name + "获得了锁");
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
                System.out.println(name + "释放了锁");
            }
        };

        Thread t1 = new Thread(runnable);
        t1.start();
        Thread.sleep(1000);

        Thread t2 = new Thread(runnable);
        t2.start();

        // 停止第二个线程
        System.out.println("T2被中断前");
        t2.interrupt();
        System.out.println("T2被中断后");
        Thread.sleep(1000);
        System.out.println(t1.getState());
        System.out.println(t2.getState());
    }

}
```

运行结果：

> Thread-0获得了锁
> T2被中断前
> T2被中断后
> TIMED_WAITING
> WAITING

这个状态下，T2处于等待状态。同样是没有被中断。也就是说，调用`lock()`方法也是不可中断的。

```java
Runnable run = () -> {
    String name = Thread.currentThread().getName();
    boolean b = false;
    try {
        b = lock.tryLock(3, TimeUnit.SECONDS);
        if (b) {
            System.out.println(name + "获得锁,进入锁执行");
            Thread.sleep(88888);
        } else {
            System.out.println(name + "在指定时间没有得到锁做其他操作");
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
    } finally {
        if (b) {
            lock.unlock();
            System.out.println(name + "释放锁");
        }
    }
};
Thread t1 = new Thread(run);
t1.start();
Thread.sleep(1000);
Thread t2 = new Thread(run);
t2.start();
```

但是这个的运行结果：

> Thread-0获得锁,进入锁执行
> Thread-1在指定时间没有得到锁做其他操作

`tryLock()`方法是可以中断的。这就是Lock的可中断和不可中断。`ReentrantLock`名字翻译为可重入锁，本身是个可重入的锁，测试也可以得知这一结论。

> synchronized属于不可被中断
> Lock的lock方法是不可中断的
> Lock的tryLock方法是可中断的

tryLock源码：

```java
@ReservedStackAccess
final boolean tryLock() {
    Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (compareAndSetState(0, 1)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    } else if (getExclusiveOwnerThread() == current) {
        if (++c < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(c);
        return true;
    }
    return false;
}
```

这个方法的运行逻辑应该是这样的：获取当前线程的状态码-->判断状态码是否为0-->如果是，设置为1将当前线程指定为排他线程；如果当前线程为排他线程，设置状态码+1，表示获取到锁；其余情况下获取失败。

# 五、synchronized原理

利用反编译`javap`命令可以进行反编译操作。`javap -p -v xx.class`指令，`.class`文件一般存放在项目下的out文件夹之下。

`synchronized`语句块在执行之前，会有一个`monitorenter`指令，退出语句块的时候，有一个`monitorexit`指令。

> 7:monitorenter
> 8:iinc 1,1
> 11:aload_2
> 12:monitorexit
> 13:goto	21
> 16:astore_3
> 17:aload_2
> 18:monitorexit

monitor并不是主动创建的，而是JVM执行到同步代码块的时候创建的。monitor有两个重要的参数：一个是成员变量owner，表示这把锁的拥有者；一个是recursions，表示拥有这把锁的次数。当一个线程拥有monitor之后其他线程只能进行等待。monitor之间的代码出现异常后，会进行下一层指令，最后执行一次monitorexit。这个时候就相当于出现异常会释放锁，这也是为什么上面会出现两个monitorexit的原因。

所以在synchronized同步代码块中发生异常，会释放锁。

> 1.能执行monitorexit指令的线程一定是拥有当前对象的monitor的所有权的线程。
>
> 2.执行monitorexit时会将monitor的进入数减1。当monitor的进入数减为0时，当前线程退出monitor，不再拥有monitor的所有权，此时其他被这个monitor阻塞的线程可以尝试去获取这个monitor的所有权。
>
> 这个过程也对应着锁的重入。

同步代码块的执行中调用了monitorenter和monitorexit指令。在同步方法中，编译后会添加`acc_synchronized`修饰，也同样会隐式调用monitorenter和monitorexit。每一个锁都会关联一个monitor对象，monitor才是真正的锁的对象。

## synchronized和Lock的区别

1.synchronized是关键字，而Lock是一个接口。2. synchronized会自动释放锁，而Lock必须手动释放锁。3. synchronized是不可中断的，Lock可以中断也可以不中断。4. 通过Lock可以知道线程有没有拿到锁（tryLock方法有返回值，可以根据返回值判断进行相应操作），而synchronized不能。5. synchronized能锁住方法和代码块，而Lock只能锁住代码块。6. Lock可以使用读锁提高多线程读效率。7. synchronized是非公平锁，ReentrantLock可以控制是否是公平锁。

# 六、synchronized优化

## CAS（Compare And Swap）

CAS即比较再交换，CAS可以将比较和交换转为原子操作，这个原子操作直接由CPU保证，是现代CPU广泛支持的对内存中的共享数据进行操作的一种指令。

CAS操作依赖3个值：内存中的值V，旧的预估值X，要修改的新值B，如果旧的预估值X等于内存中的值V，就将新的值B保存到内存中。

在`AtomicInteger`的源码中，Unsafe类提供了原子操作，这个类是JVM提供的类，一般需要导包使用。我们调用的时候使用到的是`AtomicInteger`类，然后通过实例化对象调用Unsafe提供的方法。

## 乐观锁和悲观锁

> **悲观锁**从悲观的角度出发：总是假设最坏的情况，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会阻塞。因此synchronized我们也将其称之为悲观锁。JDK中的`ReentrantLock`也是一种悲观锁。性能较差。

> **乐观锁**从乐观的角度出发：总是假设最好的情况，每次去拿数据的时候都认为别人不会修改，就算改了也没关系，再重试即可。所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去修改这个数据，如果没有人修改则更新，如果有人修改则重试。

## synchronized锁升级

`synchronized`锁升级过程高效并发是从JDK 5到JDK 6的一个重要改进，HotSpot虛拟机开发团队在这个版本上花费了大量的精力去实现各种锁优化技术，包括偏向锁( Biased Locking )、轻量级锁( Lightweight Locking )和适应性自旋(Adaptive Spinning)、锁消除( Lock Elimination)、锁粗化( Lock Coarsening )等，这些技术都是为了在线程之间更高效地共享数据，以及解决竞争问题，从而提高程序的执行效率。

无锁-->偏向锁-->轻量级锁–>重量级锁

java对象的布局如下所示：

![image-20210927175141194](https://gitee.com/realBeBetter/image/raw/master/img/image-20210927175141194.png)

在加锁的过程中，锁的状态信息保存在对象头中。对象头中存在一个Mark Word字段，用于保存对象的各种信息，比如哈希码（Hash Code）、GC分代年龄、锁状态标志、线程持有的锁、偏向线程ID、偏向时间戳等。这个对象头的大小由虚拟机位数决定，64位或者32位，与虚拟机的位数一致。

64位虚拟机下，Mark Word的存储结构如下：

![image-20210927175904174](https://gitee.com/realBeBetter/image/raw/master/img/image-20210927175904174.png)

对象布局中的对象头还存在一个Klass，一般被成为类型指针。在64位虚拟机中，Mark Word占8个byte，Klass占8个byte，一共占据16个字节，也就是128bit。

实例数据主要存放的是类的实例化对象的数据。对其数据主要是用来填充内存的碎片空隙，对象的起始地址要求一般是8字节的整数倍，用于方便虚拟机寻址。

## 偏向锁

偏向锁是一个设计思想，指的是通常将锁偏向于第一个获得锁的线程。大多数情况下，不存在多个线程竞争，会优先考虑使用偏向锁，对于同一线程多次获取锁来说效率会更高。

使用偏向锁的时候，会在对象头存储锁偏向的线程ID，以后再次进入和退出同步代码块的时候只需要判断是否是第一次获得锁的线程即可。

不过一旦出现多个线程竞争时必须撤销偏向锁，所以撤销偏向锁消耗的性能必须小于之前节省下来的CAS原子操作的性能消耗，不然就得不偿失了。

- 偏向锁的撤销需要等待全局安全点
- 撤销偏向锁会将恢复到无锁或者轻量级锁状态

偏向锁在Java 6之后是默认启用的，但在应用程序启动几秒钟之后才激活，可以使用`-XX:BiasedLockingStartupDelay=0`参数关闭延迟，如果确定应用程序中所有锁通常情况下处于竞争状态，可以通过`XX:-UseBiasedLocking=false`参数关闭偏向锁。

- 偏向锁是在只有一个线程执行同步块时进一步提高性能，适用于一个线程反复获得同一锁的情况。
- 适用于有同步代码块，但是没有竞争的情况。

## 轻量级锁

在关闭偏向锁功能或者多个线程竞争偏向锁会导致偏向锁升级成为轻量级锁。轻量级锁的轻量指的是相对于重量级锁使用到的monitorenter和monitorexit来说，使用到monitor的传统锁一般称为重量级锁。

轻量级锁大多使用在多个线程交互执行不存在实际长竞争（短时间允许使用自旋，自旋失败将会升级到重量级锁）的情况下，降低多个线程在切换的时候由于重量级锁带来的性能开销。

对于轻量级锁，其性能提升的依据是“对于绝大部分的锁，在整个生命周期内都是不会存在竞争的”，如果打破这个依据则除了互斥的开销外，还有额外的CAS操作，因此在有多线程竞争的情况下，轻量级锁比重量级锁更慢。

但是在多个线程同一时刻进入临界区的时候，会导致轻量级锁释放膨胀成重量级锁。从这一点来说，轻量级锁并不能代替重量级锁来使用。

轻量级锁的释放轻量级锁的释放也是通过CAS操作来进行的，主要步骤如下：

	1. 取出在获取轻量级锁保存在Displaced Mark Word中的数据。
	2. 用CAS操作将取出的数据替换当前对象的Mark Word中，如果成功，则说明释放锁成功。
	3. 如果CAS操作替换失败，说明有其他线程尝试获取该锁，则需要将轻量级锁需要膨胀升级为重量级锁。

## 自旋锁

在任何时刻，都只能有一个线程获得锁。对于互斥锁，如果资源已经被占用，资源申请者只能进入睡眠状态。

> 但是自旋锁不会引起调用者睡眠，如果自旋锁已经被别的执行单元保持，调用者就一直循环在那里看是否该自旋锁的保持者已经释放了锁，"自旋"一词就是因此而得名。

为了让线程一直处于等待，只需让线程执行一个忙循环（自旋）, 这项技术就是所谓的自旋锁。可以降低等待锁的线程由阻塞态切换到内核态带来的性能消耗，相当于是利用了少量的处理性能换来了时间。

在jdk 6之前，可以使用`-XX:+UseSpinning`参数来开启自旋锁，在JDK 6中就已经改为默认开启了。如果等待的时间很少，那么等待的线程可以随时切换成内核态，相比于没有引入自旋锁的阻塞态，能够更快地进行切换。但是如果等待的时间非常久，那么将会一直白白浪费处理器资源（自旋），所以应该给这个锁设置一个等待限制。

自旋超过了限定的次数仍然没有成功获得锁，就应当使用传统的方式去挂起线程了。自旋次数的默认值是10次，用户可以使用参数`-XX:PreBlockSpin`来更改这个自旋次数。

**适应性自旋锁**

在JDK 6中，引入了适应性自旋锁的概念。顾名思义，就是自旋锁会根据自旋获取锁的难度，自适应判断是否自旋。对于同一个锁对象，如果在上一次自旋中很容易就获取锁了，那么这次就会允许它自旋更多次数；如果上一次很难或者一直没有获取到锁，那么这一次可能会直接忽略自旋的过程。

这个过程很类似于智能学习，只不过学习判断是否要自旋的条件有了更多的限制。

## 锁消除

> 锁消除是指虚拟机即时编译器（JIT）在运行时，对一些代码上要求同步，但是被检测到不可能存在共享数据竞争的锁进行消除。

简而言之，JIT对于操作是否要获得锁进行一个编译期间的优化，判断是否真的要进行加锁。如果不需要进行加锁的环境下，却显式地使用了同步，这个时候就会进行锁消除。

能否进行锁消除主要判定依据来源于逃逸分析的数据支持。如果在一段代码中，堆上的所有数据都不可能逃逸出去被其他线程访问到，我们可以直接将它当作栈中的数据对待，认为它是线程私有的。这个时候JIT编译器就可以知道这个同步可以进行锁消除，在运行的时候就可以忽略同步了。

在Java中，很多的代码都不是开发者本身加的锁。在Java提供的类库中，`synchronized`关键字使用非常普遍，锁消除的机制也能够非常有效地提高运行效率。

## 锁粗化

锁粗化，简单来说就是让同步代码块包含更多代码，避免多次细小的操作一直频繁获取锁，提高了运行效率。

一般使用锁粗化是因为加锁实现在循环体中，导致一直在进行互斥同步操作；这个时候可以判断是否可以将锁进行粗化，把锁加在循环体外部，减少频繁的互斥同步操作。

## 实现synchronized编写优化

平常在使用synchronized代码块的时候，如何提高运行效率？

- 减少synchronized的范围
  - 同步代码块内部尽量短，让锁能够快速被释放，避免了锁一直被占有，减少了锁的竞争。
- 降低synchronized的锁的粒度
  - 将一个锁拆分成多个锁提高并发度，对比Hashtable和ConcurrentHashMap在jdk 1.8之前的区别。前者使用的是重量级锁，对于整个HashEntry数组都进行加锁，而后者使用的是基于Segment实现的分段锁。
  - Hashtable在执行多数操作的情况下都会加锁，加锁的时候对于整个Entry都会加锁，导致其他线程想要操作的时候只有等待锁释放，并发度很低，执行效率低下
  - ConcurrentHashMap对于get这种读操作并不加锁，在需要加锁的操作上，只会给操作的单个Segment加锁，对于其他节点来说，并不是加锁状态的。所以其他线程想要同时操作其他节点也是可行的，这样就减少了锁的粒度，提高了并发度。
- 读写分离
  - 读取操作不加锁，写入修改删除操作加锁，读取不影响数据的结果

> 参考资料：[Java面试热点问题，synchronized原理剖析与优化_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1aJ411V763?p=29&spm_id_from=pageDriver)

