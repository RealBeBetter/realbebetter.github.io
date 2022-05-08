---
title: 【Java】基础知识部分-网络编程
date: 2021-05-03
tags:
- Java
---
## 八、网络编程

### 概述

![image-20210525135210984](https://s2.loli.net/2022/04/06/gKCNlqFx1LU9P3E.png)

**网络编程**

- 在网络通信协议下，实现网络互连的不同计算机上运行的程序间可以进行数据交换

#### 网络编程三要素

![image-20210525135553182](https://s2.loli.net/2022/04/06/Ppae7F52RlKUShB.png)

#### IP地址

IP地址是网络中设备的唯一标识，IP地址分为两大类

![image-20210525135716104](https://s2.loli.net/2022/04/06/HoTjJzYvw1LG4rb.png)

**常用命令**

- `ipconfig`	用来查看本机IP地址相关信息
- `ping ip地址`	检查网络的连通信

**特殊地址**

`127.0.0.1`  回送地址，可以代表本机地址，一般用来测试使用

**`InetAddress`类**

为了方便网络编程，Java提供了`InetAddress`类用来获取IP地址

`InetAddress`类表示Internet协议（IP）地址

![image-20210525140730850](https://s2.loli.net/2022/04/06/RY81kNr75XGUlDz.png)

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

![image-20210525142344571](https://s2.loli.net/2022/04/06/hHKlDXbzQ2Wov8G.png)

![image-20210525142538654](https://s2.loli.net/2022/04/06/S8lh9qFxJvNnpkW.png)

**三次握手示意图**

![image-20210525142625268](https://s2.loli.net/2022/04/06/7dH3MtaTOmPKnkI.png)

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

![image-20210525150404039](https://s2.loli.net/2022/04/06/ONKGJPyvYItdCA2.png)

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
