(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{653:function(t,s,v){"use strict";v.r(s);var a=v(11),_=Object(a.a)({},(function(){var t=this,s=t.$createElement,v=t._self._c||s;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"三、垃圾回收"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三、垃圾回收"}},[t._v("#")]),t._v(" 三、垃圾回收")]),t._v(" "),v("h3",{attrs:{id:"如何判断对象可以回收"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#如何判断对象可以回收"}},[t._v("#")]),t._v(" 如何判断对象可以回收")]),t._v(" "),v("h4",{attrs:{id:"引用计数法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#引用计数法"}},[t._v("#")]),t._v(" 引用计数法")]),t._v(" "),v("p",[t._v("判断对象被引用的次数，看对象是否可以被回收。但是根据下面的互相调用的情况，此时A、B两对象互相引用，且引用次数为1的话，则不能根据引用次数对其进行垃圾回收（因为互相引用），但是长时间不对这两者对象进行垃圾回收，则会导致内存泄漏，长时间存在内存得不到释放的情况，所以引用计数法存在一定的弊端。在实际的虚拟机中，一般需要采用下面的可达性分析算法。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/gnwZKX5HJf1t9je.png",alt:"image-20210315221109421"}})]),t._v(" "),v("h4",{attrs:{id:"可达性分析算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#可达性分析算法"}},[t._v("#")]),t._v(" 可达性分析算法")]),t._v(" "),v("p",[t._v("在此算法中，我们将那些一定不能被垃圾回收的对象称之为“根对象”。在进行垃圾回收之前，会对类中所有的对象进行一次扫描，看看其中的对象是否会被其中的根对象直接或间接引用。如果有引用，则该对象不能被垃圾回收，由于根对象的绑定关系，会导致该对象有需要被引用的可能，故不能被垃圾回收；反之，如果对象没有被根对象直接或间接引用，则该对象存在被垃圾回收的可能性。")]),t._v(" "),v("p",[t._v("以上这个过程被称之为可达性分析算法。但是，如何确定根对象（GC Root）？")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/gnwZKX5HJf1t9je.png",alt:"image-20210315221925229"}})]),t._v(" "),v("p",[t._v("要找到GC Root对象，我们需要借助一个Eclipse提供的工具——Memory Analyzer，简称MAT。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/tHvbFRABSuzn6gd.png",alt:"image-20210315222123950"}})]),t._v(" "),v("p",[t._v("具体操作步骤：")]),t._v(" "),v("p",[t._v("先找出Java程序的进程ID，之后输入相关参数，生成二进制文件，抓取程序进程快照，之后利用工具打开生成的二进制文件 进行分析。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/nGKNPOU9cZQagkj.png",alt:"image-20210315222652264"}})]),t._v(" "),v("p",[t._v("MAT工具打开文件之后，操作界面如下所示：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/Ls2VNZfG6oYWmcI.png",alt:"image-20210315222616032"}})]),t._v(" "),v("p",[t._v("GC Roots显示的界面如下所示：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/Ls2VNZfG6oYWmcI.png",alt:"image-20210315222811764"}})]),t._v(" "),v("p",[t._v("可知当前一共有641个对象。其中，System Class为系统核心类，不能被回收掉。")]),t._v(" "),v("p",[t._v("实际上的分析，只需要看主线程中的对象，查看哪些本地变量是GC Root对象，不能被回收。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/VUZaw6nQx4tABFg.png",alt:"image-20210315225047576"}})]),t._v(" "),v("h4",{attrs:{id:"四种引用"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#四种引用"}},[t._v("#")]),t._v(" 四种引用")]),t._v(" "),v("p",[t._v("实际上常用的一共有五种引用。分别为：强引用、弱引用、软引用、虚引用、终结器引用。")]),t._v(" "),v("p",[t._v("引用示例图：（其中，实线表示强引用）")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/wyoFNDTlvgPAEMX.png",alt:"image-20210315225321919"}})]),t._v(" "),v("p",[t._v("①只有当一个对象与其相连的所有强引用都断开，才能被垃圾回收。②当连接A2对象的强引用断开之后，若执行垃圾回收之后仍然发现内存不够用的时候，才会继续垃圾回收掉A2对象，也就是软引用的对象。③当指向A3对象的强引用断开之后，只要发生了垃圾回收，不管内存是都宽裕，A3（弱引用对象）都会被回收掉。④当软引用连接的对象（A2）被垃圾回收之后，软引用本身也已经成为了一个对象，这个时候会进入引用队列。同时，弱引用同理；二者在连接的对象被垃圾回收之后，都会进入引用队列。这是因为软引用和弱引用他们本身也需要占用一定的内存。如果想要对软引用和弱引用他们本身进行垃圾回收处理，可以借助引用队列找到他们，并做进一步的处理（遍历二者进行内存释放，相当于断开GC Root对象对他们的强引用，进行垃圾回收）。")]),t._v(" "),v("p",[v("strong",[t._v("虚引用和终结器引用")])]),t._v(" "),v("p",[t._v("此两者必须配合引用队列使用。当虚引用引用的对象被垃圾回收之后，虚引用就会被放入引用队列，从而间接地用一个线程来调用虚引用的方法，使用 "),v("code",[t._v("unsafe.freeMemory()")]),t._v("来释放直接内存。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/BGaH3LvRo52cPY9.png",alt:"image-20210316100614853"}})]),t._v(" "),v("p",[t._v("终结器引用：所有的Java对象都继承自Object父类，Object父类有一个"),v("strong",[t._v("finalize()"),v("strong",[t._v("方法。当A4对象的强引用被断开之后，将终结器引用放入引用队列中，然后由一个 "),v("strong",[t._v("优先级很低的线程去检查引用队列中是否存在终结器引用，如果存在终结器引用，则调用完A4的finalize方法，等调用结束，就可以等待下一次进行垃圾回收。"),v("strong",[t._v("其中，终结器引用效率很低：第一次回收时还不能真正的将其回收，需要二次进行回收；其次，要将终结器引用进行入队操作；再者，检测终结器引用的线程优先级很低，被执行的机会很少，可能会导致连接的方法的")]),t._v("finalize")]),t._v("方法迟迟得不到调用，无法结束自身的生命周期，所以导致该对象（A4）存在的生命周期中一直占用内存，短期内得不到释放。所以一般不推荐使用")]),t._v("finalize")]),t._v("方法释放内存。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/06/7mUKf6LXB3QM4oa.png",alt:"image-20210316100953578"}})]),t._v(" "),v("h4",{attrs:{id:"引用的特点"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#引用的特点"}},[t._v("#")]),t._v(" 引用的特点")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/pJ15kMPSlxwsLhQ.png",alt:"image-20210316101816306"}})]),t._v(" "),v("p",[v("strong",[t._v("软引用（SoftReference）")])]),t._v(" "),v("p",[t._v("强引用和软引用的代码案例区别：其中，注释的部分即强引用；其余部分为软引用。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/CGf6UMghJuRWay4.png",alt:"image-20210316102126304"}})]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/uUFWyVAdf9inBkl.png",alt:"image-20210316102733574"}})]),t._v(" "),v("p",[t._v("当软引用使用不到的时候，需要使用引用队列对软引用实现释放。使用**ReferenceQueue"),v("E",[t._v("**创建引用队列对象，对其进行软引用释放内存。其中，引用队列的泛型需要和软引用的泛型一致。之后，再使用软引用的时候还需要关联引用队列，在上述代码对应位置改成"),v("code",[t._v("new byte[_4MB], queue")]),t._v("，关联之后，当软引用引用的对象被引用之后，对象需要回收时，会将软引用本身也加入到queue中去。整个过程，代码示例如下：")])],1),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/7HDJutBdExaLpCI.png",alt:"image-20210316103459904"}})]),t._v(" "),v("p",[v("strong",[t._v("弱引用（WeakReference）")])]),t._v(" "),v("p",[t._v("当弱引用连接的对象仅有弱引用时，垃圾回收时，无论内存是否充足，都会将弱引用所引用的对象进行垃圾回收。同样，也可以配合垃圾引用队列进行垃圾回收弱引用本身。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/ody7qHI1wKZ8EaC.png",alt:"image-20210316105520329"}})]),t._v(" "),v("h3",{attrs:{id:"垃圾回收算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收算法"}},[t._v("#")]),t._v(" 垃圾回收算法")]),t._v(" "),v("h4",{attrs:{id:"标记清除-mark-sweep"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#标记清除-mark-sweep"}},[t._v("#")]),t._v(" 标记清除（Mark Sweep）")]),t._v(" "),v("p",[t._v("顾名思义，标记清楚就是标记和清除两个步骤。第一个步骤，先标记可以被垃圾回收的对象（或者说需要被垃圾回收的对象）。这个步骤的思路：沿着GC Root的对象，从头到尾遍历所有对象，连着GC Root的对象则为强引用，不可被垃圾回收，其余的则根据情况进行标记，等待下一个步骤——清除。第二个步骤，清除标记的对象，将所有被标记的、可以被回收的对象进行垃圾回收。")]),t._v(" "),v("p",[t._v("其中，实现的细节问题：清除的步骤不是将对象的每个字节进行清零操作，而是将对象占用内存的起始地址记录在一个"),v("strong",[t._v("空闲的地址链表")]),t._v("中。下次分配新的对象时，可以直接从空闲的地址链表中找，如果有足够的地址空间容纳这个对象，则为该对象分配空闲的地址空间。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/pwUtanAMOFHGY8C.png",alt:"image-20210316105732003"}})]),t._v(" "),v("p",[t._v("标记清除的优缺点：")]),t._v(" "),v("p",[t._v("优：标记清除的速度快，只需要对需要被垃圾回收的对象空间的起始地址做记录即可，所以标记清除的速度快。")]),t._v(" "),v("p",[t._v("缺：容易产生内存碎片。因为记录的是原对象的起始地址，原地址被标记记录之后，不会对地址空间进行整理，所以在对新对象进行地址分配的时候，容易造成内存的使用的不连续，导致大量空闲空间无法得到使用，造成内存使用的不充分不连贯。（页内碎片）")]),t._v(" "),v("h4",{attrs:{id:"标记整理-mark-compact"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#标记整理-mark-compact"}},[t._v("#")]),t._v(" 标记整理（Mark Compact）")]),t._v(" "),v("p",[t._v("标记整理算法，相比于之前的标记清除算法，在第二个清除的步骤中，不只是简单的清除，而是将清除之后不连续的内存空间进行整理，最后使得余留下来的对象占据的还是连续的内存空间。")]),t._v(" "),v("p",[t._v("标记整理的优缺点：")]),t._v(" "),v("p",[t._v("优：相较于标记清除，不会产生内存碎片。")]),t._v(" "),v("p",[t._v("缺：由于涉及对象空间的移动，使得整个过程更加复杂繁琐。内存区块的拷贝移动、内存地址的改变等，这些问题更加复杂，需要更多的工作量，所以速度更慢。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/eL1PO3bcWVwdX24.png",alt:"image-20210316111207763"}})]),t._v(" "),v("h4",{attrs:{id:"复制-copy"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#复制-copy"}},[t._v("#")]),t._v(" 复制（Copy）")]),t._v(" "),v("p",[t._v("复制算法，首先将GC Root的强引用对象赋值到TO区域中；其次，将FROM中的所有需要垃圾回收的对象进行垃圾回收；之后，交换FROM和TO的位置；最终，垃圾回收完成。演示步骤如下：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/TNk5MeYqQdW3RLP.png",alt:"image-20210316111722361"}})]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/yjskciz1oeKxE8F.png",alt:"image-20210316111752713"}})]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/bqUkSEOAsHJIxdM.png",alt:"image-20210316111813417"}})]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/SfjpeNR9M2vQVXh.png",alt:"image-20210316111841962"}})]),t._v(" "),v("p",[t._v("复制算法的优缺点：")]),t._v(" "),v("p",[t._v("优：不会产生内存碎片，最终形成连贯的空闲空间。")]),t._v(" "),v("p",[t._v("缺：在进行垃圾回收的时候，会占用双倍的内存空间，且工作量也比较大。")]),t._v(" "),v("h4",{attrs:{id:"总结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),v("p",[v("strong",[t._v("标记清除算法")]),t._v("（Mark Sweep）")]),t._v(" "),v("ul",[v("li",[t._v("速度较快")]),t._v(" "),v("li",[t._v("会造成内存碎片")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/vFaJfULtng4dqKC.png",alt:"image-20210923221052461"}})]),t._v(" "),v("p",[v("strong",[t._v("标记整理算法")]),t._v("（Mark Compact）")]),t._v(" "),v("ul",[v("li",[t._v("速度慢")]),t._v(" "),v("li",[t._v("没有内存碎片")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/ink6O1jRrf4vNEe.png",alt:"image-20210923221136091"}})]),t._v(" "),v("p",[v("strong",[t._v("复制算法")]),t._v("（Copy）")]),t._v(" "),v("ul",[v("li",[t._v("不会有内存碎片")]),t._v(" "),v("li",[t._v("需要占用双倍内存空间")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/uIFVoCaSbQmX8rO.png",alt:"image-20210923221219180"}})]),t._v(" "),v("h3",{attrs:{id:"分代回收"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分代回收"}},[t._v("#")]),t._v(" 分代回收")]),t._v(" "),v("p",[t._v("垃圾回收中，有新生代、老年代、伊甸园（Eden）、幸存区（FROM）、幸存区（TO）的概念。")]),t._v(" "),v("p",[t._v("我们一般将需要长时间使用的对象放在老年代中，把那些用完即丢的对象放在新生代中。针对不同对象的生命周期，为他们制定不同的垃圾回收策略。这就是创造分代回收的原因。")]),t._v(" "),v("p",[t._v("首先，新生代的结构如下所示：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/PdUqDuyrw4RpmYB.png",alt:"image-20210316193626706"}})]),t._v(" "),v("p",[t._v("我们将每次新创建的对象存放在伊甸园中。但是，新生代中伊甸园的内存是有限的，当伊甸园的内存不够时，便会触发新生代的一次垃圾回收，回收处理伊甸园中的垃圾，此次垃圾回收称之为"),v("strong",[t._v("Minor GC")]),t._v("。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/cC9aihAIGMlJHus.png",alt:"image-20210316193836146"}})]),t._v(" "),v("p",[t._v("此次垃圾回收，利用复制算法，将幸存的对象放入幸存区TO中，并将这些对象的生命周期进行"),v("code",[t._v("+1")]),t._v("的操作，表示这些对象已经经历了一次垃圾回收，但是幸存下来，并没有被回收掉。然后根据复制算法，将"),v("code",[t._v("From")]),t._v("和"),v("code",[t._v("To")]),t._v("的位置交换，完成一次垃圾回收。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/MTzlG6Pi2BK7Ymb.png",alt:"image-20210316194208238"}})]),t._v(" "),v("p",[t._v("此时上图中被标记的对象就会被"),v("strong",[t._v("Minor GC")]),t._v("回收掉。第二过程中，等到伊甸园中的对象再次内存不足时，就会再次出发Minor GC进行垃圾回收。但是，"),v("strong",[t._v("此次Minor GC不光要扫描伊甸园中的对象，还需要对之前幸存区From中的对象进行扫描，看是否存在需要被垃圾回收的对象")]),t._v("。最终幸存的对象生命周期"),v("code",[t._v("+1")]),t._v("，放在幸存区From中。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/AOTEwD81BoQn6zq.png",alt:"image-20210923220800244"}})]),t._v(" "),v("p",[t._v("在经历了第二轮的Minor GC之后，可能的对象存活情况如下：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/IJfEW86hR95oKFv.png",alt:"image-20210316194701454"}})]),t._v(" "),v("p",[t._v("在经历多次Minor GC之后，可能存在一些对象的生命周期变得比较长（超过一定阈值），这个时候就出现了"),v("strong",[t._v("晋升")]),t._v("——将这些生命周期较长的对象存放在老年代区（最大生命周期是15——4bit（1111））。因为老年代发生GC的频率相对新生代来说较低，所以生存周期更长的对象放在老年代区能够减少扫描的次数，提高一定的工作效率。")]),t._v(" "),v("p",[t._v("但是，当新生代的伊甸园以及From区、老年代区都无法存放下新生成的对象时，这个时候就会触发一次"),v("strong",[t._v("Full GC")]),t._v("。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/qdWAl7FRBCfcuYe.png",alt:"image-20210316195135537"}})]),t._v(" "),v("p",[t._v("分代垃圾回收的一些特点：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/UkNPBoz6nOK9a2p.png",alt:"image-20210923220518591"}})]),t._v(" "),v("ul",[v("li",[t._v("对象首先分配在伊甸园区域")]),t._v(" "),v("li",[t._v("新生代空间不足时，触发minor gc，伊甸园和from存活的对象使用copy复制到to中，存活的对象年龄加一并且交换from和to")]),t._v(" "),v("li",[t._v("minor gc会引发stop the world，暂停其它用户的线程，等垃圾回收结束，用户线程才恢复运行")]),t._v(" "),v("li",[t._v("当对象寿命超过阈值时，会晋升至老年代，最大寿命是15 (4bit)")]),t._v(" "),v("li",[t._v("当老年代空间不足，会先尝试触发minor gc，如果之后空间仍不足，那么触发full gc，STW的时间更长")])]),t._v(" "),v("h4",{attrs:{id:"相关参数"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#相关参数"}},[t._v("#")]),t._v(" 相关参数")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2022/04/07/wEBVuIP9KRqjMc5.png",alt:"image-20210316200552034"}})])])}),[],!1,null,null,null);s.default=_.exports}}]);