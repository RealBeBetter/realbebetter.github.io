---
title: 【测试】JMeter性能测试
date: 2022-10-20 20:31:02
tags:
- Java
- Test
---


## 性能测试

常用的性能测试方法有：基准测试、压力测试、负载测试、并发测试、疲劳测试、数据量测试、配置测试。

1. 基准测试（Benchmark Test，BMT），指通过设计科学的测试方法、测试工具和测试系统，实现对一类测试对象的某项性能指标进行定量的和可对比的测试，主要目的是检验系统性能与相关标准的符合程度。
2. 压力测试：是指通过对软件系统不断施加压力，识别系统性能拐点，进而获得系统提供的最大服务级别的测试活动。主要目的是检查系统处于压力情况下应用的表现。
3. 负载测试：是对软件系统不断增加并发访问压力，直到系统的一些性能指标达到极限。主要目的是找到特定环境下系统处理能力的极限。
4. 并发测试：指当测试多用户并发访问同一个应用、模块、数据时是否产生隐藏的并发问题，如内存泄露、线程锁、资源征用问题。并发测试的目的是为了发现并发引起的问题。
5. 疲劳测试：指让软件系统在一定访问量的情况下长时间运行，以检验系统在多长时间后会出现明显下降。这种测试旨在发现系统性能是否会随着运行时间的延长而发生性能下降，从而找到系统是否存在性能隐患，以验证系统运行的可靠性。
6. 数据量测试：通过让软件在不同数据量情况下运行，检验系统性能在各种数据量情况下的表现，找到支持系统正常工作的数据量极限。数据量测试的目标分为两种：一种是指识别系统的性能指标达到极限的情况下，系统能够支持的最大数据量情况；另一种指验证系统在各种数据量的情况下，系统具有的性能指标情况。
7. 配置测试：指通过被测试的软/硬件环境的调整，了解各种不同环境对系统性能影响的程度，从而找到系统各项资源的最优分配原则。主要目的是了解各种不同因素对系统性能影响的程度，从而判断出最值得进行的调优操作。

## 性能测试工具

**主流性能测试工具：LoadRunner、Jmeter**
1、 LoadRunner，是一种预测系统行为和性能的负载测试工具。通过模拟上千万用户实施并发负载及实时性能监测的方式来确认和查找问题，LoadRunner能够对整个企业架构进行测试。企业使用LoadRunner能最大限度地缩短测试时间，优化性能和加速应用系统的发布周期。
LoadRunner可适用于各种体系架构的自动负载测试，能预测系统行为并评估系统性能。
2、Apache JMeter是Apache组织开发的基于Java的压力测试工具。用于对软件做压力测试，它最初被设计用于Web应用测试，但后来扩展到其他测试领域。 它可以用于测试静态和动态资源，例如静态文件、Java 小服务程序、CGI 脚本、Java 对象、数据库、FTP 服务器， 等等。JMeter 可以用于对服务器、网络或对象模拟巨大的负载，来自不同压力类别下测试它们的强度和分析整体性能。另外，JMeter能够对应用程序做功能/回归测试，通过创建带有断言的脚本来验证你的程序返回了你期望的结果。为了最大限度的灵活性，JMeter允许使用正则表达式创建断言。
Apache JMeter 可以用于对静态的和动态的资源（文件，Servlet，Perl 脚本，Java 对象，数据库和查询，FTP服务器等等）的性能进行测试。它可以用于对服务器、网络或对象模拟繁重的负载来测试它们的强度或分析不同压力类型下的整体性能。你可以使用它做性能的图形分析或在大并发负载测试你的服务器/脚本/对象。

## 性能测试方法

> 参考文档：[如何用Jmeter做接口性能测试](https://zhuanlan.zhihu.com/p/402088248)

前置条件：

- 安装 JMeter ，完成解压。

一、打开 ApacheJMeter
![image.png](https://img-blog.csdnimg.cn/img_convert/0aa988d1d13c6be4398d6115891b65dd.png)
二、新建测试计划
![image.png](https://img-blog.csdnimg.cn/img_convert/a3f46d993035bbfd8180f6ee1098d06c.png)
三、创建线程组
![image.png](https://img-blog.csdnimg.cn/img_convert/165634fe29f9289958ab5376785eec2a.png)
![image.png](https://img-blog.csdnimg.cn/img_convert/ea3968578a09b60358d036e5d5a62b1b.png)
四、选中线程组，创建 HTTP 取样器
![image.png](https://img-blog.csdnimg.cn/img_convert/aeb40081e46d0bb431790ddb8602b16a.png)
![image.png](https://img-blog.csdnimg.cn/img_convert/d0bd90d3c5224f513e9e59af7e425868.png)
五、选择线程组，创建统一随机定时器

> 这一项表示的是线程会在多久的时间间隔中启动并访问。

![image.png](https://img-blog.csdnimg.cn/img_convert/bddd6d7bfaf9b47dbd05354e1e8b6508.png)
![image.png](https://img-blog.csdnimg.cn/img_convert/18b8b45e65d44a33d95bfda6b011cc98.png)
六、创建聚合报告
![image.png](https://img-blog.csdnimg.cn/img_convert/7faada46d7dad219decb331d49d7c835.png)
![image.png](https://img-blog.csdnimg.cn/img_convert/392848504fb6de6e02290036b5f0083a.png)
聚合报告包含了吞吐量、异常等指标。
