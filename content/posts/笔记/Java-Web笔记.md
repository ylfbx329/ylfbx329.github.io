---
title: 'Java Web笔记'
summary: Java Web笔记
date: 2022-12-18T10:51:54+08:00
categories: 笔记
# draft: true
---
# 第一章 Java Web概述

- JSP
  - 运行条件：JSP引擎、Java编译器和Java虚拟机
  - 运行过程
    - 第一步 代码转化
    - 第二步 编译
    - 第三步 用 Java 虚拟机执行编译文件，通过 Java 虚拟机将执行结果返回给 Web 服务器，并最终返回给客户端
  - 执行过程
    1. 浏览器向JSP服务器发出请求
    2. JSP服务器检查对应的Servlet源代码是否存在，若存在则继续，否则转至（4）
    3. JSP服务器检查JSP页面是否有更新，若存在更新则继续，否则转至（5）
    4. JSP服务器将JSP代码转译为Servlet的源代码
    5. JSP服务器将Servlet源代码编译后加载至内存执行
    6. 将结果返回至客户端
  - 注：
    - 编译成的 Servlet 类会常驻内存

# 第二章 HTML CSS

- 网页
  - URL 统一资源定位符
    - 协议://域名/资源目录
  - HTTP 超文本传输协议
- HTML
  - 页面标记
    - 不区分大小写
    - 定义页面元信息
      - `<meta name=“名称” content=“值”>` `<meta http-equiv=“名称” content=“值`
      - 搜索引挚
        - 关键词 `<meta name=“keywords” content=“软件开发,网站建设,网站开发”>`
        - 简单介绍 `<meta name=“description” content=“网页简介”>`
        - 作者 `<meta name=“author” content=“作者”>`
      - 页面内容格式 字符集
        - `<meta http-equiv=“Content-Type” content=“text/html;charset=gb2312”>`
      - 定期刷新 定时转向
        - `<meta http-equiv=“refresh” content=“5;url=http://www.163.com/”>`
      - 网页过期时间
        - `<meta http-equiv=“Expires” content=“Mon,12 October 2019 00:20:00 GMT”>`
        - 网页立即过期 `<meta http-equiv=“Expires” content=“0”>`
      - 清除缓存
        - `<meta http-equiv=“Cache-Control” content=“no-cache”>`
        - 禁止浏览器从本地机的缓存中调阅页面内容 `<meta http-equiv=“pragma” content=“no-cache”>`
    - 网页标题 `<title>`
    - 链接默认地址或目标 `<base>`
    - 资源链接 `<link>`
      - `<link rel=”stylesheet” href=”.css” type=”text/css” />`
    - 背景色彩 文字色彩
      - `<body bgcolor=# text=# link=# alink=# vlink=#>`
      - bgcolor --- 背景色彩
      - text --- 非可链接文字的色彩
      - link --- 可链接文字的色彩
      - alink --- 正被点击的可链接文字的色彩
      - vlink --- 已经点击(访问)过的可链接文字的色彩
      - #rrggbb --- 16 进制 RGB值
    - 背景图象
      - `<body background="image-URL">`
    - 超链接标签 `<a href="" target=""></a>`
      - 语义：定义超链接
      - 属性：
        | 属性   | 作用                                                            |
        | ------ | --------------------------------------------------------------- |
        | href   | 指定目标 url 地址、打开指定文件、必须属性                       |
        | target | 目标页面打开方式 `_self` 默认当前页面打开 `_blank` 新标签页打开 |
      - 链接分类
        | 类型         | 说明                         | 示例                                               |
        | ------------ | ---------------------------- | -------------------------------------------------- |
        | 外部链接     | 外部网站链接                 | `href="https://www.baidu.com"`                     |
        | 内部链接     | 网站内部其他网页链接         | `href="index.html"`                                |
        | 空链接       | 未确定的链接目标             | `href="#"`                                         |
        | 下载链接     | 下载文件                     | `href="img.zip"`                                   |
        | 网页元素链接 | 给各种网页元素添加超链接     | `<a href=""><img src="" /></a>`                    |
        | 锚点链接     | 快速定位到当前页面的某一位置 | `<a href="#标签 id"></a>` `<h1 id="标签 id"></h1>` |
    - 标尺线
      - `<hr size=# color=#>`
  - 字体标记
    - 标题字体 `<h1>~<h6>`
    - 字体大小 `<font size=#>`
    - 物理字体 逻辑字体
      - 粗体 `<b>` `<strong>`
      - 斜体 `<i>` `<em>`
      - 下划线 `<u>`
      - 删除线 `<s>`
      - 电传打字 `<tt>`
      - 上标 `<sup>`
      - 下标 `<sub>`
    - 字体 `<font face="#, #, ..., #">`
  - 文字布局
    - 行控制
      - 自然段 `<p>`
      - 换行 `<br>`
      - 不换行 `<nbr>`
    - 对齐
      - 属性 `align=left, center, right`
      - 标签 `<center>`
      - 分区 `<div>` `<span>`
      - 列表
        - 无序列表 `<ul>`
        - 有序列表 `<ol>`
        - 自定义列表 `<dl>`
  - 图像标签 `<img src="" alt="" border=1>`
  - 表格标签
    - `<table>` `<tr>` `<th>` `<td>`
    - 合并 `<td colspan=# rowspan=#>`
  - 会移动的文字 Marquee
    - `<marquee direction=left, right bihavior=scroll, slide, alternate>`
  - 背景音乐
    - `<bgsound src=URL loop=3>`
  - 视频
    - `<video>`
  - 多媒体窗口
    - `<iframe>`
  - 表单
    - `<form action=“URL" method="POST">`
    - 输入框 `<input type="#" name="" .... >`
      - type Text, Radio, Checkbox, Password, Submit/Reset, Image, File, Hidden, Button
    - 下拉列表 `<select>`
      - 选项 `<option>`
    - 文本块 `<textarea>`
- CSS [CSS笔记]()

# 第三章 JavaScript

- 基于对象编程
- 标识符
  - 大小写不敏感
- 事件
- 对象
  - String
    - length
    - indexOf(charactor,fromIndex)
    - substring(start,end)
    - charAt(n)
    - toLowerCase()
    - toUpperCase()
  - Date
    - var now = new Date()
    - getYear() setYear()
    - getDate()
    - getDay()
    - getSeconds()
    - getTime()
  - Math
    - LN10
    - LN2
    - PI
    - SQRT1-2
    - SQRT2
    - abs(x)
    - sin(x),cos(x)
    - sqrt(x)
    - floor(x)
    - log(x)
    - pow(base,exponent)
    - random()
  - Array
    - length
    - concat()
    - join(string)
    - pop()
    - push(value)
    - reverse()
    - sort()
    - toString()
    - valueOf()
  - Window
- 全局函数
  - parseInt() 将字符串转换为整数
  - String() 将对象转换为字符串
  - eval("") 计算某个字符串，并执行其中的的 JavaScript 代码
- DOM 文档对象模型
  - document.getElementById(“id名”)
  - document.getElementsByName(“name名”)
  - document.getElementsByTagName(”标记名”)
  - .innerHTML = new HTML
  - .attribute = new value
  - .style.property = new style
  - 新增元素
    - 1
      - var tag = document.createElement(“html标记")
      - var node = document.createTextNode(“内容")
      - tag.appendChild(node)
    - 2
      - var ele = document.getElementById(“元素id”)
      - ele.appendChild(tag)
  - 删除元素
    - var 母节点变量名=document.getElementById ("母标记id名");
    - var 子元素变量=document.getElementById ("子标记id名");
    - 母节点变量名.removeChild(子元素变量)
- BOM 浏览器对象模型
  - window 浏览器窗口
    - 全局对象、函数以及变量均自动成为 window 对象的成员
    - DOM 的 document 也是 window 对象的属性
    - 方法
      - alert() 提示信息和“确定”按钮
      - close() 关闭当前浏览器窗口
      - confirm() 对话框，包括问号图标、提示信息、“确定”按钮和“取消”按钮
      - open() 打开一个新的浏览器窗口，且加载由其 URL 参数指定的 HTML 文档
      - Prompt() 输入对话框，包括提示信息和输入框
      - SetTimeout() 定时执行某个函数或命令
  - history 浏览器的历史
    - back() 后退
    - forward() 前进
    - go(n) 根据n的正负觉得前进或后退
  - navigator 浏览器的信息
- 正则表达式
  - 定义 var 模式对象 = new RegExp(/模式/)
  - 执行
    - test("待查找字符串") 是否含有模式字符串 true|false
    - exec("待查找字符串") 检索制定字符串中的模式 String|null

# 第四章 Jquery

- JavaScript函数库
- 入口函数
  - 在文档全部 DOM 对象被加载完之后，组织 Jquery 代码执行（回调函数）
  -

    ```js
    $(document).ready(function(){
      // 开始写 jQuery 代码... 
    })

    $(function(){
      // 开始写 jQuery 代码... 
    })
    ```

- 语法 `$(selector).action( )`
- selector
  - : 种类
  - [] 属性
- action
  - dblclick() 双击
  - hover() 悬停
  - focus() 获得焦点
  - blur() 失焦
  - toggle() 切换 hide() 和 show() 方法
  - fadeIn() 淡入
  - text() 返回所选元素的文本内容
  - html() 返回所选元素的内容（包括 HTML 标记）
  - val() 返回表单字段的值
  - css(“属性名”) 获取匹配的css样式的属性
  - css(“属性名”，“属性值”) 为匹配属性设定值
  - attr(“属性名”) 获取匹配属性
  - attr(“属性名”，“属性值”) 为匹配属性设定
  - append(“添加元素1”) 在被选元素的结尾插入内容
  - prepend() 在被选元素的开头插入内容
  - after() 在被选元素之后插入内容
  - before() 在被选元素之前插入内容
  - remove() 删除被选元素
  - empty() 从被选元素中删除子元素
  - bind(“事件”,函数) 触发事件时，执行函数
  - on(“事件”,函数) Jquery1.7以后用on方法

# 第五章 JSP

- 注释
  - HTML注释 `<!-- comment [ <%= expression %> ] -->`
  - 隐藏注释 `<%-- comment --%>`
- 执行元素
  - 编译指令
    - 引入类，字符集，编译语言
    - page指令
      - `<%@%>`
      - 定义整个JSP页面的属性和相关功能，并和JSP引擎进行通信
      - 可以包含多个 相互独立
      - 除import属性之外的每个属性只能定义一次
      - `language="java"` 脚本语言的种类，暂时只能用“java”
      - `extends="package.class“` 要继承的父类，默认父类是HttpJspBase，完整路径
      - `import="java.io.*,java.util.Hashtable"`
        - 默认情况下已经被加入 java.lang.*;、java.servlet.*;、java.servlet.jsp.*;和java.servlet.http.*;
      - `isErrorPage="true"` 设定当前的JSP页面是否作为传回错误页面的网页，默认值是“false”
      - `errorPage=“/error.jsp"` 设定当JSP页面出现异常（Exception）时，所要转向的页面
      - `contentType = "text/html"` 传回网页的文件格式及编码方式
      - `isTreadSafe` web服务器执行JSP程序的方式，默认“true”多线程的方式执行jsp页面
      - `session` 是否用到session对象
    - include指令\
      - `<%@include file="relativeURL"%>`
      - 定义JSP编译时需要插入的资源
    - taglib指令
      - `<%@taglib uri="taglibURI" prefix="tagPrefix"%>`
      - 定义JSP页面可以调用的一个客户标记库
      - uri 标签描述文件和标签库的路径
      - tagPrefix JSP页面里要引用该标签时的前缀
  - 操作指令
    - 动态执行，根据某个条件动态跳转
    - jsp:include指令
      - `<jsp:include page="relativeURL|<%=expression%>" flush="true|false"/>`
      - 功能和include指令相同
      - flush 默认值为false，为true则表示当缓冲区满时，缓冲区将被清空
    - jsp:forward指令
      - `<jsp:forward page="relativeURL|<%=expression%>" />`
      - 客户端不会显示转发后的页面地址
      - 站内跳转
    - jsp:param指令
      - `<jsp:param name="paramName" value="paramValue"/>`
      - 可以按照“名字/值”的形式进行参数传递
      - 独立于`<jsp:include> <jsp:forward>`这些操作将没有任何作用
    - jsp:useBean指令
      - `<jsp:useBean id="name" scope="page | request | session | application“ class="classname"/>`
      - 引入JavaBean
      - id 对象名
      - scope 存在的范围
        - Page 表示JavaBean实例的生命周期只在一个页面里，只能在一个页面中存取它
        - Request Page+`<jsp:include>`+`<jsp:forward>` 是相邻的2个页面有效
        - Session：Session，浏览器停止浏览一定时间（一般30 min）后结束
        - Application：Application，Tomcat服务器不重新启动，永远存在于服务器的内存
    - jsp:setProperty指令
      - `<jsp:setProperty name="beanname" property="*">`
        - 表单name与属性一一对应
      - `<jsp:setProperty name="beanname" property="propertyname" param="paramname">`
        - 表单paramname赋值给propertyname
      - `<jsp:setProperty name="beanname" property="propertyname" value="beanvalue">`
        - 属性值为beanvalue
    - jsp:getProperty指令
      - `<jsp:getProperty name="beanname" property="propertyname">`
      - name 对象名
      - propertyname 属性名
    - jsp:plugin指令
      - 根据浏览器的类型，插入通过Java插件 运行Java Applet所必需的Object或embed元素
  - Java Web代码
    - 声明 `<%! 变量、函数或方法 %>`
    - 脚本代码 `<% Java 代码 %>`
    - 表达式 `<%=Java 表达式%>`
- 内建对象
  - request
    - 标头（Header）信息、请求的方式、请求的参数名称和参数值、客户端的主机名称
    - getParameter(String strTextName) 获取表单提交的信息
    - getRemoteAddr() 获取客户的IP地址
    - getParameterNames() 获取客户端提交的所有参数的名字
    - String[] getParameterValues(String name) paramName请求参数的值
    - setAttribute(String attName , Object attValue)
    - Object getAttribute(String attName)
    - request.setCharacterEncoding(“汉字编码”)
  - response
    - response.sendRedirect(“URL”) 重定向页面
      - 任意的网址跳转
    - Response.setHeader(“Refresh”, “时间”) HTTP文件头相应
    - response.setContentType(“文档格式”;charset=编码方式) 动态ContentType响应
      - text/plain(文本文件)
    - 清除页面缓冲区
      - response.setHeader("Pragma", "no-cache")
      - response.setHeader("Cache-Control", "no-cache");
      - response.setDateHeader("Expires", -1);

  - out
    - clear()：清除缓冲区中的内容，不将数据发送至客户端。
    - clearBuffer()：清除缓冲区中的内容，并将数据发送至客户端。
    - close()：关闭输出流。
    - flush()：输出缓冲区中的数据。
    - getBufferSize()：获取缓冲区的大小。
    - getRemaining()：获取缓冲区的剩余空间。
    - newLine()：输出一个换行字符，换一行。
    - print()：显示各种数据类型的内容。
    - println()：分行显示各种数据类型的内容
  - session
    - getID() 获得session的ID
    - setAttribute()
    - getAttribute()
      - 返回的时候需要强制转换为原来的类型
    - removeAttribute(String name)
  - application
    - setAttribute()
    - getAttribute()
      - 返回的时候需要强制转换为原来的类型
    - removeAttribute(String name)
  - config Servlet初始化时所要用到的参数及服务器的有关信息
  - pageContext 取得任何范围的参数
  - page 指代JSP页面本身
  - exception isErrorPage="true"
  - cookie
    - Cookie 对象名=new Cookie(“变量名”，值)
    - response.addCookie(“对象名”)
    - Cookie[] 数据变量名=request.getCookies()
- HTTP常见错误代码
  - 401：验证错误tomcat登录验证
  - 404：访问资源不存在
  - 405：servlet错误
  - 500：语法编译错误
  - 错误信息定制：编写显示错误的页面和 设置web.xml

# 第六章 JDBC

- SQL
  - INSERT 语句
    - 语法 `INSERT INTO table_name (field1, field2, ...fieldN) VALUES (value1, value2, ...valueN);`
  - UPDATE 语句
    - 语法 `UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause];`
  - 查询语句
    - 语法 `SELECT column_name,column_name FROM table_name [WHERE Clause] [LIMIT N][ OFFSET M]`
  - DELETE 语句
    - 语法 `DELETE FROM table_name [WHERE Clause];`
  - like
    - _ 匹配一个任意字符
    - % 匹配任意多个字符
  - ORDER BY
    - 默认升序
    - 倒序 ORDER BY column_name desc
    - 前五条记录 SELECT top 5 * FROM grade
  - 聚合函数
    - sum(column_name)
    - avg(column_name)
    - count(*) 返回记录的行数
    - max(column_name)
    - min(column_name)
- JDBC
  - 依赖引入
    - 单项目
    - 所有项目
  - 加载驱动
    - `Class.forName(“ com.mysql.jdbc.Driver”)`
    - `Class.forName(“oracle.jdbc.driver.OracleDriver”)`
  - Connection对象
    - `conn = DriverManager.getConnection(URL, USER, PASSWORD);`
    - `close()`
  - Statement对象
    - Statement 发送基本的sql语句
      - public ResultSet executeQuery(String sql) throws SQLException
        - SELECT语句
        - 产生单个ResultSet
      - public int executeUpdate(String sql) throws SQLException
        - 执行INSERT、UPDATE或DELETE语句，CREATE TABLE和DROP TABLE
        - 受影响的行数
    - PreparedStatement 发送带有参数的sql语句
    - CallableStatement 调用数据库中的存储过程
  - PreparedStatement对象
    - SQL语句经过预编译后存储在PrepareStatement对象当中，可以用来进行高效的多次执行
    - `Public PreparedStatement preparedStatement(String sql) throws SQLException`
    - `Public void setInt(int parameterindex,int x) throws SQLExecption` 将第parameterindex个参数赋值为x
    - addBatch() 方法将其加到一个批次作业
    - executeBatch() 执行所有加入批次的作业
  - ResultSet对象
    - next()
    - getxxx(String columnName)
    - getxxx(int columnIndex)
  - 分页
    - `Statement createStatement(int resultSetType, int resultSetConcurrency)`
    - resultSetType 结果集类型
      - ResultSet.TYPE_FORWORD_ONLY 指定ResultSet对象是不可滚动，这是默认值
      - ResultSet.TYPE_SCOLL_INSENSITIVE 指定ResultSet对象是可滚动的，但是对数据库中修改不敏感
      - ResultSet.TYPE_SCOLL_SENSITIVE 指定ResultSet对象是可滚动的，而且对数据库的修改敏感
    - resultSetConcurrency 结果集并发性
      - 决定ResultSet对象是否可以修改数据库中的行
      - ResultSet.CONCUR_READ_ONLY 指定ResultSet对象不能修改数据库，默认值
      - ResultSet.CONCUR_UPDATABLE 指定ResultSet对象可以修改数据库

# 第七章 JavaBean Servlet

- JavaBean
  - 特点
    - 可以实现代码的重复利用，因此可以缩短开发时间
    - 易编写，易维护、易使用
    - 可以在任何安装了Java运行环境的平台上使用，而不需要重新编译，为JSP的应用带来了更多的可扩展性
  - 定义
    - get set
    - 方法的访问属性必须是public的
    - 如果有构造方法，必须是public的，而且无参数（用于初始化工作）
- Servlet
  - 特点
    - 方便、实用的API。针对HTTP的请求提供了丰富的API
    - 高效的处理方式。Servlet的一个实例对象可以处理多个线程的请求
    - 跨平台
    - 更加灵活、扩展。支持封装、集成等面向对象的有点
    - 安全性。采用了Java的安全框架，同时Servlet容器还为Servlet提供了额外的功能，安全性高
  - 类图
    - 包 javax.servlet javax.servlet.http
    - 接口类
      - Servlet Servlet API的核心
        - 所有Servlet类都必须实现
        - init()、service()、destroy()
      - GenericServlet抽象类 Servlet接口提供了通用实现
        - HttpServlet抽象类 提供与HTTP有关的通用实现
      - ServletRequest接口 表示来自客户端的请求
        - HttpServletRequest接口 提供用于读取HTTP请求中相应信息的方法
      - ServletResponse接口 生成响应结果
        - HttpServletResponse接口 向客户端响应HTTP头或Cookie等
  - 执行过程
    - 客户向服务器发送对页面的请求。
    - 如果Servlet还没有装入，服务器就装入它。
    - 服务器把请求信息送给Servlet，给每一个请求创建一个执行的新线程（Java语言的线程允许同时执行多个任务)。
    - Serlvet处理这个请求，生成一个响应并传递给服务器。
    - 服务器把响应送回给客户。
  - 生命周期
    - 初始化事件
    - 执行——处理请求和响应
    - 终止事件或卸载
  - 基本程序的结构
    - 实现javax.servlet.Servlet接口
      - 一般选择继承这个接口的实现类javax.servlet.HttpServlet
    - init()(初始化)
    - service()(处理请求，具体由doGet()和doPost()方法实现)
    - destroy()(销毁)
    - doGet()
    - doPost()
    - HttpServletRequest类的request对象
    - HttpServletResponse类的response对象
- Servlet过滤器
  - 接口
    - Filter接口 定义一个过滤器对象时实现此接口
    - FilterChain接口 将过滤器处理的清酒或响应传递给下一个过滤器对象
    - FilterConfig接口 获取过滤器初始化期间的参数信息
  - 实现
    - `public void init(FilterConfig filterConfig)`
      - filter对象只会创建一次，init方法也只会执行一次
    - `public void doFilter (ServletRequest, ServletResponse, FilterChain)`
    - `public void destroy()`
      - 释放Servlet过滤器占用的资源
  - 配置

    - ```xml
      <!--编码 filter-->
      <filter>
          <filter-name>CharacterEncodingFilter</filter-name>
          <filter-class>com.edu.nefu.filter.CharacterEncodingFilter</filter-class>
          <init-param>
              <param-name>encoding</param-name>
              <param-value>UTF-8</param-value>
          </init-param>
          <init-param>
              <param-name>forceEncoding</param-name>
              <param-value>true</param-value>
          </init-param>
      </filter>
      <filter-mapping>
          <filter-name>CharacterEncodingFilter</filter-name>
          <url-pattern>/*</url-pattern>
      </filter-mapping>
      ```
