---
title: 【项目】学生考试系统
date: 2020-12-29 23:00:26
tags:
- Project
---

**阅前注意**

> 系统中所有密码均已默认设置为123456
>
> 开发时使用的Java版本为JDK 14.0.1
> 使用的开发工具为 IntelliJ IDEA Community 2019.2
> 数据库为MySQL 8.0.22.0
> 已在Windows10下通过测试

## 一、数据库设计

- 数据库
  
  - 考试系统 **ExamSystem**
  
- 数据表

  - 学生表 **STUDENT**

    - ```mysql
        create table student
        (
            sname varchar(10) not null,				 -- 姓名
            sno varchar(20) primary key not null,  	 -- 学号
            password varchar(20) not null,	  		 -- 密码
            ssex varchar(4) not null,				 -- 性别
            sage varchar(4) not null,				 -- 年龄
            major varchar(10) not null,				 -- 专业
            department varchar(10) not null			 -- 系别
        );
        ```

  - 教师表 **TEACHER**

    - ```mysql
    create table teacher
      (
          tno varchar(20) not null primary key, 		-- 教师工号
          password varchar(20) not null,				-- 教师密码
          tname varchar(10) not null,					-- 教师姓名
          tsex varchar(4) not null					-- 教师性别
      );
      ```
    
  - 学生课程表 **SC**

    - ```mysql
      create table sc
      (
          sno varchar(20) not null primary key,		-- 学生学号
          score int not null,							-- 课程得分
          foreign key(sno) references student(sno)
      );
      ```
    
  - 题目答案表 **TEST**

    - ```mysql
      create table test
      (
          num int primary key,	  				  -- 题目号码
          question varchar(500) not null,    		  -- 题目文本
          answer varchar(10) not null			      -- 标准答案
      );
      ```

  - 管理员表 **ADMINISTRATOR**

    - ```mysql
      create table administrator
      (
          password varchar(20) not null            -- 管理员密码
      )comment = '后期使用JDBC时候，不允许添加';
      ```

创建数据库代码：

```mysql
create database examsystem;
use examsystem;

create table student
(
    sname varchar(10) not null,				
    sno varchar(20) primary key not null,  
    password varchar(20) not null,	  		 
    ssex varchar(4) not null,				
    sage varchar(4) not null,				
    major varchar(10) not null,				 
    department varchar(10) not null			 
);

create table teacher
(
    tno varchar(20) not null primary key, 		
    password varchar(20) not null,				
    tname varchar(10) not null,					
    tsex varchar(4) not null					
);

create table sc
(
    sno varchar(20) not null primary key,		
    score int not null,							
    foreign key(sno) references student(sno),
);

create table test
(
    num int primary key,	  		
    question varchar(500) not null,    		
    answer varchar(10) not null			    
);

create table administrator
(
    password varchar(20) not null         
);
```

## 二、逻辑设计

整个考试系统应该结合实际情况来，先让考生登录自己的账号。

之后进入考试系统，答题，系统判断答题情况，打分。

记录学生分数，提供查询通道。

**实现功能顺序**  V1.0

- [x] 学生输入学号密码进行登录
- [x] 系统按照顺序出题
- [x] 学生答题同时开始考试倒计时
- [x] 学生提交答案
- [x] 系统批改试卷
- [x] 成绩上传至数据库
- [x] 学生成绩展示

**实现功能顺序** V2.0

- [x] 用户选择身份   **SelectIdentity**     
  - [x] 用户为学生，选择学生注册/登录 【选做：添加回到上一级菜单】 **StudentSelect**   
    - [x] 学生注册，存储学生信息  **StudentRegister**
    - [x] 学生登录，登录成功则开始考试答题【选做：可以提供更改密码功能】**StudentLogin**
      - [x] 学生答题同时开始考试倒计时  **MainView**  **Countdown**
      - [x] 学生提交答案或者倒计时结束自动提交答案  **MainView**  **showScore**
      - [x] 答案批改，并将成绩上传数据库，同时予以前台展示  **showScore**
  - [x] 用户选择为教师，需要输入管理员密码验证身份  **CheckIdentity**
    - [x] 教师选择注册/登录 **TeacherSelect**
      - [x] 教师注册，需要输入管理员密码来验证身份【选做：可加入管理员密码修改功能】 **TeacherRegister**
      - [x] 教师登录，登录之后可选相应的功能【选做：可以提供更改密码功能】**TeacherLogin**
        - [x] 教师信息展示  **TeacherView**
        - [x] 教师可以修改学生分数、查询学生分数、添加题目【选做：修改分数需要留下日志】**TeacherView**

**程序运行逻辑顺序**

- 用户选择身份--> 学生/教师
  - 学生选择注册/登录 （同时关闭选择页面）
    - 注册-->输入各项信息，注册成功，进入登录界面（同时关闭注册页面）
    - 登录--> 登录成功，进入考试主页面（同时关闭登录页面）
      - 考生开始答题，结束的时候计算成绩，弹出成绩
  - 教师身份验证-->输入管理员密码（防止学生进入后台进行操作）-->正确即可选择注册/登录
    - 注册--> 输入信息成功注册，进入登录界面
    - 登录-->进入教师主页面，可以选择查询成绩/修改成绩/添加试题操作
      - 查询成绩，查询所有学生的成绩
      - 修改成绩，根据学生的学号对成绩进行修改
      - 添加试题，根据提示添加试题信息进行添加

## 三、代码实现

### JDBC工具类—JDBCUtils

实现`JDBC`连接数据库的便捷性，做到更方便快捷的使用`JDBC`来连接`MySQL`数据库。

这段工具类提供了连接数据库驱动、释放资源等功能，能在使用`JDBC`连接`MySQL`时候更快捷高效。

```java
package com.company;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.sql.*;
import java.util.Properties;

public class JDBCUtils {
    // 定义字符串
    private static String user;
    private static String password;
    private static String url;
    private static String driver;

    /*
    * 文件的读取，只需要用到一次，所以用到静态代码块
    * */
    static {
        // 读取资源文件，获取值
        try {
            // 1. 创建properties集合类
            Properties properties = new Properties();

            // 获取src路径下文件的方法-> ClassLoader 类加载器
            // ClassLoader classLoader = JDBCUtils.class.getClassLoader();
            // URL res = classLoader.getResource("src\\jdbc.properties");
            // String path = res.getPath();
            // System.out.println(path);

            // 2.加载文件
            properties.load(new FileReader("src\\jdbc.properties"));

            // 3.获取数值，赋值
            url = properties.getProperty("url");
            user = properties.getProperty("user");
            password = properties.getProperty("password");
            driver = properties.getProperty("driver");

            // 4.注册驱动
            Class.forName(driver);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    /*
    * 获取连接，连接对象
    * */
    static Connection getConnection() throws SQLException {
        System.out.println("数据库连接中......");
        return DriverManager.getConnection(url, user, password);
    }

    /*
    * 释放资源
    * */
    private static void close(PreparedStatement pstmt, Connection conn) {
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


    public static void close (ResultSet rs, PreparedStatement pstmt, Connection conn) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        close(pstmt, conn);
        System.out.println("资源释放成功！");
    }
}
```

其中，使用这个`JDBCUtils`的时候，需要用到配置文件，后缀名【`.properties`】

由于我使用的是【`mysql-connector-java-8.0.22.jar`】版本的驱动，需要添加 `?serverTimezone=UTC`，并且更改`driver`为 `com.mysql.cj.jdbc.Driver`

```properties
url=jdbc:mysql://localhost:3306/XS?serverTimezone=UTC
user=root
password=123456
driver=com.mysql.cj.jdbc.Driver
```

### 答题主界面——MainView

```java
// 定义主界面
// 定义按钮：提交、上一题、下一题、开始
private JButton start, commit, back, next;
// 设置单选按钮
private JRadioButton aButton, bButton, cButton, dButton;
// 设置按钮组
private ButtonGroup buttonGroup;
// 设置标签
private JLabel label, clock;
// 设置文本区
private JTextArea jTextArea;
// 设置面板
private JPanel panel1, panel2, panel3;
```

### 倒计时类——Countdown

```java
// 倒计时
class Countdown extends Thread{
    // 设置考试倒计时
    // 剩余时间
    private JLabel leftTime;
    // 考试设置时间，总时间
    private int totalTime;

    Countdown(JLabel lT, int tT) {
        this.leftTime = lT;
        this.totalTime = tT * 60;
    }

    @Override
    public void run() {
        NumberFormat numberFormat = NumberFormat.getInstance();
        // 设置数值的整数部分允许的最小位数
        numberFormat.setMinimumIntegerDigits(2);
        // 定义时分秒
        int h, m, s;
        while (totalTime > 0) {
            h = totalTime / 3600;
            m = totalTime % 3600 / 60;
            s = totalTime % 60;
            StringBuilder stringBuilder;
            stringBuilder = new StringBuilder();
            // 增加到leftTime标签
            stringBuilder.append("考试剩余时间为：").append(numberFormat.format(h)).append(":").append(numberFormat.format(m)).append(":").append(numberFormat.format(s));
            leftTime.setText(stringBuilder.toString());
            System.out.println("lefttime ：" + leftTime);
            try {
                //延时一秒
                Thread.sleep(1000);
            } catch (Exception e) {
                // ignore error
            }
            // 单位是s，延时1s则总时长-1
            totalTime --;
        }
        if (totalTime == 0) {
            JOptionPane.showMessageDialog(null, "考试结束");
            // 考试结束的时候自动交卷，触发打分方法
            MainView.showScore();
            // 推迟执行，防止过早关闭
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.exit(0);
        }
    }
}
```

### 学生登录界面——StudentLogin

```java
/*
* 登录功能逻辑：
*  1. 先获取到学号
*  2. 利用学号检索数据库，看是否查询得到对应的密码
*    - 有查询结果，则代表学号正确
*    - 无查询结果，则代表学号错误/没添加
*  3. 有对应的密码之后，判断数据库的密码和用户输入的密码是否匹配
*    - 若匹配，则密码正确
*    - 若不匹配，则密码错误
* */
if (actionEvent.getSource() == btnOk) {
    if ("".equals(jtfId.getText())) {
        // System.out.println("请输入学号！");
        JOptionPane.showMessageDialog(null, "请输入学号！");
    } else if ("".equals(new String(jpfPassword.getPassword()))) {
        // System.out.println("请输入密码！");
        JOptionPane.showMessageDialog(null, "请输入密码！");
    } else {
        temp = 1;
        tempId = jtfId.getText();
        tempPassword = new String(jpfPassword.getPassword());
    }

    if (temp == 1) {
        // 执行JDBC查询到学生的ID和密码
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = JDBCUtils.getConnection();
            // JOptionPane.showMessageDialog(null, "数据库连接成功！");
            System.out.println("登录：数据库连接成功！");
            String sql = "select password from student where sno = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, tempId);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                stuPassword = rs.getString(1);
            }
            // 如果学号输入错误/找不到对应的学号，则返回的rs为null，getString也为null
            if (tempPassword.equals(stuPassword)) {
                JOptionPane.showMessageDialog(null, "登录成功！");
                // 学号正确，填入学号，后期更新成绩需要用到
                /*setStuId(tempId);*/
                stuId = tempId;
                // 执行页面跳转
                this.dispose(); // 关闭登录界面
                new MainView(); // 弹出主页面
            } else {
                JOptionPane.showMessageDialog(null, "学号或密码错误！");
                jtfId.setText("");
                jpfPassword.setText("");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 释放资源
            JDBCUtils.close(rs, pstmt, conn);
        }
	}
}
```

## 四、问题汇总

### 1. 使用类结构数组的时候发生空指针异常

```java
/*
* 出现空指针异常
* Exception in thread "AWT-EventQueue-0" java.lang.NullPointerException
* 出现异常的原因是因为自定义的类数组，需要对每个类进行实例化
* Test[] tests = new Test[num] 是没有地方可以存数据的
* 只有每个成员进行声明后才会给这个成员分配内存
* tests[0] = new Test();
* */
```

### 2.表格多次点击查询，数据重复添加

表格多次点击查询，数据重复添加。之前设置的思路是在当前界面直接显示成绩表格，但是出现了这个问题。

之后每次点击添加的时候设置**jTable**的`rowCount = 0`，每次点击就开始查询，查询一次就开始添加数据，最后显示正常。

```java
public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == back) {
            this.dispose();
            new StudentSelect();
        } else if (actionEvent.getSource() == btnOk) {
            String tempName = jtfName.getText();
            // 无输入的时候为""
            System.out.println(tempName);
            String tempId = jtfId.getText();
            String tempPassword = new String(jpfPassword.getPassword());
            String tempAge = "";
            String tempSex = "";
            String tempMajor = "";
            String tempDepartment = "";

            int isEmpty = 0;
            int isLegal = 0;
            int isSelect = 0;

            if ("".equals(tempName)) {
                JOptionPane.showMessageDialog(null, "请输入姓名！");
            } else if ("".equals(tempId)) {
                JOptionPane.showMessageDialog(null, "请输入学号！");
            } else if ("".equals(tempPassword)) {
                JOptionPane.showMessageDialog(null, "请输入密码！");
            } else {
                // 表示要填写的元素全部都有填写
                isEmpty = 1;
            }

            if (isEmpty == 1) {
                if (isAllNumber(tempId)){
                    char[] strId = tempId.toCharArray();
                    if (strId.length == 11) {
                        char[] strPassword = tempPassword.toCharArray();
                        if (strPassword.length >= 6) {
                            isLegal = 1;
                        } else {
                            JOptionPane.showMessageDialog(null, "密码不满足条件！");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "学号不是11位！");
                        jtfId.setText("");
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "学号不是数字！");
                    jtfId.setText("");
                }
            }

            if (isEmpty == 1 && isLegal == 1) {
                if (jcbSex.getSelectedIndex() != 0) {
                    tempSex = stringSex[jcbSex.getSelectedIndex()];
                    if (jcbAge.getSelectedIndex() != 0) {
                        tempAge = stringAge[jcbAge.getSelectedIndex()];
                        if (jcbDepartment.getSelectedIndex() != 0) {
                            tempDepartment = stringDepartment[jcbDepartment.getSelectedIndex()];
                            if (jcbMajor.getSelectedIndex() != 0) {
                                tempMajor = stringMajor[jcbMajor.getSelectedIndex()];
                                isSelect = 1; // 表示列表项全都做出了选择
                            } else {
                                JOptionPane.showMessageDialog(null, "请选择专业！");
                            }
                        } else {
                            JOptionPane.showMessageDialog(null, "请选择学院！");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "请选择年龄！");
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "请选择性别！");
                }
            }

            // 非空才开始传入数据
            if (isEmpty == 1  && isLegal == 1 && isSelect == 1) {
                // 确认注册，需要传入数据
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                // JDBC数据操作
                try {
                    conn = JDBCUtils.getConnection();
                    System.out.println("学生注册：数据库连接成功！");

                    // 先根据传入的数据是否存在，判断条件：主键Id
                    String selectId = "select sno from student where sno = ?";
                    pstmt = conn.prepareStatement(selectId);
                    pstmt.setString(1, tempId);
                    rs = pstmt.executeQuery();
                    int tempJudge = 0;
                    while (rs.next()) {
                        tempJudge ++;
                    }
                    if (tempJudge == 1) {
                        JOptionPane.showMessageDialog(null, "用户已存在！");
                    } else {
                        pstmt = null;
                        rs = null;
                        String sql = "insert into student(sname, sno, password, ssex," +
                                "sage, major, department) values(?, ?, ?, ?, ?, ?, ?)";
                        /*String sql2 = "insert into sc(sno) values(?)";*/
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setString(1, tempName);
                        pstmt.setString(2, tempId);
                        pstmt.setString(3, tempPassword);
                        pstmt.setString(4, tempSex);
                        pstmt.setString(5, tempAge);
                        pstmt.setString(6, tempMajor);
                        pstmt.setString(7, tempDepartment);

                        // 返回影响的行数
                        int flag = pstmt.executeUpdate();

                        if (flag == 1) {
                            System.out.println("注册成功");
                            rs = null;
                            pstmt = null;
                            String sqlInert = "insert into sc(sno, score) values(?, ?) ";
                            pstmt = conn.prepareStatement(sqlInert);
                            pstmt.setString(1, tempId);
                            pstmt.setInt(2, 0);
                            int count = pstmt.executeUpdate();
                            if (count == 1) {
                                System.out.println("SC表格数据创建成功！");
                                JOptionPane.showMessageDialog(null, "注册成功！");
                            }
                            this.dispose();
                            new StudentLogin();
                        } else {
                            System.out.println("注册失败");
                            JOptionPane.showMessageDialog(null, "注册失败！");
                        }
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    JDBCUtils.close(rs, pstmt, conn);
                }
            }
        } else if (actionEvent.getSource() == btnCancel) {
            // 取消注册，返回上一级
            this.dispose();
            new StudentSelect();
        }
    }
```

## 五、源代码

### 项目结构

![image-20201229214416002](https://i.loli.net/2020/12/29/GDfOKk1sjPWmurJ.png)

### jdbc.properties

```properties
url=jdbc:mysql://localhost:3306/ExamSystem?serverTimezone=UTC
user=root
password=123456
driver=com.mysql.cj.jdbc.Driver
# 高版本的jdbc需要修改 driver=com.mysql.cj.jdbc.Driver
# 使用高版本jdbc时候，需要在数据库url之后加上?serverTimezone=UTC
# // 1.导入驱动jar包 ，已完成
# // 2.注册驱动
# // 高版本的jdbc需要修改 driverClass=com.mysql.cj.jdbc.Driver
# // Class.forName("com.mysql.cj.jdbc.Driver");
# // 3.获取数据库连接对象
# // 使用高版本的jdbc时候，需要在数据库之后加上?serverTimezone=UTC
# // conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/XS?serverTimezone=UTC","root","123456");
# conn = JDBCUtils.getConnection();
# System.out.println("数据库连接成功！");
# // 4.定义数据库执行语言
# String sql = "update XSCJ set SCORE = ? where id = ?";
# // 5.获取执行sql语句的对象
# pstmt = conn.prepareStatement(sql);
# // 设置预编译sql语句的值
# pstmt.setInt(1,85);
# pstmt.setInt(2,1);
# // 6.执行sql语句
# int count = pstmt.executeUpdate();
# // 7.处理结果
# System.out.println(count);
# System.out.println("执行成功！");
# // 8.释放资源
# // conn.close();
# // pstmt.close();
```

### JDBCUtils

```java
package com.company;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

public class JDBCUtils {
    // 定义字符串
    private static String user;
    private static String password;
    private static String url;
    private static String driver;

    /*
    * 文件的读取，只需要用到一次，所以用到静态代码块
    * */
    static {
        // 读取资源文件，获取值
        try {
            // 1. 创建properties集合类
            Properties properties = new Properties();

            // 获取src路径下文件的方法-> ClassLoader 类加载器
            // ClassLoader classLoader = JDBCUtils.class.getClassLoader();
            // URL res = classLoader.getResource("src\\jdbc.properties");
            // String path = res.getPath();
            // System.out.println(path);

            // 2.加载文件
            properties.load(new FileReader("src\\jdbc.properties"));

            // 3.获取数值，赋值
            url = properties.getProperty("url");
            user = properties.getProperty("user");
            password = properties.getProperty("password");
            driver = properties.getProperty("driver");

            // 4.注册驱动
            Class.forName(driver);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    /*
    * 获取连接，连接对象
    * */
    static Connection getConnection() throws SQLException {
        System.out.println("数据库连接中......");
        return DriverManager.getConnection(url, user, password);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    /*
    * 释放资源
    * */
    private static void close(PreparedStatement pstmt, Connection conn) {
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


    public static void close (ResultSet rs, PreparedStatement pstmt, Connection conn) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        close(pstmt, conn);
        System.out.println("资源释放成功！");
    }
}
```

### Student

```java
package com.company;

class Student {
    String studentName;
    String studentId;
    // public String studentPassword;
    String studentSex;
    String studentAge;
    int studentScore;
    String studentDepartment;
    String studentMajor;
}
```

### Test

```java
package com.company;

// 试题集
public class Test {
    // 提供试题类，包括题目的题号、文本、答案
    public int questionNum;        // 题目题号
    public String questionText;    // 试题内容
    public String standardAnswer;  // 标准答案

    // 学生答案和题号
    public String stuAnswer;

    // 检查答案是否正确
    public boolean checkAnswer() {
        if (this.stuAnswer == null) {
            return false;
        } else {
            return this.stuAnswer.equals(this.standardAnswer);
        }
    }
}
```

### SelectIdentity

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SelectIdentity extends JFrame implements ActionListener {
    // 提供用户身份选择
    /*
    * 按照用户分类，分为教师和学生
    * 教师能够添加试题，查询、修改学生成绩
    * 学生能够新建自己的个人信息，设置密码以及修改密码，查询成绩
    * 实现逻辑：
    * 一级界面提供身份选择，二级界面选择登录还是注册，之后根据权限判断，判断身份
    * 1. 如果是教师注册，需要输入管理员密码
    *   - 如果密码不对，不给予注册教师身份
    *   - 如果身份正确，给与注册进入下一步
    * 2. 如果是学生注册，不需要进行判断
    * */
    private JButton jIdentityTeacher;            // 身份选择，教师
    private JButton jIdentityStudent;            // 身份选择，学生
    JFrame jFrame = new JFrame();

    SelectIdentity () {
        super("学生在线考试系统_确认您的身份");

        JPanel jPanel1 = new JPanel();
        JLabel jNotification = new JLabel("请选择您的身份：");
        jNotification.setBounds(430, 240, 200, 25);
        add(jNotification);

        JPanel jPanel2 = new JPanel();
        jIdentityTeacher = new JButton("教师");
        jIdentityStudent = new JButton("学生");
        jIdentityTeacher.setBounds(430, 270, 60, 30);
        jIdentityStudent.setBounds(500, 270, 60, 30);
        add(jIdentityTeacher);
        add(jIdentityStudent);

        jIdentityTeacher.addActionListener(this);
        jIdentityStudent.addActionListener(this);


        Container con = this.getContentPane();
        con.add(jPanel1, BorderLayout.NORTH);
        con.add(jPanel2, BorderLayout.CENTER);
        con.setLocation(400, 200);

        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        /*try {
            JFrame.setDefaultLookAndFeelDecorated(true);
            UIManager.setLookAndFeel("com.jtattoo.plaf.hifi.HiFiLookAndFeel");
            new CheckIdentity();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (UnsupportedLookAndFeelException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        new SelectIdentity();
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == jIdentityTeacher) {
            /*
            * 假设是教师，需要输入管理员密码确认
            * 密码输入错误跳回选择界面
            * */
            this.dispose();
            new CheckIdentity();
        } else if (actionEvent.getSource() == jIdentityStudent) {
            // 跳转学生界面
            this.dispose();
            new StudentSelect();
        }
    }
}
```

### StudentSelect

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class StudentSelect extends JFrame implements ActionListener {
    /*
    * 提供学生入口选择，注册还是登录
    * 根据相应的选择，跳转不同的界面
    * */
    private JButton jRegister;            // 身份选择，教师
    private JButton jLogin;            // 身份选择，学生

    private JLabel welcome;
    private JButton back;

    StudentSelect() {
        super("学生在线考试系统_学生注册/登录");

        welcome = new JLabel("请选择您的操作");
        back = new JButton("返回");
        back.addActionListener(this);

        JPanel jPanel = new JPanel();
        jPanel.add(welcome);
        jPanel.add(back);
        this.add(jPanel, BorderLayout.NORTH);

        JPanel jPanel1 = new JPanel();
        JLabel jNotification = new JLabel("请选择：");
        jNotification.setBounds(430, 230, 200, 25);
        add(jNotification);
        jRegister = new JButton("注册");
        jLogin = new JButton("登录");
        jRegister.setBounds(430, 260, 60, 30);
        jLogin.setBounds(500, 260, 60, 30);
        add(jRegister);
        add(jLogin);

        jRegister.addActionListener(this);
        jLogin.addActionListener(this);


        Container con = this.getContentPane();
        con.add(jPanel1, BorderLayout.CENTER);
        con.setLocation(400, 200);

        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new StudentSelect();
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == jRegister) {
            // 选择注册之后
            this.dispose();
            new StudentRegister();
        } else if (actionEvent.getSource() == jLogin) {
            // 选择登录之后进入登录界面
            this.dispose();
            new StudentLogin();
        } else if (actionEvent.getSource() == back) {
            this.dispose();
            new SelectIdentity();
        }
    }
}
```

### StudentRegister

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentRegister extends JFrame implements ActionListener {
    // 提供用户注册界面

    private JLabel stuName;
    private JLabel stuId;
    private JLabel stuPassword;
    private JLabel stuSex;
    private JLabel stuAge;
    private JLabel stuDepartment;   // 学院
    private JLabel stuMajor;        // 专业

    private JLabel idTip;
    private JLabel passwordTip;
    private JLabel ageTip;

    private JTextField jtfName;
    private JTextField jtfId;
    private JPasswordField jpfPassword;
    private JComboBox jcbSex;
    private JComboBox jcbDepartment;
    private JComboBox jcbAge;
    private JComboBox jcbMajor;

    private JButton btnOk;
    private JButton btnCancel;

    private JLabel welcome;
    private JButton back;


    // 范围选择
    String[] stringAge = new String[] {"-请选择-", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
            "28", "29", "30", "31", "32", "33", "34", "35"};
    String[] stringMajor = new String[] {"-请选择-", "计算机科学与技术", "软件工程", "物联网", "网络工程"};
    String[] stringDepartment = new String[] {"-请选择-", "计算机学院"};
    String[] stringSex = new String[] {"-请选择-", "男", "女"};

    public StudentRegister () {
        super("学生在线考试系统_学生注册");

        welcome = new JLabel("学生注册界面");
        back = new JButton("返回");
        back.addActionListener(this);

        stuName = new JLabel("姓名：");
        jtfName = new JTextField(20);
        stuId = new JLabel("学号：");
        jtfId = new JTextField(20);
        stuPassword = new JLabel("密码：");
        jpfPassword = new JPasswordField(20);
        stuSex = new JLabel("性别：");
        stuAge = new JLabel("年龄：");
        stuDepartment = new JLabel("学院：");
        stuMajor = new JLabel("专业：");

        idTip = new JLabel("（学号为11位的整数）");
        passwordTip = new JLabel("（密码不得少于6位）");
        ageTip = new JLabel("（年龄范围：10-35）");

        btnOk = new JButton("确认");
        btnCancel = new JButton("取消");

        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        JPanel jPanel = new JPanel();
        /*welcome.setBounds(430, 20, 200, 30);
        welcome.setFont(new Font("黑体", Font.PLAIN, 16));
        back.setBounds(440, 50, 80, 25);*/
        jPanel.add(welcome);
        jPanel.add(back);
        jcbSex = new JComboBox(stringSex);
        jcbDepartment = new JComboBox(stringDepartment);
        jcbAge = new JComboBox(stringAge);
        jcbMajor = new JComboBox(stringMajor);

        JPanel jPanel1 = new JPanel();
        stuName.setBounds(350, 100, 50, 30);
        jtfName.setBounds(400, 105, 200, 25);
        stuId.setBounds(350, 140, 50, 30);
        jtfId.setBounds(400, 145, 200, 25);
        idTip.setBounds(620, 140, 200, 30);
        stuPassword.setBounds(350, 180, 50, 30);
        jpfPassword.setBounds(400, 185, 200, 25);
        passwordTip.setBounds(620, 180, 200, 30);
        stuSex.setBounds(350, 220, 50, 30);
        jcbSex.setBounds(400, 225, 200, 25);
        stuAge.setBounds(350, 260, 50, 30);
        jcbAge.setBounds(400, 265, 200, 25);
        ageTip.setBounds(620, 260, 200, 30);
        stuDepartment.setBounds(350, 300, 50, 30);
        jcbDepartment.setBounds(400, 305, 200, 25);
        stuMajor.setBounds(350, 340, 50, 30);
        jcbMajor.setBounds(400, 345, 200, 25);
        add(stuName);
        add(jtfName);
        add(stuId);
        add(jtfId);
        add(idTip);
        add(stuPassword);
        add(jpfPassword);
        add(passwordTip);
        add(stuSex);
        add(jcbSex);
        add(stuAge);
        add(jcbAge);
        add(ageTip);
        add(stuDepartment);
        add(jcbDepartment);
        add(stuMajor);
        add(jcbMajor);
        JPanel jPanel2 = new JPanel();
        btnOk.setBounds(430, 470, 60, 30);
        btnCancel.setBounds(500, 470, 60, 30);
        add(btnOk);
        add(btnCancel);

        this.add(jPanel, BorderLayout.NORTH);
        this.add(jPanel1, BorderLayout.CENTER);
        this.add(jPanel2, BorderLayout.SOUTH);

        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }


    public boolean isAllNumber (String s) {
        char[] str = s.toCharArray();
        for (char c : str) {
            if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
    }


    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == back) {
            this.dispose();
            new StudentSelect();
        } else if (actionEvent.getSource() == btnOk) {
            String tempName = jtfName.getText();
            // 无输入的时候为""
            System.out.println(tempName);
            String tempId = jtfId.getText();
            String tempPassword = new String(jpfPassword.getPassword());
            String tempAge = "";
            String tempSex = "";
            String tempMajor = "";
            String tempDepartment = "";

            int isEmpty = 0;
            int isLegal = 0;
            int isSelect = 0;

            if ("".equals(tempName)) {
                JOptionPane.showMessageDialog(null, "请输入姓名！");
            } else if ("".equals(tempId)) {
                JOptionPane.showMessageDialog(null, "请输入学号！");
            } else if ("".equals(tempPassword)) {
                JOptionPane.showMessageDialog(null, "请输入密码！");
            } else {
                // 表示要填写的元素全部都有填写
                isEmpty = 1;
            }

            if (isEmpty == 1) {
                if (isAllNumber(tempId)){
                    char[] strId = tempId.toCharArray();
                    if (strId.length == 11) {
                        char[] strPassword = tempPassword.toCharArray();
                        if (strPassword.length >= 6) {
                            isLegal = 1;
                        } else {
                            JOptionPane.showMessageDialog(null, "密码不满足条件！");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "学号不是11位！");
                        jtfId.setText("");
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "学号不是数字！");
                    jtfId.setText("");
                }
            }

            if (isEmpty == 1 && isLegal == 1) {
                if (jcbSex.getSelectedIndex() != 0) {
                    tempSex = stringSex[jcbSex.getSelectedIndex()];
                    if (jcbAge.getSelectedIndex() != 0) {
                        tempAge = stringAge[jcbAge.getSelectedIndex()];
                        if (jcbDepartment.getSelectedIndex() != 0) {
                            tempDepartment = stringDepartment[jcbDepartment.getSelectedIndex()];
                            if (jcbMajor.getSelectedIndex() != 0) {
                                tempMajor = stringMajor[jcbMajor.getSelectedIndex()];
                                isSelect = 1; // 表示列表项全都做出了选择
                            } else {
                                JOptionPane.showMessageDialog(null, "请选择专业！");
                            }
                        } else {
                            JOptionPane.showMessageDialog(null, "请选择学院！");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "请选择年龄！");
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "请选择性别！");
                }
            }

            // 非空才开始传入数据
            if (isEmpty == 1  && isLegal == 1 && isSelect == 1) {
                // 确认注册，需要传入数据
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                // JDBC数据操作
                try {
                    conn = JDBCUtils.getConnection();
                    System.out.println("学生注册：数据库连接成功！");

                    // 先根据传入的数据是否存在，判断条件：主键Id
                    String selectId = "select sno from student where sno = ?";
                    pstmt = conn.prepareStatement(selectId);
                    pstmt.setString(1, tempId);
                    rs = pstmt.executeQuery();
                    int tempJudge = 0;
                    while (rs.next()) {
                        tempJudge ++;
                    }
                    if (tempJudge == 1) {
                        JOptionPane.showMessageDialog(null, "用户已存在！");
                    } else {
                        pstmt = null;
                        rs = null;
                        String sql = "insert into student(sname, sno, password, ssex," +
                                "sage, major, department) values(?, ?, ?, ?, ?, ?, ?)";
                        /*String sql2 = "insert into sc(sno) values(?)";*/
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setString(1, tempName);
                        pstmt.setString(2, tempId);
                        pstmt.setString(3, tempPassword);
                        pstmt.setString(4, tempSex);
                        pstmt.setString(5, tempAge);
                        pstmt.setString(6, tempMajor);
                        pstmt.setString(7, tempDepartment);

                        // 返回影响的行数
                        int flag = pstmt.executeUpdate();

                        if (flag == 1) {
                            System.out.println("注册成功");
                            rs = null;
                            pstmt = null;
                            String sqlInert = "insert into sc(sno, score) values(?, ?) ";
                            pstmt = conn.prepareStatement(sqlInert);
                            pstmt.setString(1, tempId);
                            pstmt.setInt(2, 0);
                            int count = pstmt.executeUpdate();
                            if (count == 1) {
                                System.out.println("SC表格数据创建成功！");
                                JOptionPane.showMessageDialog(null, "注册成功！");
                            }
                            this.dispose();
                            new StudentLogin();
                        } else {
                            System.out.println("注册失败");
                            JOptionPane.showMessageDialog(null, "注册失败！");
                        }
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    JDBCUtils.close(rs, pstmt, conn);
                }
            }
        } else if (actionEvent.getSource() == btnCancel) {
            // 取消注册，返回上一级
            this.dispose();
            new StudentSelect();
        }
    }


    public static void main(String[] args) {
        new StudentRegister();
    }

}
```

### StudentLogin

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentLogin extends JFrame implements ActionListener {
    // 定义文本域接收用户名
    private JTextField jtfId;
    // 定义密码域接收密码
    private JPasswordField jpfPassword;
    // 定义按钮，确认、取消
    private JButton btnOk;
    private JButton btnCancel;

    private static String stuId = "";              // 学号

    public static String getStuId() {
        return stuId;
    }

    public void setStuId(String stuId) {
        this.stuId = stuId;
    }

    private String stuPassword = "";        // 密码

    private JLabel welcome;
    private JButton back;

    public StudentLogin() {
        super("学生在线考试系统_登录");

        welcome = new JLabel("学生登录界面");
        back = new JButton("返回");
        back.addActionListener(this);

        JPanel jPanel = new JPanel();
        jPanel.add(welcome);
        jPanel.add(back);
        this.add(jPanel, BorderLayout.NORTH);

        // 学号密码输入部分
        // 定义界面
        JPanel jpMain = new JPanel();
        // 定义标签
        JLabel lblId = new JLabel("学号：");
        JLabel lblPassword = new JLabel("密码：");
        jtfId = new JTextField(20);
        jpfPassword = new JPasswordField(20);
        lblId.setBounds(350, 200, 50, 30);
        jtfId.setBounds(400, 205, 200, 25);
        lblPassword.setBounds(350, 240, 50, 30);
        jpfPassword.setBounds(400, 245, 200, 25);
        add(lblId);
        add(jtfId);
        add(lblPassword);
        add(jpfPassword);

        // 登录确认取消部分
        JPanel jpBtn = new JPanel();
        btnOk = new JButton("确认");
        btnCancel = new JButton("取消");
        btnOk.setBounds(430, 290, 60, 30);
        add(btnOk);
        btnCancel.setBounds(500, 290, 60, 30);
        add(btnCancel);

        // 添加事件监听
        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        // 添加容器
        Container con = this.getContentPane();
        con.add(jpMain, BorderLayout.CENTER);
        con.add(jpBtn, BorderLayout.CENTER);

        // 设置属性值
        this.setSize(1000, 600);
        // 设置用户不可调节窗口大小
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        this.setTitle("学生在线考试系统_登录");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        /*
        * 登录功能逻辑：
        *  1. 先获取到学号
        *  2. 利用学号检索数据库，看是否查询得到对应的密码
        *    - 有查询结果，则代表学号正确
        *    - 无查询结果，则代表学号错误/没添加
        *  3. 有对应的密码之后，判断数据库的密码和用户输入的密码是否匹配
        *    - 若匹配，则密码正确
        *    - 若不匹配，则密码错误
        * */
        // 设置用户输入临时储存
        // 设置正确学号密码的匹配值
        String stuPassword = "";

        // 设置用户输入的存储值
        String tempId = "";
        String tempPassword = "";

        int temp = 0;

        if (actionEvent.getSource() == btnOk) {
            if ("".equals(jtfId.getText())) {
                // System.out.println("请输入学号！");
                JOptionPane.showMessageDialog(null, "请输入学号！");
            } else if ("".equals(new String(jpfPassword.getPassword()))) {
                // System.out.println("请输入密码！");
                JOptionPane.showMessageDialog(null, "请输入密码！");
            } else {
                temp = 1;
                tempId = jtfId.getText();
                tempPassword = new String(jpfPassword.getPassword());
            }

            if (temp == 1) {
                // 执行JDBC查询到学生的ID和密码
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = JDBCUtils.getConnection();
                    // JOptionPane.showMessageDialog(null, "数据库连接成功！");
                    System.out.println("登录：数据库连接成功！");
                    String sql = "select password from student where sno = ?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setString(1, tempId);
                    rs = pstmt.executeQuery();
                    while (rs.next()) {
                        stuPassword = rs.getString(1);
                    }
                    // 如果学号输入错误/找不到对应的学号，则返回的rs为null，getString也为null
                    if (tempPassword.equals(stuPassword)) {
                        JOptionPane.showMessageDialog(null, "登录成功！");
                        // 学号正确，填入学号，后期更新成绩需要用到
                        /*setStuId(tempId);*/
                        stuId = tempId;
                        // 执行页面跳转
                        this.dispose(); // 关闭登录界面
                        new MainView(); // 弹出主页面
                    } else {
                        JOptionPane.showMessageDialog(null, "学号或密码错误！");
                        jtfId.setText("");
                        jpfPassword.setText("");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    // 释放资源
                    JDBCUtils.close(rs, pstmt, conn);
                }
            }
        }

        // 取消登录操作
        if (actionEvent.getSource() == btnCancel) {
            /*JOptionPane.showMessageDialog(null, "您已退出！");*/
            this.dispose();
            new StudentSelect();
        } else if (actionEvent.getSource() == back) {
            this.dispose();
            new StudentSelect();
        }
    }

    public static void main(String[] args) {
        new StudentLogin();
    }

}
```

### MainView

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.util.Objects;

public class MainView extends JFrame implements ActionListener {
    // 定义主界面
    // 定义按钮：提交、上一题、下一题、开始
    private JButton start, commit, back, next;
    // 设置单选按钮
    private JRadioButton aButton, bButton, cButton, dButton;
    // 设置按钮组
    private ButtonGroup buttonGroup;
    // 设置文本区
    private static JTextArea jTextArea;

    // 定义所需要的变量值
    private static Test[] tests;              // 设置试题
    private static int questionNum = 0;       // 设置题目数量
    private static int questionPointer = 0;   // 设置题号指针
    private static int yes = 0;
    private static int no = 0;               // 设置对错数量
    private Countdown cd;              // 倒计时

    MainView() {
        super("学生在线考试系统_答题");

        // 设置面板
        JPanel panel1 = new JPanel();
        JPanel panel2 = new JPanel();
        JPanel panel3 = new JPanel();

        // 设定考试时间
        final int EXAM_TIME = 1;
        // 设置标签
        JLabel label = new JLabel("总考试时间：" + 1 + "分钟");
        JLabel clock = new JLabel();
        cd = new Countdown(clock, EXAM_TIME);

        jTextArea = new JTextArea(20, 40);
        // 设置试题区不能编辑（不能修改试题内容）
        jTextArea.setEditable(false);

        aButton = new JRadioButton("A");
        bButton = new JRadioButton("B");
        cButton = new JRadioButton("C");
        dButton = new JRadioButton("D");
        buttonGroup = new ButtonGroup();

        start = new JButton("开始考试");
        back = new JButton("上一题");
        next = new JButton("下一题");
        commit = new JButton("交卷");

        // 添加事件监听
        aButton.addActionListener(this);
        bButton.addActionListener(this);
        cButton.addActionListener(this);
        dButton.addActionListener(this);

        start.addActionListener(this);
        back.addActionListener(this);
        next.addActionListener(this);
        commit.addActionListener(this);

        // 布局设置
        buttonGroup.add(aButton);
        buttonGroup.add(bButton);
        buttonGroup.add(cButton);
        buttonGroup.add(dButton);

        panel1.add(label);
        panel1.add(start);
        panel1.add(clock);


        panel2.add(jTextArea);

        panel3.add(aButton);
        panel3.add(bButton);
        panel3.add(cButton);
        panel3.add(dButton);
        panel3.add(back);
        panel3.add(next);
        panel3.add(commit);

        this.add(panel1, BorderLayout.NORTH);
        this.add(panel2, BorderLayout.CENTER);
        this.add(panel3, BorderLayout.SOUTH);

        // 登录之后界面才可见
        this.setVisible(true);
        this.setTitle("学生在线考试系统");
        // 设置全屏显示
        /*
        * 后来发现全屏显示需要调整UI，舍弃使用
        * */
        /*Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        this.setSize((int) screenSize.getWidth(), (int) screenSize.getHeight());*/
        // 设置尺寸
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    private void createExam() {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            // 题目数量
            int num = 0;
            conn = JDBCUtils.getConnection();
            System.out.println("获取题库：数据库连接成功！");
            String sql = "select * from TEST";
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                num ++;
            }
            /*
            * 考虑到教师未添加题目的情况
            *  num == 0
            * */
            if (num == 0) {
                JOptionPane.showMessageDialog(null, "题库为空，请联系教师解决！");
                this.dispose();
                new StudentLogin();
            }
            tests = new Test[num];
            // 题目数量赋值
            questionNum = num;
            /*
            * 出现空指针异常
            * Exception in thread "AWT-EventQueue-0" java.lang.NullPointerException
            * 出现异常的原因是因为自定义的类数组，需要对每个类进行实例化
            * Test[] tests = new Test[num] 是没有地方可以存数据的
            * 只有每个成员进行声明后才会给这个成员分配内存
            * tests[0] = new Test();
            * */
            // 获取题量的大小之后，需要对rs重新赋值
            rs = null;
            rs = pstmt.executeQuery();
            int i = 0;
            while (rs.next()) {
                tests[i] = new Test();
                tests[i].questionNum = rs.getInt("NUM");
                tests[i].questionText = rs.getString("QUESTION");
                tests[i].standardAnswer = rs.getString("ANSWER");
                i ++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(rs, pstmt, conn);
        }
    }

    // 设置单选不重复模块
    private void setSelected(String s) {
        if ("A".equals(s)) {
            buttonGroup.setSelected(aButton.getModel(), true);
        }
        if ("B".equals(s)) {
            buttonGroup.setSelected(bButton.getModel(), true);
        }
        if ("C".equals(s)) {
            buttonGroup.setSelected(cButton.getModel(), true);
        }
        if ("D".equals(s)) {
            buttonGroup.setSelected(dButton.getModel(), true);
        }
        if ("".equals(s)) {
            buttonGroup.clearSelection();
        }
    }

    // 设置试题展示模块
    public static void showQuestion() {
        jTextArea.setText("");
        jTextArea.append(tests[questionPointer].questionText);
    }

    // 设置打分模块
    static void showScore() {
        for (int i = 0; i < questionNum; i++) {
            if (tests[i].checkAnswer()) {
                yes++;
            } else {
                no++;
            }
        }
        int score  = (int) (yes * 100 / questionNum);
        // 把学生成绩传回数据库
        // 用到之前登录时候定义的 stuId
        // 答题则表示登录成功，输入Id正确
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn = JDBCUtils.getConnection();
            System.out.println("传入成绩：数据库连接成功！");
            String sql = "update sc set score = ? where sno = ?";
            pstmt = conn.prepareStatement(sql);

            // 设置占位符值
            pstmt.setInt(1, score);
            pstmt.setString(2, StudentLogin.getStuId());

            System.out.println("登录的学号是" + StudentLogin.getStuId());

            int count  = pstmt.executeUpdate();
            System.out.println("改变了" + count + "次成绩");
        } catch (SQLException e) {
            e.printStackTrace();
        } /*finally {
            JDBCUtils.close(null, pstmt, conn);
        }*/
        JOptionPane.showMessageDialog(null,
                "答对" + yes + "题，答错"+ no +"题，分数为" + score);

        // 展示学生信息，打分
        conn = null;
        pstmt = null;
        ResultSet rs = null;
        String sname = "";
        String sid = "";
        int sscore = 0;
        try {
            conn = JDBCUtils.getConnection();
            System.out.println("分数查询：数据库连接成功！");
            String sql = "select student.sno, student.sname, sc.score " +
                    "from sc, student where sc.sno = student.sno and sc.sno = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, StudentLogin.getStuId());
            rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println("展示成绩");
                sname = rs.getString("sname");
                sid = rs.getString("sno");
                sscore = rs.getInt("score");
            }
            JOptionPane.showMessageDialog(null,
                    "姓名：" + sname + '\n' + "学号：" + sid + '\n' + "分数：" + sscore);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(rs, pstmt, conn);
        }

    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        // 按键点击
        if (actionEvent.getSource() == start) {
            createExam();         // 创建考试
            questionPointer = 0;  // 题目序号
            showQuestion();       // 展示试题
            start.setEnabled(false);  // 设置按键不可点击
            cd.start();           // 开始计时
        } else if (actionEvent.getSource() == back) {
            questionPointer --;
            if (questionPointer == -1) {
                JOptionPane.showMessageDialog(null, "已经是第一题了！");
                questionPointer ++;
            } else {
                // 当前题目未完成，需要清空选项值
                setSelected(Objects.requireNonNullElse(tests[questionPointer].stuAnswer, ""));
            }
            showQuestion();
        } else if (actionEvent.getSource() == next) {
            questionPointer ++;
            if (questionPointer == questionNum) {
                JOptionPane.showMessageDialog(null, "已经是最后一题了！");
                questionPointer --;
            } else {
                // 当前题目未完成，需要清空选项值
                setSelected(Objects.requireNonNullElse(tests[questionPointer].stuAnswer, ""));
            }
            showQuestion();
        } else if (actionEvent.getSource() == commit) {
            showScore();
            commit.setEnabled(false);
            System.exit(0);
        }

        // 设置答案选项
        if (actionEvent.getSource() == aButton) {
            tests[questionPointer].stuAnswer = "A";
        }
        if (actionEvent.getSource() == bButton) {
            tests[questionPointer].stuAnswer = "B";
        }
        if (actionEvent.getSource() == cButton) {
            tests[questionPointer].stuAnswer = "C";
        }
        if (actionEvent.getSource() == dButton) {
            tests[questionPointer].stuAnswer = "D";
        }
    }

    public static void main(String[] args) {
        new MainView();
    }

}

// 倒计时
class Countdown extends Thread{
    // 设置考试倒计时
    // 剩余时间
    private JLabel leftTime;
    // 考试设置时间，总时间
    private int totalTime;

    Countdown(JLabel lT, int tT) {
        this.leftTime = lT;
        this.totalTime = tT * 60;
    }

    @Override
    public void run() {
        NumberFormat numberFormat = NumberFormat.getInstance();
        // 设置数值的整数部分允许的最小位数
        numberFormat.setMinimumIntegerDigits(2);
        // 定义时分秒
        int h, m, s;
        while (totalTime > 0) {
            h = totalTime / 3600;
            m = totalTime % 3600 / 60;
            s = totalTime % 60;
            StringBuilder stringBuilder;
            stringBuilder = new StringBuilder();
            // 增加到leftTime标签
            stringBuilder.append("考试剩余时间为：").append(numberFormat.format(h)).append(":").append(numberFormat.format(m)).append(":").append(numberFormat.format(s));
            leftTime.setText(stringBuilder.toString());
            System.out.println("lefttime ：" + leftTime);
            try {
                //延时一秒
                Thread.sleep(1000);
            } catch (Exception e) {
                // ignore error
            }
            // 单位是s，延时1s则总时长-1
            totalTime --;
        }
        if (totalTime == 0) {
            JOptionPane.showMessageDialog(null, "考试结束");
            // 考试结束的时候自动交卷，触发打分方法
            MainView.showScore();
            // 推迟执行，防止过早关闭
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.exit(0);
        }
    }
}
```

### CheckIdentity

```java
package com.company;

import com.mysql.cj.exceptions.ConnectionIsClosedException;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CheckIdentity extends JFrame implements ActionListener {
    /*
    *  输入管理员密码之后，才能够创建教师账号/登录教师账号
    * */
    private JButton btnOk;
    private JButton btnCancel;
    private JPasswordField jpfAdmin;

    private JLabel welcome;
    private JButton back;

    public CheckIdentity() {
        super("学生在线考试系统_验证您的身份");

        welcome = new JLabel("确认您的身份");
        back = new JButton("返回");
        back.addActionListener(this);

        JPanel jPanel = new JPanel();
        jPanel.add(welcome);
        jPanel.add(back);
        this.add(jPanel, BorderLayout.NORTH);

        JPanel jPanel1 = new JPanel();
        JLabel jNotification = new JLabel("请输入您的身份验证密码：");
        jNotification.setBounds(400, 200, 230, 25);
        jpfAdmin = new JPasswordField();
        jpfAdmin.setBounds(400, 230, 200, 25);
        add(jNotification);
        add(jpfAdmin);

        JPanel jPanel2 = new JPanel();
        btnOk = new JButton("确认");
        btnCancel = new JButton("取消");
        btnOk.setBounds(430, 290, 60, 30);
        btnCancel.setBounds(500, 290, 60, 30);
        add(btnOk);
        add(btnCancel);

        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        Container con = this.getContentPane();
        con.add(jPanel1, BorderLayout.CENTER);
        con.add(jPanel2, BorderLayout.CENTER);

        // 设置属性值
        this.setSize(1000, 600);
        // 设置用户不可调节窗口大小
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    }

    public static void main(String[] args) {
        new CheckIdentity();
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == btnOk) {
            // 确认验证
            String password = "";

            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rs = null;

            try {
                conn = JDBCUtils.getConnection();
                System.out.println("验证教师：数据库连接成功！");
                String sql = "select * from administrator";
                pstmt = conn.prepareStatement(sql);
                rs = pstmt.executeQuery();
                while (rs.next()) {
                    password = rs.getString(1);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                JDBCUtils.close(rs, pstmt, conn);
            }
            if (password.equals(new String(jpfAdmin.getPassword()))) {
                // 密码正确
                JOptionPane.showMessageDialog(null, "密码正确！");
                this.dispose();
                new TeacherSelect();
            }
        } else if (actionEvent.getSource() == btnCancel) {
            // 取消、返回则跳转回上一级页面
            new SelectIdentity();
            this.dispose();
        } else if (actionEvent.getSource() == back) {
            new SelectIdentity();
            this.dispose();
        }
    }
}
```

### TeacherSelect

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TeacherSelect extends JFrame implements ActionListener {
    /*
    * 用户验证身份为教师之后，需要选择登录/注册
    * 根据教师的选择进行跳转相应的界面
    * */
    private JButton jRegister;
    private JButton jLogin;

    private JLabel welcome;
    private JButton back;

    TeacherSelect() {
        super("学生在线考试系统_教师注册/登录");

        welcome = new JLabel("教师操作选择");
        back = new JButton("返回");
        back.addActionListener(this);

        JPanel jPanel = new JPanel();
        jPanel.add(welcome);
        jPanel.add(back);

        JPanel jPanel1 = new JPanel();
        JLabel jNotification = new JLabel("请选择：");
        jNotification.setBounds(430, 230, 200, 25);
        add(jNotification);

        JPanel jPanel2 = new JPanel();
        jRegister = new JButton("注册");
        jLogin = new JButton("登录");
        jRegister.setBounds(430, 260, 60, 30);
        jLogin.setBounds(500, 260, 60, 30);
        add(jRegister);
        add(jLogin);

        jRegister.addActionListener(this);
        jLogin.addActionListener(this);


        Container con = this.getContentPane();
        con.add(jPanel1, BorderLayout.NORTH);
        con.add(jPanel2, BorderLayout.CENTER);
        con.add(jPanel, BorderLayout.NORTH);
        con.setLocation(400, 200);

        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new TeacherSelect();
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == back) {
            this.dispose();
            new SelectIdentity();
        } else if (actionEvent.getSource() == jRegister) {
            // 选择注册之后
            this.dispose();
            new TeacherRegister();
        } else if (actionEvent.getSource() == jLogin) {
            // 选择登录之后进入登录界面
            this.dispose();
            new TeacherLogin();
        }
    }
}
```

### TeacherRegister

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TeacherRegister extends JFrame implements ActionListener {
    // 提供用户注册界面

    private JLabel tName;
    private JLabel tId;
    private JLabel tPassword;
    private JLabel tSex;

    private JLabel idTip;
    private JLabel passwordTip;

    private JTextField jtfName;
    private JTextField jtfId;
    private JPasswordField jpfPassword;
    private JComboBox jcbSex;

    private JButton btnOk;
    private JButton btnCancel;

    private JLabel welcome;
    private JButton back;

    // 范围选择
    String[] stringSex = new String[] {"-请选择-", "男", "女"};

    public TeacherRegister () {
        super("学生在线考试系统_教师注册");

        welcome = new JLabel("教师注册界面");
        back = new JButton("返回");
        back.addActionListener(this);

        tName = new JLabel("姓名：");
        jtfName = new JTextField(20);
        tId = new JLabel("工号：");
        jtfId = new JTextField(20);
        tPassword = new JLabel("密码：");
        jpfPassword = new JPasswordField(20);
        tSex = new JLabel("性别：");
        jcbSex = new JComboBox(stringSex);

        idTip = new JLabel("（工号为11位的整数）");
        passwordTip = new JLabel("（密码不得少于6位）");

        btnOk = new JButton("确认");
        btnCancel = new JButton("取消");

        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        JPanel jPanel = new JPanel();
        jPanel.add(welcome);
        jPanel.add(back);
        JPanel jPanel1 = new JPanel();
        tName.setBounds(350, 150, 50, 30);
        jtfName.setBounds(400, 155, 200, 25);
        tId.setBounds(350, 190, 50, 30);
        jtfId.setBounds(400, 195, 200, 25);
        idTip.setBounds(620, 190, 200, 30);
        tPassword.setBounds(350, 230, 50, 30);
        jpfPassword.setBounds(400, 235, 200, 25);
        passwordTip.setBounds(620, 230, 200, 30);
        tSex.setBounds(350, 270, 50, 30);
        jcbSex.setBounds(400, 275, 200, 25);
        add(tName);
        add(jtfName);
        add(tId);
        add(jtfId);
        add(idTip);
        add(tPassword);
        add(jpfPassword);
        add(passwordTip);
        add(tSex);
        add(jcbSex);

        JPanel jPanel2 = new JPanel();
        btnOk.setBounds(430, 330, 60, 30);
        btnCancel.setBounds(500, 330, 60, 30);
        add(btnOk);
        add(btnCancel);

        this.add(jPanel, BorderLayout.NORTH);
        this.add(jPanel1, BorderLayout.CENTER);
        this.add(jPanel2, BorderLayout.SOUTH);

        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public boolean isAllNumber (String s) {
        char[] str = s.toCharArray();
        for (char c : str) {
            if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        new TeacherRegister();
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == back) {
            this.dispose();
            new TeacherSelect();
        } else if (actionEvent.getSource() == btnOk) {
            // 设置临时变量存储输入值，判断
            String tempName = jtfName.getText();
            // 无输入的时候为""
            System.out.println(tempName);
            String tempId = jtfId.getText();
            String tempPassword = new String(jpfPassword.getPassword());
            String tempSex = "";

            int isEmpty = 0;
            int isLegal = 0;
            int isSelect = 0;

            if ("".equals(tempName)) {
                JOptionPane.showMessageDialog(null, "请输入姓名！");
            } else if ("".equals(tempId)) {
                JOptionPane.showMessageDialog(null, "请输入学号！");
            } else if ("".equals(tempPassword)) {
                JOptionPane.showMessageDialog(null, "请输入密码！");
            } else {
                // 表示要填写的元素全部都有填写
                isEmpty = 1;
            }

            if (isEmpty == 1) {
                if (isAllNumber(tempId)){
                    char[] strId = tempId.toCharArray();
                    if (strId.length == 11) {
                        char[] strPassword = tempPassword.toCharArray();
                        if (strPassword.length >= 6) {
                            isLegal = 1;
                        } else {
                            JOptionPane.showMessageDialog(null, "密码不满足条件！");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "工号不是11位！");
                        jtfId.setText("");
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "工号不是数字！");
                    jtfId.setText("");
                }
            }

            if (isEmpty == 1 && isLegal == 1) {
                if (jcbSex.getSelectedIndex() != 0) {
                    tempSex = stringSex[jcbSex.getSelectedIndex()];
                    isSelect = 1;
                } else {
                    JOptionPane.showMessageDialog(null, "请选择性别！");
                }
            }

            if (isEmpty == 1 && isLegal == 1 && isSelect == 1) {
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;

                try {
                    conn = JDBCUtils.getConnection();
                    System.out.println("教师注册：数据库连接成功！");

                    // 先根据传入的数据是否存在，判断条件：主键Id
                    String selectId = "select tno from teacher where tno = ?";
                    pstmt = conn.prepareStatement(selectId);
                    pstmt.setString(1, tempId);
                    rs = pstmt.executeQuery();
                    String tempJudge = "";
                    while (rs.next()) {
                        tempJudge = rs.getString(1);
                    }

                    if (tempJudge.equals(tempId)) {
                        JOptionPane.showMessageDialog(null, "用户已存在！");
                    } else {
                        pstmt = null;
                        rs = null;
                        String sql = "insert into teacher(tno, password, tname, tsex) " +
                                "values(?, ?, ?, ?)";
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setString(1, tempId);
                        pstmt.setString(2, tempPassword);
                        pstmt.setString(3, tempName);
                        pstmt.setString(4, tempSex);

                        // 返回影响的行数
                        int flag = pstmt.executeUpdate();

                        if (flag == 1) {
                            System.out.println("注册成功");
                            JOptionPane.showMessageDialog(null, "注册成功！");
                            this.dispose();
                            new TeacherLogin();
                        } else {
                            System.out.println("注册失败");
                            JOptionPane.showMessageDialog(null, "注册失败！");
                        }
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    JDBCUtils.close(rs, pstmt, conn);
                }
            }

        } else if (actionEvent.getSource() == btnCancel) {
            this.dispose();
            new SelectIdentity();
        }
    }
}
```

### TeacherLogin

```java
package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TeacherLogin extends JFrame implements ActionListener {
    // 定义文本域接收用户名
    private JTextField jtfId;
    // 定义密码域接收密码
    private JPasswordField jpfPassword;
    // 定义按钮，确认、取消
    private JButton btnOk;
    private JButton btnCancel;

    static String teacherId = "";   // 传值给TeacherView使用

    private static String tId = "";              // 工号

    private String tPassword = "";        // 密码

    private JLabel welcome;
    private JButton back;

    public TeacherLogin() {
        super("学生在线考试系统_教师登录");

        welcome = new JLabel("教师注册界面");
        back = new JButton("返回");
        back.addActionListener(this);

        JPanel jPanel = new JPanel();
        jPanel.add(welcome);
        jPanel.add(back);
        this.add(jPanel, BorderLayout.NORTH);

        // 工号密码输入部分
        // 定义界面
        JPanel jpMain = new JPanel();
        // 定义标签
        JLabel lblId = new JLabel("工号：");
        JLabel lblPassword = new JLabel("密码：");
        jtfId = new JTextField(20);
        jpfPassword = new JPasswordField(20);
        lblId.setBounds(350, 200, 50, 30);
        jtfId.setBounds(400, 205, 200, 25);
        lblPassword.setBounds(350, 240, 50, 30);
        jpfPassword.setBounds(400, 245, 200, 25);
        add(lblId);
        add(jtfId);
        add(lblPassword);
        add(jpfPassword);

        // 登录确认取消部分
        JPanel jpBtn = new JPanel();
        btnOk = new JButton("确认");
        btnCancel = new JButton("取消");
        btnOk.setBounds(430, 290, 60, 30);
        add(btnOk);
        btnCancel.setBounds(500, 290, 60, 30);
        add(btnCancel);

        // 添加事件监听
        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        // 添加容器
        Container con = this.getContentPane();
        con.add(jpMain, BorderLayout.CENTER);
        con.add(jpBtn, BorderLayout.CENTER);

        // 设置属性值
        this.setSize(1000, 600);
        // 设置用户不可调节窗口大小
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        this.setTitle("学生在线考试系统_教师登录");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        /*
         * 登录功能逻辑：
         *  1. 先获取到工号
         *  2. 利用工号检索数据库，看是否查询得到对应的密码
         *    - 有查询结果，则代表工号正确
         *    - 无查询结果，则代表工号错误/没添加
         *  3. 有对应的密码之后，判断数据库的密码和用户输入的密码是否匹配
         *    - 若匹配，则密码正确
         *    - 若不匹配，则密码错误
         * */
        // 设置用户输入临时储存
        // 设置正确工号密码的匹配值

        // 设置用户输入的存储值
        String tempId = "";
        String tempPassword = "";

        int temp = 0;

        if (actionEvent.getSource() == btnOk) {
            if ("".equals(jtfId.getText())) {
                // System.out.println("请输入工号！");
                JOptionPane.showMessageDialog(null, "请输入工号！");
            } else if ("".equals(new String(jpfPassword.getPassword()))) {
                // System.out.println("请输入密码！");
                JOptionPane.showMessageDialog(null, "请输入密码！");
            } else {
                temp = 1;
                tempId = jtfId.getText();
                tempPassword = new String(jpfPassword.getPassword());
            }

            if (temp == 1) {
                // 执行JDBC查询到教师的ID和密码
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = JDBCUtils.getConnection();
                    // JOptionPane.showMessageDialog(null, "数据库连接成功！");
                    System.out.println("教师登录：数据库连接成功！");
                    String sql = "select password from teacher where tno = ?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setString(1, tempId);
                    rs = pstmt.executeQuery();
                    while (rs.next()) {
                        tPassword = rs.getString(1);
                    }
                    // 如果工号输入错误/找不到对应的工号，则返回的rs为null，getString也为null
                    if (tempPassword.equals(tPassword)) {
                        teacherId = tempId;
                        JOptionPane.showMessageDialog(null, "登录成功！");
                        // 执行页面跳转
                        this.dispose(); // 关闭登录界面
                        new TeacherView(); // 弹出主页面
                    } else {
                        JOptionPane.showMessageDialog(null, "工号或密码错误！");
                        jtfId.setText("");
                        jpfPassword.setText("");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    // 释放资源
                    JDBCUtils.close(rs, pstmt, conn);
                }
            }
        }

        // 取消登录操作
        if (actionEvent.getSource() == btnCancel) {
            JOptionPane.showMessageDialog(null, "您已退出！");
            new TeacherSelect();
            this.dispose();
        } else if (actionEvent.getSource() == back) {
            new TeacherSelect();
            this.dispose();
        }
    }

    public static void main(String[] args) {
        new TeacherLogin();
    }

}
```

### TeacherView

```java
package com.company;

import javax.swing.*;
import javax.swing.event.TableColumnModelListener;
import javax.swing.plaf.basic.BasicArrowButton;
import javax.swing.table.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Enumeration;

public class TeacherView extends JFrame implements ActionListener {

    private JLabel welcome;

    private JLabel name;
    private JLabel id;
    private JLabel sex;
    private JLabel tName;
    private JLabel tId;
    private JLabel tSex;

    private JButton back;

    String teacherName = "";
    String teacherId = "";
    String teacherSex = "";

    private JLabel functionTip;
    private JButton btnAddQuestion;
    private JButton btnQueryScore;
    private JButton btnUpdateScore;

    // 学生信息表格查询
    private DefaultTableModel model;
    private JScrollPane jScrollPane;
    private JPanel jPanel3;
    private JTable jTable;
    Student[] students;

    public TeacherView () {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = JDBCUtils.getConnection();
            System.out.println("教师界面：数据库连接成功");
            String sql = "select tname,tsex from teacher where tno = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, TeacherLogin.teacherId);
            rs = pstmt.executeQuery();
            teacherId = TeacherLogin.teacherId;
            while (rs.next()) {
                teacherName = rs.getString("tname");
                teacherSex = rs.getString("tsex");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(rs, pstmt, conn);
        }

        welcome = new JLabel("教师主页面");
        back = new JButton("返回");
        back.addActionListener(this);
        JPanel jPanel1 = new JPanel();
        jPanel1.add(welcome);
        jPanel1.add(back);

        name = new JLabel("姓名：");
        id = new JLabel("工号：");
        sex = new JLabel("性别：");
        tName = new JLabel(teacherName);
        tId = new JLabel(teacherId);
        tSex = new JLabel(teacherSex);
        JPanel jPanel2 = new JPanel();
        name.setBounds(350, 70, 50, 30);
        tName.setBounds(400, 70, 200, 30);
        id.setBounds(350, 110, 50, 30);
        tId.setBounds(400, 110, 200, 30);
        sex.setBounds(350, 150, 50, 30);
        tSex.setBounds(400, 150, 200, 30);
        add(name);
        add(tName);
        add(id);
        add(tId);
        add(sex);
        add(tSex);
        functionTip = new JLabel("请选择您的操作：");
        btnQueryScore = new JButton("查询成绩");
        btnUpdateScore = new JButton("修改成绩");
        btnAddQuestion = new JButton("添加试题");
        functionTip.setBounds(350, 200, 200, 30);
        btnQueryScore.setBounds(350, 240, 100, 30);
        btnUpdateScore.setBounds(480, 240, 100, 30);
        btnAddQuestion.setBounds(610, 240, 100, 30);
        add(functionTip);
        add(btnQueryScore);
        add(btnUpdateScore);
        add(btnAddQuestion);
        btnQueryScore.addActionListener(this);
        btnUpdateScore.addActionListener(this);
        btnAddQuestion.addActionListener(this);

        jPanel3 = new JPanel();
        String[] columnName = {"姓名", "学号", "性别", "年龄", "成绩", "学院", "专业"};
        String[] columnWidth = {"80", "120", "40", "40", "40", "90", "90"};
        model = new DefaultTableModel();
        model.setColumnIdentifiers(columnName);

        jTable = new JTable(model);
        jTable.setBounds(280, 300, 500, 300);
        TableColumnModel tableColumnModel = jTable.getColumnModel();
        for (int i = 0; i < 7; i++) {
            TableColumn tableColumn = tableColumnModel.getColumn(i);
            tableColumn.setPreferredWidth(Integer.parseInt(columnWidth[i]));
        }
        DefaultTableCellRenderer cr = new DefaultTableCellRenderer();
        cr.setHorizontalAlignment(JLabel.CENTER);
        jTable.setDefaultRenderer(Object.class, cr);
        jScrollPane = new JScrollPane(jTable);
        add(jTable);
        jTable.setVisible(false);

        this.add(jPanel3, BorderLayout.SOUTH);
        this.add(jPanel1, BorderLayout.NORTH);
        this.add(jPanel2, BorderLayout.CENTER);

        this.setVisible(true);
        this.setTitle("学生在线考试系统_教师界面");
        this.setSize(1000, 700);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new TeacherView();
    }


    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == back) {
            this.dispose();
            new TeacherLogin();
        } else if (actionEvent.getSource() == btnQueryScore) {
            // btnQueryScore.setEnabled(false);
            /*Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
            this.setSize((int) screenSize.getWidth(), (int) screenSize.getHeight());*/
            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rs = null;
            try {
                int row = 0;
                conn = JDBCUtils.getConnection();
                String sqlQuery = "select sname, student.sno, ssex, sage, department, major, sc.score " +
                        "from student, sc " +
                        "where student.sno=sc.sno";
                String sqlRow = "select count(*) from student";
                pstmt = conn.prepareStatement(sqlRow);
                rs = pstmt.executeQuery();
                while (rs.next()) {
                    row = rs.getInt(1);
                }
                if (row == 0) {
                    JOptionPane.showMessageDialog(null, "没有学生记录！");
                } else {
                    model.setRowCount(0);
                    int countRow = 0;
                    String[] columnName = {"姓名", "学号", "性别", "年龄", "成绩", "学院", "专业"};
                    model.addRow(columnName);
                    jTable.setVisible(true);
                    pstmt = null;
                    rs = null;
                    students = new Student[row];
                    pstmt = conn.prepareStatement(sqlQuery);
                    rs = pstmt.executeQuery();
                    int i = 0;
                    while (rs.next()) {
                        students[i] = new Student();
                        students[i].studentName = rs.getString("sname");
                        students[i].studentId = rs.getString("sno");
                        students[i].studentSex = rs.getString("ssex");
                        students[i].studentAge = rs.getString("sage");
                        students[i].studentScore = rs.getInt("score");
                        students[i].studentDepartment = rs.getString("department");
                        students[i].studentMajor = rs.getString("major");
                        i ++;
                    }
                    for (int j = 0; j < i; j ++) {
                        model.addRow(new Object[]{students[j].studentName, students[j].studentId,
                        students[j].studentSex, students[j].studentAge, students[j].studentScore,
                        students[j].studentDepartment, students[j].studentMajor});
                    }
                    countRow = jTable.getRowCount();
                    jTable.setEnabled(false);
                    System.out.println(countRow);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                JDBCUtils.close(rs, pstmt, conn);
            }
        } else if (actionEvent.getSource() == btnUpdateScore) {
            new UpdateScore();
        } else if (actionEvent.getSource() == btnAddQuestion) {
            // 添加试题
            new AddQuestion();
        }
    }
}

class UpdateScore extends JFrame  implements  ActionListener{
    JLabel updateId = new JLabel("请输入要修改的学生学号：");
    JLabel updateScore = new JLabel("请输入要修改的成绩：");
    JTextField jtfId = new JTextField(20);
    JTextField jtfScore = new JTextField(20);
    JButton btnOk = new JButton("确认");
    JButton btnCancel = new JButton("取消");

    public UpdateScore () {
        JPanel jPanel = new JPanel();
        updateId.setBounds(350, 50, 200, 30);
        jtfId.setBounds(350, 80, 300, 25);
        updateScore.setBounds(350, 120, 200, 30);
        jtfScore.setBounds(350, 150, 300, 25);
        btnOk.setBounds(400, 400, 75, 30);
        btnCancel.setBounds(500, 400, 75, 30);
        add(updateId);
        add(jtfId);
        add(updateScore);
        add(jtfScore);
        add(btnOk);
        add(btnCancel);

        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        this.add(jPanel, BorderLayout.CENTER);
        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        /*this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);*/
    }

    public boolean isAllNumber (String s) {
        char[] str = s.toCharArray();
        for (char c : str) {
            if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == btnOk) {
            // 判断ID以及分数是否合理

            int isEmpty = 0;
            int isLegal = 0;

            String temp = "";
            String tempId = "";
            int tempScore = 0;

            temp = jtfScore.getText();
            tempId = jtfId.getText();

            if ("".equals(tempId)) {
                JOptionPane.showMessageDialog(null, "请输入学号！");
            } else if ("".equals(temp)) {
                JOptionPane.showMessageDialog(null, "请输入分数！");
            } else {
                isEmpty = 1;
            }

            if (isEmpty == 1) {
                if (isAllNumber(tempId)) {
                    char[] id = tempId.toCharArray();
                    if (id.length == 11) {
                        if (isAllNumber(temp)) {
                            tempScore = Integer.parseInt(jtfScore.getText());
                            if (0 <= tempScore && tempScore <= 100) {
                                isLegal = 1;
                            } else {
                                JOptionPane.showMessageDialog(null, "分数在0-100！");
                            }
                        } else {
                            JOptionPane.showMessageDialog(null, "分数应为数字！");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "学号为11位！");
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "学号应为数字！");
                }
            }

            if (isEmpty == 1 && isLegal == 1) {
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;

                try {
                    conn = JDBCUtils.getConnection();
                    System.out.println("修改分数：数据库连接成功！");
                    String sql = "update sc set score = ? where sc.sno = ?";
                    String sqlQuery = "select sno from sc where sc.sno = ?";
                    pstmt = conn.prepareStatement(sqlQuery);
                    int isExist = 0;
                    pstmt.setString(1, tempId);
                    rs = pstmt.executeQuery();
                    while (rs.next()) {
                        isExist ++;
                    }

                    if (isExist == 1) {
                        pstmt = null;
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setInt(1, tempScore);
                        pstmt.setString(2, tempId);
                        int count = pstmt.executeUpdate();
                        if (count == 1) {
                            System.out.println("修改成功！");
                            JOptionPane.showMessageDialog(null, "修改成功！");
                            this.dispose();
                        } else {
                            System.out.println("修改失败！");
                            JOptionPane.showMessageDialog(null, "修改失败！");
                            this.dispose();
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "您输入的学号不存在！");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    JDBCUtils.close(rs, pstmt, conn);
                }
            }
        } else if (actionEvent.getSource() == btnCancel) {
            this.dispose();
        }
    }
}


class AddQuestion extends JFrame implements ActionListener {
    String[] stringAnswer = {"-请选择-", "A", "B", "C", "D"};

    JLabel questionNum = new JLabel("请输入题号（不能重复）：");
    JLabel questionText = new JLabel("请输入题目内容：");
    JLabel questionAnswer = new JLabel("请选择题目答案：");

    JTextField jtfNum = new JTextField();
    JTextArea jtfText = new JTextArea(20, 40);
    JComboBox jcbAnswer = new JComboBox(stringAnswer);

    JButton btnOk = new JButton("确认");
    JButton btnCancel = new JButton("取消");

    public AddQuestion() {
        JPanel jPanel1 = new JPanel();
        questionNum.setBounds(350, 50, 200, 30);
        jtfNum.setBounds(350, 80, 300, 25);
        add(questionNum);
        add(jtfNum);
        JPanel jPanel2 = new JPanel();
        questionText.setBounds(350, 120, 200, 30);
        jtfText.setBounds(350, 150, 300, 200);
        add(questionText);
        add(jtfText);
        JPanel jPanel3 = new JPanel();
        questionAnswer.setBounds(350, 370, 200, 30);
        jcbAnswer.setBounds(350, 400, 300, 25);
        add(questionAnswer);
        add(jcbAnswer);
        btnOk.setBounds(400, 450, 75, 30);
        btnCancel.setBounds(500, 450, 75, 30);
        add(btnOk);
        add(btnCancel);
        btnOk.addActionListener(this);
        btnCancel.addActionListener(this);

        this.add(jPanel1, BorderLayout.NORTH);
        this.add(jPanel2, BorderLayout.CENTER);
        this.add(jPanel3, BorderLayout.SOUTH);

        this.setVisible(true);
        this.setSize(1000, 600);
        this.setResizable(false);
        this.setLocationRelativeTo(null);
        /*this.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);*/
    }

    public boolean isAllNumber (String s) {
        char[] str = s.toCharArray();
        for (char c : str) {
            if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {
        // 添加试题

        if (actionEvent.getSource() == btnOk) {
            /*Test[] addTests = new Test[1];*/
            String num = jtfNum.getText();
            String text = jtfText.getText();
            String answer = stringAnswer[jcbAnswer.getSelectedIndex()];
            int isEmpty = 0;
            int isSelect = 0;
            int isLegal = 0;
            if ("".equals(num)) {
                JOptionPane.showMessageDialog(null, "请输入题号！");
            } else if ("".equals(text)) {
                JOptionPane.showMessageDialog(null, "请输入题目！");
            } else if (jcbAnswer.getSelectedIndex() == 0) {
                JOptionPane.showMessageDialog(null, "请选择答案！");
            } else {
                isEmpty = 1;
                isSelect = 1;
            }

            if (isAllNumber(num)) {
                isLegal = 1;
            } else {
                JOptionPane.showMessageDialog(null, "您输入的题号不规范！");
            }

            if (isEmpty == 1 && isLegal == 1 && isSelect == 1) {
                // 开始连接数据库传入参数
                Connection conn = null;
                PreparedStatement preparedStatement = null;
                ResultSet rsQuery = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;

                int isExist = 0;
                try {
                    conn = JDBCUtils.getConnection();
                    String sqlQuery = "select * from test where num = ?";
                    System.out.println("查询题号存在：数据库连接成功！");
                    preparedStatement = conn.prepareStatement(sqlQuery);
                    preparedStatement.setInt(1, Integer.parseInt(num));
                    rsQuery = preparedStatement.executeQuery();
                    while (rsQuery.next()) {
                        isExist ++;
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } finally {
                    JDBCUtils.close(rsQuery, preparedStatement, conn);
                }

                if (isExist == 0) {
                    try {
                        conn = JDBCUtils.getConnection();
                        String sql = "insert into test(num, question, answer) " +
                                "values(?, ?, ?) ";
                        System.out.println("添加题目：数据库连接成功！");
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setInt(1, Integer.parseInt(num));
                        pstmt.setString(2, text);
                        pstmt.setString(3, answer);
                        int count = 0;
                        count = pstmt.executeUpdate();
                        if (count == 1) {
                            System.out.println("题目添加成功！");
                            JOptionPane.showMessageDialog(null, "题目添加成功！");
                            this.dispose();
                        } else {
                            JOptionPane.showMessageDialog(null, "题目添加失败！");
                        }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    } finally {
                        JDBCUtils.close(rs, pstmt, conn);
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "题号已经存在！");
                }

            }
        } else if (actionEvent.getSource() == btnCancel) {
            this.dispose();
        }
    }
}
```

