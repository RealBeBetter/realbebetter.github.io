(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{623:function(e,t,r){"use strict";r.r(t);var s=r(11),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h3",{attrs:{id:"_1-执行请求的操作时遇到错误-listener-refused-the-connection-with-the-following-error-ora-12505-tns-listener-doe"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-执行请求的操作时遇到错误-listener-refused-the-connection-with-the-following-error-ora-12505-tns-listener-doe"}},[e._v("#")]),e._v(" 1.执行请求的操作时遇到错误: Listener refused the connection with the following error: ORA-12505, TNS:listener doe......")]),e._v(" "),r("p",[e._v("这次的错误情况是因为本地变量没有创建，打开高级系统设置，在本地环境变量中创建新的环境变量。")]),e._v(" "),r("p",[e._v("用户名："),r("strong",[e._v("oracle_sid")])]),e._v(" "),r("p",[e._v("值："),r("s",[e._v("XSCJ")]),e._v("（设置成自己连接时候创建的sid填入的值）")]),e._v(" "),r("p",[e._v("之后这个问题得到了解决。")]),e._v(" "),r("hr"),e._v(" "),r("h3",{attrs:{id:"_2-状态-失败-测试失败-ora-28000-帐户已被锁定"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-状态-失败-测试失败-ora-28000-帐户已被锁定"}},[e._v("#")]),e._v(" 2.状态: 失败 -测试失败: ORA-28000: 帐户已被锁定")]),e._v(" "),r("p",[e._v("这次的问题是因为账户被锁定。这个时候我们需要去解锁账户。解决方法步骤如下：")]),e._v(" "),r("ol",[r("li",[r("p",[e._v("打开"),r("strong",[e._v("SQL Plus")]),e._v("，输入："),r("code",[e._v("/as sysdba")])])]),e._v(" "),r("li",[r("p",[e._v("之后连接成功就输入解锁代码："),r("code",[e._v("alter user USERNAME account unlock;")]),e._v("，输入之后按下回车，出现操作已完成即代表已经成功。")])])]),e._v(" "),r("hr"),e._v(" "),r("h3",{attrs:{id:"_3-ora-01017-用户名-口令无效-登录被拒绝"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-ora-01017-用户名-口令无效-登录被拒绝"}},[e._v("#")]),e._v(" 3.ora-01017: 用户名/口令无效; 登录被拒绝")]),e._v(" "),r("p",[e._v("这个时候碰见这个情况的解锁方法就是，修改密码之后重新登录。按照之前的步骤，首先打开"),r("strong",[e._v("SQL Plus")]),e._v("，输入下面的代码（每输入一行回车）：")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("/as sysdba\nalter user USERNAME identified by NEWPASSWORD;\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br")])]),r("p",[e._v("输入新的密码之后要记住，之后再在"),r("strong",[e._v("SQL Developer")]),e._v("口令处重新修改登录即可。")])])}),[],!1,null,null,null);t.default=a.exports}}]);