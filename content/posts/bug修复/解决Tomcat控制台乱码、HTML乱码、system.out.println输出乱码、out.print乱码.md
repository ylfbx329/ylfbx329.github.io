---
title: 'Tomcat控制台乱码、HTML乱码、system.out.println输出乱码、out.print乱码'
summary: 解决Tomcat控制台乱码、HTML乱码、system.out.println输出乱码、out.print乱码问题的详细教程
date: 2023-06-20T11:06:59+08:00
categories: Bug修复
# draft: true
---
# 开发环境

JDK8、IDEA 2023.1.2 (Ultimate Edition)、Tomcat 9.0.71

# Tomcat控制台乱码

第一步：修改Tomcat目录下的 `./conf/logging.properties` 文件，将3处UTF-8改为GBK，分别对应下图 IDEA 中的3个控制台的输出
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6a6244b153f6d44e387c793bbbafe5c1.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4d3e4883dce87be522ff572eb402351b.png)
第二步：删掉无用设置：删掉IDEA自定义VM选项的 `-Dfile.encoding=UTF-8` ，删掉IDEA中Tomcat运行配置的虚拟机选项和传递的环境变量
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b679739128b5c8819a1273145a4a27b1.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a7fbb75c23415f036c240e7b1b35a58b.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d0c2a839f9dfe5bde4448c5b21744b20.png)

# HTML 乱码、system.out.println输出乱码、out.println乱码

第一步：IDEA 设置：文件->设置->搜索”编码“（未安装中文插件时搜索”encoding“），按如下设置，全部统一为UTF-8
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2f68cf246ae89a4202a59ad481b74744.png)
第二步：在 `web.xml` 中写入以下这段设置，使得servlet读取html时使用utf-8

```xml
    <!--HTML按UTF-8加载，默认为GBK-->
    <jsp-config>
        <jsp-property-group>
            <url-pattern>*.html</url-pattern>
            <page-encoding>UTF-8</page-encoding>
        </jsp-property-group>
    </jsp-config>
```

第三步：HTML文档指定charset为UTF-8：`<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">` 或 `<meta charset="UTF-8">` 都可以，然后注意查看HTML文档的右下角编码格式是否正确。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2c6895ca461eccc9a5625a9568c2b32e.png)
第四步：servlet跳转语句之前设置文件类型和编码 `response.setContentType("text/html;charset=utf-8");`，这样保证了out.print的编码为UTF-8
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d85732d1e96b79a80a91a0d29dc6f109.png)
第五步：删掉无用设置：删掉IDEA自定义VM选项的 `-Dfile.encoding=UTF-8` ，删掉IDEA中Tomcat运行配置的虚拟机选项和传递的环境变量
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b679739128b5c8819a1273145a4a27b1.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a7fbb75c23415f036c240e7b1b35a58b.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d0c2a839f9dfe5bde4448c5b21744b20.png)

# 总结

- Tomcat控制台乱码容易解决，只需要修改文件里的三个UTF-8为GBK即可
- HTML乱码、system.out.println输出乱码、out.print乱码的原因为文件、servlet、浏览器三者对数据流的编解码不同。第一步统一文件编码保证了基础，第二步修改web.xml文件改变了jsp即servlet读取html文件的编码格式（默认为GBK，与地区有关，所以如果将HTML的meta标签的charset设置为GBK则不会乱码，但是推荐统一为UTF-8），第三步写meta标签保证了浏览器的展示编码为UTF-8，第四步指定了out对象打印输出的编码并规定了浏览器展示的文件类型和编码，第五步的设置对于处理本文提到的乱码没有实质性作用，故删除，保留IDEA自定义VM选项的 `-Dfile.encoding=UTF-8` 会导致Tomcat控制台输出乱码，保留`JAVA_OPTS`或`JAVA_TOOL_OPTIONS`变量传递会导致out.print打印输出乱码

放一张乱码对照表，可自行判断错误情况
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1cbf3dead3c02938f9d819811fe1d2d4.png)

# 若未解决问题，强烈推荐阅读以下两篇文章，能全面解决您的乱码问题，了解背后的原理

- [Servlet请求转发至html页面中文乱码问题与分析](https://www.cnblogs.com/Cl0ud/p/15322455.html)
- [关于Servlet，JSP，HTML中文乱码的问题](https://blog.csdn.net/qq_27368993/article/details/83616090)
