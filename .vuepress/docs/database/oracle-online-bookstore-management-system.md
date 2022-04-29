---
title: 【Oracle】Oracle实现网上书店管理系统
date: 2021-09-12 16:38:12
tags:
- Database
- Oracle
---

需求分析：

需要有图书管理、图书查询、图书添加、库存、图书修改、图书删除等功能。

## 数据表

### Book表

| 字段名     | 数据类型 | 长度 | 约束条件 | 注释     |
| ---------- | -------- | ---- | -------- | -------- |
| bookId     | varchar  | 50   | not null | 图书编号 |
| bookName   | varchar  | 50   | not null | 图书名称 |
| bookAuthor | varchar  | 50   | not null | 作者     |
| bookType   | varchar  | 50   |          | 出版社   |
| bookPrice  | varchar  | 50   |          | 价格     |
| bookNumber | varchar  | 150  |          | 简介     |

### BookAdmin表

| 字段名    | 数据类型 | 长度 | 约束条件 | 注释       |
| --------- | -------- | ---- | -------- | ---------- |
| adminName | varchar  | 20   | not null | 管理员名   |
| adminPass | varchar  | 20   | not null | 管理员密码 |







**建立表格代码**

```sql
create table manager(
managerid number primary key,				-- 管理员ID
phone varchar2(11) not null,				-- 管理员手机
password varchar2(20) not null				-- 管理员密码
);

create table cate(
cateid number primary key not null,			-- 类别编号
cateinfo varchar2(20) not null,				-- 类别信息
catename varchar2(20) not null				-- 类别名字
);

create table book(
bookid number primary key not null,			-- 书籍编号
writer varchar2(20) not null,				-- 作者
press varchar2(20) not null,				-- 出版社
pubtime date not null,						-- 出版时间
booknumber number not null,					-- 书籍数量
cateid number not null,						-- 类别编号
price number(5,2) not null,					-- 书籍价格
bookname varchar2(50) not null,				-- 书籍名称
foreign key(cateid) references cate(cateid)
);

create table express(
orderid number primary key not null,					-- 订单编号
expressid varchar2(20),									-- 物流单号
expresscompany varchar2(10) not null					-- 物流公司
);

create table userinfo(
userid number primary key,						-- 用户编号
password varchar2(20) not null,					-- 用户密码
username varchar2(4) not null,					-- 用户姓名
address varchar2(100) not null,					-- 用户地址
phone varchar2(11) not null						-- 用户电话
);

create table orderinfo(
orderid number primary key not null,-- 订单编号
ordertime date not null,						-- 订单时间
userid number not null,							-- 用户ID
bookid number not null,							-- 书籍ID
booknum number default 1,		  	   	-- 数量
state varchar2(10) default '等待' check(state in('等待','执行','完成')) ,		-- 订单状态
totalprice number,
foreign key(userid) references userinfo(userid),
foreign key(bookid) references book(bookid) 
);

create table cart
(
bookid number primary key,
booknum number,
userid number,
foreign key (userid) references userinfo(userid),
foreign key (bookid) references book(bookid)
);


create sequence seq_t_dept
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 50

create or replace trigger dept_trig
    before insert on orderinfo
    for each row
declare
begin
    select seq_t_dept.nextval into :new.orderid from dual;
end dept_trig;

create table orderinfo(
orderid number primary key not null,-- 订单编号
ordertime date not null,						-- 订单时间
userid number not null,							-- 用户ID
bookid number not null,							-- 书籍ID
booknum number default 1,		  	   	-- 数量
state varchar2(10) default '等待' check(state in('等待','执行','完成')) ,		-- 订单状态
totalprice number
);

create or replace trigger update1
  before insert on orderinfo
  for each row
  declare
     buyid number;
     buynum number;
 begin
  buyid:=:new.bookid;
  buynum:=:new.booknum;
  update book set booknum=booknum-buynum
  where book.bookid=buyid;
 end;
```

任务：



1.创建两个用户的两个主页面（注册、登录）

2.用户进入主界面，查找出所有的图书，显示出图书信息、数量、价格等

3.用户下单，计算价格，购物车结算



4.管理员主页面

5.管理员实现的功能：修改库存，商品上架下架，修改订单状态，商品发货（上传物流信息ware表格）

6.触发器：当管理员上传订单物流之后，直接触发订单状态，将“等待“修改为 “执行”









