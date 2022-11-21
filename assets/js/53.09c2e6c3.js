(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{649:function(t,a,s){"use strict";s.r(a);var n=s(11),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"【java】jvm内存回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#【java】jvm内存回收"}},[t._v("#")]),t._v(" 【Java】JVM内存回收")]),t._v(" "),s("h2",{attrs:{id:"safepoint检查"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#safepoint检查"}},[t._v("#")]),t._v(" SafePoint检查")]),t._v(" "),s("p",[t._v("Safepoint 可以理解成是在代码执行过程中的一些特殊位置，当线程执行到这些位置的时候，线程可以暂停。在 SafePoint 保存了其他位置没有的一些当前线程的运行信息，供其他线程读取。这些信息主要为线程上下文的任何信息，例如对象或者非对象的内部指针等等。一般这么理解 SafePoint，就是线程只有运行到了 SafePoint 的位置，他的一切状态信息，才是确定的，也只有这个时候，才知道这个线程用了哪些内存，没有用哪些内存；并且，只有线程处于 SafePoint 位置，这时候对 JVM 的堆栈信息进行修改，例如回收某一部分不用的内存，线程才会感知到，之后继续运行，每个线程都有一份自己的内存使用快照，这时候其他线程对于内存使用的修改，线程就不知道了，只有再进行到 SafePoint 的时候，才会感知。")]),t._v(" "),s("blockquote",[s("p",[t._v("安全点检查，确认当前线程的运行信息。")])]),t._v(" "),s("p",[t._v("GC 一定需要所有线程同时进入 SafePoint，并停留在那里，等待 GC 处理完内存，再让所有线程继续执。像这种"),s("strong",[t._v("所有线程进入 SafePoint 等待")]),t._v("的情况，就是 Stop The World。")]),t._v(" "),s("p",[t._v("在 SafePoint 位置保存了线程上下文中的任何东西，包括对象，指向对象或非对象的内部指针，在线程处于 SafePoint 的时候，对这些信息进行修改，线程才能感知到。所以，只有线程处于 SafePoint 的时候，才能针对线程使用的内存进行 GC，以及改变正在执行的代码。例如 OSR （On Stack Replacement，栈上替换现有代码为 JIT 优化过的代码）或者 Bailout（栈上替换 JIT 过优化代码为去优化的代码）。")]),t._v(" "),s("blockquote",[s("p",[t._v("参考资料：\n"),s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/161710652",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://zhuanlan.zhihu.com/p/161710652"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"safepoint的放置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#safepoint的放置"}},[t._v("#")]),t._v(" SafePoint的放置")]),t._v(" "),s("p",[t._v("openjdk 中，安全点的实现位于 openjdk/hotspot/src/share/vm/runtime/safepoint.cpp 中。")]),t._v(" "),s("p",[t._v("HotSpot 为例，什么地方可以放置 SafePoint 或者什么地方能放置 SafePoint？")]),t._v(" "),s("ol",[s("li",[t._v("理论上，在解释器的每条字节码的边界都可以放一个 safepoint，不过挂在 safepoint 的调试符号信息要占用内存空间，如果每条机器码后面都加 safepoint 的话，需要保存大量的运行时数据，所以要尽量少放置 safepoint，在 safepoint 会生成 polling 代码询问 VM 是否要“进入 safepoint”，polling 操作也是有开销的。")]),t._v(" "),s("li",[t._v("通过 JIT 编译的代码里，会在所有方法的返回之前，以及所有非 counted loop 的循环（无界循环）回跳之前放置一个 safepoint，为了防止发生 GC 需要 STW 时，该线程一直不能暂停。另外，JIT 编译器在生成机器码的同时会为每个 safepoint 生成一些“调试符号信息”，为 GC 生成的符号信息是 OopMap，指出栈上和寄存器里哪里有 GC 管理的指针。")])]),t._v(" "),s("blockquote",[s("p",[t._v("参考文档："),s("a",{attrs:{href:"https://blog.csdn.net/Candyz7/article/details/127526703",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/Candyz7/article/details/127526703"),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://blog.csdn.net/WZH577/article/details/109782827",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/WZH577/article/details/109782827"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("总结：")]),t._v(" "),s("ol",[s("li",[t._v("SafePoint 可以放置在每条字节码的边界，不过会带来较大开销；")]),t._v(" "),s("li",[t._v("在 JIT 编译的代码中，在所有方法返回之前以及无界循环回跳之前放置 SafePoint。")])]),t._v(" "),s("blockquote",[s("p",[t._v("无界循环，即不知道什么时候会跳出的循环。常见的有 "),s("code",[t._v("while(true)")]),t._v(" 、无跳出明确跳出条件的 "),s("code",[t._v("for")]),t._v(" 以及使用 "),s("code",[t._v("long")]),t._v(" 来表示循环次数等。比如：")])]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000000000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("在 java1.8.131 或者以上的版本, 在 JVM 运行参数中加上\n"),s("code",[t._v("-XX:+UseCountedLoopSafepoints")]),t._v(" 参数，可以强制在可数循环中创建安全点。这样的操作可以让所有线程提前进入安全点，触发碎片化的 GC 而不是累积变成 "),s("code",[t._v("full GC")]),t._v(" ，这样也是优化的手段。")]),t._v(" "),s("h2",{attrs:{id:"stw的机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stw的机制"}},[t._v("#")]),t._v(" STW的机制")]),t._v(" "),s("p",[t._v("线程在阻塞之前需要生成 OopMap（Ordinary object pointer Map，普通对象指针 Map）。没有 OopMap ，就需要扫描整个运行栈，查找根对象。OopMap 更像是一种空间换时间的策略，牺牲小部分的空间用来存储对象指针，避免了遍历扫描栈所带来的时间消耗。因为相比内存的价格，降低 GC 延时明显更重要。")]),t._v(" "),s("p",[t._v("在 STW 之前，要开启 SafePoint；若开启 SafePoint，则要将 polling_page 物理页属性变为不可读。在 Hotspot 中，有 "),s("code",[t._v("SafepointSynchronize::begin")]),t._v(" 函数，其中有一行代码 "),s("code",[t._v("os::_polling_page")]),t._v(" 。")]),t._v(" "),s("p",[t._v("如果 os::_polling_page 对应的物理页属性是可读的，这段代码并没什么特殊意义。但是如果是不可读的，读的时候就会触发段异常，对应的操作系统信号：SIGSEGV 。")]),t._v(" "),s("p",[t._v("JVM 捕获了这个 OS 异常，并进行了处理。所有的线程都是在这个地方 STW 的。")]),t._v(" "),s("blockquote",[s("p",[t._v("参考文档："),s("a",{attrs:{href:"https://www.jb51.net/article/235673.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.jb51.net/article/235673.htm"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("总结：")]),t._v(" "),s("ol",[s("li",[t._v("开启 SafePoint，修改 polling_page（轮询页）为物理不可读。")]),t._v(" "),s("li",[t._v("其他线程进入 SafePoint 会去读取 polling_page；")]),t._v(" "),s("li",[t._v("读取时会触发"),s("strong",[t._v("段异常")]),t._v("，对应的操作系统信号为 SIGSEGV；")]),t._v(" "),s("li",[t._v("JVM 捕获异常并进行处理，使线程阻塞在当前位置。")])]),t._v(" "),s("h2",{attrs:{id:"并发清除阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#并发清除阶段"}},[t._v("#")]),t._v(" 并发清除阶段")]),t._v(" "),s("p",[t._v("在 JDK 1.5 中，出现了** CMS （Concurrent 一Mark 一 Sweep）收集器**，这款收集器是 HotSpot 虚拟机中第一款真正意义上的并发收集器，它第一次实现了让垃圾收集线程与用户线程同时工作。CMS 收集器采用的是并发回收（非独占式）。")]),t._v(" "),s("p",[s("strong",[t._v("并发清除（ Concurrent一Sweep）阶段")]),t._v("：此阶段"),s("u",[t._v("清理删除掉标记阶段判断的已经死亡的对象")]),t._v("，释放内存空间。由于不需要移动存活对象，所以这个阶段也是可以与用户线程同时并发的。")]),t._v(" "),s("p",[t._v("CMS 采用的是 Mark Sweep 方式清除，会造成内存碎片，那么为什么不把算法换成 Mark Compact 呢？")]),t._v(" "),s("blockquote",[s("p",[t._v("因为当并发清除的时候，用 Compact 整理内存的话，原来的用户线程使用的内存还怎么用呢？要保证用户线程能继续执行，前提的它运行的资源不受影响嘛。Mark Compact 更适合“Stop the World”这种场景下使用。而 CMS 为了实现低延时，就会尽量避免 STW ，故采用 Mark Sweep 的方式。")])]),t._v(" "),s("p",[t._v("垃圾回收器的选择：")]),t._v(" "),s("ul",[s("li",[t._v("如果你想要最小化地使用内存和并行开销，请选Serial GC；")]),t._v(" "),s("li",[t._v("如果你想要最大化应用程序的吞吐量，请选Parallel GC；")]),t._v(" "),s("li",[t._v("如果你想要最小化GC的中断或停顿时间，请选CMS GC。")])]),t._v(" "),s("blockquote",[s("p",[t._v("参考文档：\n"),s("a",{attrs:{href:"https://blog.csdn.net/qq_51409098/article/details/126739012",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/qq_51409098/article/details/126739012"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"g1回收器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#g1回收器"}},[t._v("#")]),t._v(" G1回收器")]),t._v(" "),s("p",[t._v("因为 G1 是一个并行回收器，它把堆内存分割为很多不相关的区域（Region） （物理上不连续的）。使用不同的 Region 来表示 Eden、幸存者 0 区，幸存者 1 区，老年代等。")]),t._v(" "),s("p",[t._v("G1 GC 有计划地避免在整个 Java 堆中进行全区域的垃圾收集。G1 跟踪各个 Region 里面的垃圾堆积的价值大小（"),s("strong",[t._v("回收所获得的空间大小以及回收所需时间的经验值")]),t._v("），在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的 Region。")]),t._v(" "),s("p",[t._v("由于这种方式的侧重点在于回收垃圾最大量的区间（Region），所以我们给 G1 一个名字：垃圾优先（Garbage First） 。")]),t._v(" "),s("h2",{attrs:{id:"gc如何释放物理内存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gc如何释放物理内存"}},[t._v("#")]),t._v(" GC如何释放物理内存")]),t._v(" "),s("p",[t._v("GC 要想释放内存，必定需要通过 JVM 将 Java 应用的内存占用归还给 OS ，这样才能降低物理内存占用。")]),t._v(" "),s("blockquote",[s("p",[t._v("GC 执行标记完毕，下次分配内存的时候，就能够分配到被标记的地址。\n这属于非常惰性的操作，实际内存占用上并没有达到降低内存的效果。如果后续分配的内存比较少，那么内存将会迟迟得不到释放，影响性能。")])]),t._v(" "),s("p",[t._v("对于内存实际占用上，依赖于 JVM 的底层调用。")]),t._v(" "),s("blockquote",[s("p",[t._v("对象占用内存的清除，在应用和操作系统之间，还有个“内存二道贩子”，叫malloc。在应用释放内存之后（即 JVM 执行 GC 之后），就会触发 free 操作，但是 free 操作之后，内存也不一定就真的还给操作系统了，可能是还给内存二道贩子了。这样造成的后果就是实际占用的物理内存并没有降低。")])]),t._v(" "),s("p",[t._v("这些内存二道贩子的实现，常见的有 arena、glibc、ptmalloc、ptmalloc2、jemalloc 等。")]),t._v(" "),s("blockquote",[s("p",[t._v("glibc：高地址的内存没有被回收掉，低地址的内存不允许被回收。\njemalloc：是一个能够快速分配/回收内存，减少内存碎片，对多核友好，具有可伸缩性的内存分配器。")])]),t._v(" "),s("p",[t._v("JVM 在启动时保留内存并向操作系统请求额外的内存，直到达到配置的任何限制。它以"),s("strong",[t._v("块增量")]),t._v("的方式执行此操作，一次请求 MB 或更多内存，因为从 OS 逐字节请求内存效率非常低。")]),t._v(" "),s("blockquote",[s("p",[t._v("批量操作，思想类似于令牌桶。一次性请求批量，避免频繁请求触发系统调用。")])]),t._v(" "),s("p",[t._v("在 Java 中，如果需要手动操作，使用堆外内存，主要通过 Unsafe 类来实现。可以通过反射调用获取到 Unsafe 类并且调用 "),s("code",[t._v("unsafe.allocateMemory()")]),t._v(" 和 "),s("code",[t._v("unsafe.freeMemory()")]),t._v(" 方法。")]),t._v(" "),s("div",{staticClass:"language-cpp line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" os"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("malloc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("size\\_t size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" MEMFLAGS memflags"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" NativeCallStack"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" stack"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    u_char"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" ptr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    ptr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("u_char"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("malloc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("alloc_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//调用C++标准库函数 malloc(size)")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// we do not track guard memory")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" MemTracker"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("record\\"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("_malloc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("ptr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" memflags"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" stack"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" level"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br")])]),s("p",[t._v("主要底层就是 C++ 的标准库函数 "),s("code",[t._v("malloc")]),t._v(" 函数。")]),t._v(" "),s("p",[t._v("如果在使用 gdp dump 出内存信息之后，发现使用到了本地内存，而且不是用 unsafe 分配的本地内存，那么就可以判断是自行调用了 C 库来分配内存。")]),t._v(" "),s("blockquote",[s("p",[t._v("参考文档：\n"),s("a",{attrs:{href:"https://blog.csdn.net/u012804784/article/details/123124325",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/u012804784/article/details/123124325"),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://blog.csdn.net/weixin_70730532/article/details/124734986",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/weixin_70730532/article/details/124734986"),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://www.codenong.com/54267714/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.codenong.com/54267714"),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://blog.csdn.net/xmtblog/article/details/118004663",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/xmtblog/article/details/118004663"),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"http://t.csdn.cn/SD5BW",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://t.csdn.cn/SD5BW"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"java加载so解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#java加载so解决方案"}},[t._v("#")]),t._v(" Java加载so解决方案")]),t._v(" "),s("p",[t._v("SO 文件就是动态链接库，都是 C/C++ 编译出来的。与 Java 比较它通常是用的 Class 文件（字节码）。")]),t._v(" "),s("p",[t._v("通过 Java 函数 System.load 进行全局静态的 so 加载/卸载。业务场景有对 so 实现动态加载/替换的需求，但 Java 并没有直接动态加载 so 的机制。")]),t._v(" "),s("p",[t._v("在 System.load 以及 ClassLoader.java 中：")]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("NativeLibrary")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Class")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" fromClass"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" isBuiltin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fromClass "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fromClass"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isBuiltin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" isBuiltin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("没法通过 System.load() 重复加载同名 so 或者直接动态替换 so，也没法在 Java 层拿到 dlopen 返回的句柄，所以我们没法在 Java 代码层实现 so 的动态加载。还有一种做法是先卸载 (System.unload) ，再加载 (System.load) ，但这个过程不是无损的。")]),t._v(" "),s("blockquote",[s("p",[t._v("实现动态加载，可以参考："),s("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1005860?from=15425",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://cloud.tencent.com/developer/article/1005860?from=15425"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("JVM 支持启动的时候用环境变量来指定内存分配的 so 文件。为了实现修改 Java 使用的内存管理库函数，我们可以拿到指定需要的库函数，打包成 so 文件，最后在 SystemPath 中链接上，修改启动参数即可。")]),t._v(" "),s("div",{staticClass:"language-xml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("dependency")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("groupId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("xxx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("groupId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("artifactId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("engine"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("artifactId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("1.0"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("scope")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("system"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("scope")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("systemPath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    ${pom.basedir}/lib/xxx.jar\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("systemPath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("dependency")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br")])]),s("p",[t._v("启动参数，我们需要指定为 "),s("code",[t._v("java -Djava.ext.dirs=./lib -jar target/xxx.jar")]),t._v(" 。这样就完成了 so 文件引入了本地 jar 包，使用指定库函数完成了默认函数的替换。")]),t._v(" "),s("blockquote",[s("p",[t._v("参考资料：\n"),s("a",{attrs:{href:"https://www.likecs.com/show-204352481.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.likecs.com/show-204352481.html"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"os最大支持的内存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#os最大支持的内存"}},[t._v("#")]),t._v(" OS最大支持的内存")]),t._v(" "),s("p",[t._v("最大支持内存和操作系统有直接关系，即使是 64 位处理器，使用 32 位操作系统支持的内存也最多为 2 的 32 次方，就是 4G。在 Windows32 位操作系统中最大只识别 3、25 到 3、 75 之间，根据 Windows 版本不同而不同，而 64 位操作系统的寻址能力就是 2 的 64 次方。也就是 17179869184G。只是理论值，实际中不会用到这么大的内存。")]),t._v(" "),s("p",[t._v("这指的是 OS 理论上支持的内存值，包括 Virtual RAM 。")]),t._v(" "),s("h2",{attrs:{id:"java中虚拟内存和实际内存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#java中虚拟内存和实际内存"}},[t._v("#")]),t._v(" Java中虚拟内存和实际内存")]),t._v(" "),s("p",[t._v("使用 Top 命令，可以查看 Java 应用内存占用，有 VIRT 和 RES 两项。")]),t._v(" "),s("ul",[s("li",[t._v("VIRT 是虚拟内存空间：虚拟内存映射中所有内容的总和。它在很大程度上是没有意义的。")]),t._v(" "),s("li",[t._v("RES 是驻留集大小：当前驻留在 RAM 中的页数。在几乎所有情况下，这是\t在说“太大”时应该使用的唯一数字。但这仍然不是一个很好的数字，尤其是在谈到 Java 时。")])]),t._v(" "),s("blockquote",[s("p",[t._v("参考文档："),s("a",{attrs:{href:"http://events.jianshu.io/p/169f84d933a7",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://events.jianshu.io/p/169f84d933a7"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"虚拟内存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#虚拟内存"}},[t._v("#")]),t._v(" 虚拟内存")]),t._v(" "),s("p",[t._v("进程消耗的虚拟内存是进程内存映射中所有内容的总和。这包括数据（例如，Java 堆），还包括程序使用的所有共享库和内存映射文件。在 Linux 上，您可以使用 "),s("code",[t._v("pmap")]),t._v(" 命令查看映射到进程空间的所有内容。")]),t._v(" "),s("p",[t._v("虚拟内存是一种在不扩大实际内存容量的情况下，让内存看上去能放下更多程序的方法。这是怎么做到的？")]),t._v(" "),s("p",[t._v("在虚拟内存技术出现之前是将完整的程序从外存（如磁盘）读入内存中，但是现在虚拟内存不这么做，虚拟内存技术将一个完整的程序切割成多份，当 CPU 要执行这个程序时，内存先把该程序的第一份送入 CPU，然后马上又问磁盘拿同一个程序的第二份内容，然后再送入 CPU。这样做就使得内存中可以出现更多的程序头（程序的第一份），而不是一个完整的程序占满整个内存。")]),t._v(" "),s("p",[t._v("说到这里其实还没讲到虚拟内存最精髓的地方，“虚”到底虚在哪？虚拟内存和实际内存都存储着多个程序头（被切割出来的第一份），但是虚拟内存胆子很大，他敢记录实际物理内存中没有记录的程序头。所以在容量上看，虚拟内存比实际物理内存要大很多，“虚”就是“比实际更多”的意思。你可能觉得很奇怪，虚拟内存表里记录了在实际物理内存不存在的程序头，那 CPU 是怎么从实际物理内存中读到不存在的程序头的？这个简单，CPU 只会盯着虚拟内存表看，不会再管实际物理内存里有什么，当 CPU 在虚拟内存表里调用了一个在实际物理内存中不存在的程序头时，物理内存马上去外存（磁盘）里找这个程序头，然后把物理内存中不常运行的程序头踢出去（后台应用被 kill），将 CPU 需要的程序头放到这个空的位置上，供 CPU 使用。另一种情况是如果 CPU 要使用的程序头刚好实际物理内存里有，那就直接用。")]),t._v(" "),s("blockquote",[s("p",[t._v("参考文档："),s("a",{attrs:{href:"https://blog.csdn.net/weixin_42243865/article/details/122493634",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/weixin_42243865/article/details/122493634"),s("OutboundLink")],1)])]),t._v(" "),s("ol",[s("li",[t._v("虚拟内存存储程序头，使有限的物理内存能启用更多的应用；")]),t._v(" "),s("li",[t._v("CPU 只监听虚拟内存表，查看程序头实际存储位置，决定是从外存（磁盘）还是内存（RAM）中读取程序头。")]),t._v(" "),s("li",[t._v("如果程序头不在物理内存中，需要由物理内存根据程序头内容，从磁盘中获取并且读入 RAM 中。若此时内存不够，则会淘汰内存中不常运行的程序头。")])]),t._v(" "),s("blockquote",[s("p",[t._v("全文记录于 2022-11-20。")]),t._v(" "),s("p",[t._v("在 11-19 时与 "),s("strong",[t._v("@Slowlysee")]),t._v(" 探讨（单方面教学） 之后，系统性学习了相关的知识，记录了其中的关键与难点问题。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);