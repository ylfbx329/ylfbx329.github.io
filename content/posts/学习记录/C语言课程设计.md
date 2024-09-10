---
title: 'C语言课程设计'
summary: C语言课程设计学习记录
date: 2021-06-22T01:00:43+08:00
categories: 学习记录
# draft: true
---

# 课设记录

## 6月21日

### 学习内容

1. 确定课题主题 **《基于socket编程的网络订餐系统》**
2. 确定编程环境 Windows 10系统，vs code (version 1.57)
3. 借鉴前人所做订餐系统：
   - [数据库设计——订餐系统](https://blog.csdn.net/weixin_44091134/article/details/115069433?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162426015516780261931878%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162426015516780261931878&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-2-115069433.pc_search_result_cache&utm_term=cyuya%E8%AE%A2%E9%A4%90&spm=1018.2226.3001.4187) 明确各个对象关系，了解各个对象的基本成员变量，了解大概的程序结构图，了解实践报告的书写样式
   - [订餐管理系统](https://blog.csdn.net/u011256974/article/details/89198342?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162426015516780261931878%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162426015516780261931878&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-6-89198342.pc_search_result_cache&utm_term=cyuya%E8%AE%A2%E9%A4%90&spm=1018.2226.3001.4187) 引入管理员身份，设计注册和登录界面，有密码验证环节
4. 学习Socket原理 [Socket原理](https://blog.csdn.net/pashanhu6402/article/details/96428887?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162426078616780274133060%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=162426078616780274133060&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-96428887.pc_search_result_cache&utm_term=soxket&spm=1018.2226.3001.4187) 原理有这一篇就够了！
5. 找到Windows下socket编程的关键头文件 `winsock2.h`，了解其与 `winsock.h` 的区别
6. 发现Linux下socket编程的关键头文件 `sys/socket.h` 和 `sys/types.h` （在Windows下的`mingw64`文件夹内未找到）[基于C的计算机网络编程](https://www.bilibili.com/video/BV1pX4y1N7T4?p=21&spm_id_from=pageDriver)
7. 将socket服务端和客户端封装 [C/C++网络编程，从socket到epoll](https://www.bilibili.com/video/BV11Z4y157RY?p=18)
8. 解决Windows无法使用 `sys/socket.h` 和 `sys/types.h` 的问题 [在windows上使用sys/socket.h函数](https://m.jb51.cc/windows/372594.html)
9. 发现针对socket编程的对口视频 [windows网络编程：第一部分tcp/ip](https://www.bilibili.com/video/BV1cb411w7sZ?p=6)
10. 变更vs code终端为外部终端，并解决自动退出问题，变更`launch.json`中`program`的值为`"C:\\Windows\\system32\\cmd.exe"`，`args`的值为`"/C","${fileDirname}\\${fileBasenameNoExtension}.exe","&","pause"` [VS Code中C/CPP的完美配置](https://www.bilibili.com/read/cv5859441/)
11. 找到socket编程服务端和客户端的应用样例讲解视频 [Windows下Winsock网络编程的简单使用](https://www.bilibili.com/video/BV1s7411z7jK?from=search&seid=10502412387665349610)
12. 了解pragma预处理指令 [#pragma comment的使用方法 pragma预处理指令详解](https://blog.csdn.net/qq_35624156/article/details/79864947)
13. 了解 `dll` 的含义
14. 找到网络编程的合适视频 [Windows 网络编程开发实战 C/C++实现](https://www.bilibili.com/video/BV1G4411C7K2?p=1)
15. 根据样例讲解视频和教学视频了解各语句和含义 [MAKEWORD(2,2)解释](https://blog.csdn.net/happy_xiahuixiax/article/details/72637370) ，[WSAStartup( )详解](https://blog.csdn.net/m0_37624078/article/details/81217834) <--是一篇极好的文章！
16. 查看编译器文件时发现 `##` 符号，查询其含义 [VC #define EC(x) L##x 作用说明](https://blog.csdn.net/testcs_dn/article/details/18734197)

### 今日总结

感谢cjj大佬的提点，明确了设计方向。学习新技术的开端是极其痛苦的，尤其是第一门离现学知识比较远的技术，而且自学更是苦海作舟。但坚持啃下第一块硬骨头后就会豁然开朗，发现各种教程资料伸手就来，满眼皆是。之后的学习就要把这股冲劲压下去，沉稳地脚踏实地钻研学习技术，认真实践，加强动手。
明天要把找到的技术资源尽快地融入到课程设计程序中去，构思清楚成品的结构设计图，有针对性地去加强学习，以求解决实际问题。
晚安！

## 6月22日

### 学习内容

1. 编写第一个socket套接字程序

    ```c
    // 服务端
    #include <stdio.h>
    #include <string.h>
    #include <winsock2.h>
    int main()
    {
        // 初始化DLL
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
        // 创建套接字
        SOCKET serverSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        // 绑定套接字
        struct sockaddr_in socketaddr;
        ZeroMemory(&socketaddr, sizeof(socketaddr));
        socketaddr.sin_family = AF_INET;
        socketaddr.sin_addr.S_un.S_addr = inet_addr("10.191.81.110");
        socketaddr.sin_port = htons(1234);
        bind(serverSocket, (struct sockaddr *)&socketaddr, sizeof(socketaddr));
        // 进入监听模式（不阻塞）
        listen(serverSocket, 20);
        // 接收客户端请求（阻塞）
        struct sockaddr clientaddr;
        int size = sizeof(clientaddr);
        SOCKET clientsocket = accept(serverSocket, &clientaddr, &size);
        // 信息传递
        printf("Connect Ready!\n");
        char serverReceive[512] = {0};
        char serverSend[512] = {0};
        while (1)
        {
            memset(serverReceive, 0, sizeof(serverReceive));
            memset(serverSend, 0, sizeof(serverSend));
            scanf("%s", serverSend);
            send(clientsocket, serverSend, strlen(serverSend), 0);
            recv(clientsocket, serverReceive, 512, 0);
            printf("%s\n", serverReceive);
        }
        // 关闭套接字
        closesocket(clientsocket);
        closesocket(serverSocket);
        // 关闭DLL
        WSACleanup();
        return 0;
    }
    ```

    ```c
    // 客户端
    #include <stdio.h>
    #include <string.h>
    #include <winsock2.h>
    int main()
    {
        // 初始化DLL
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
        // 创建套接字
        SOCKET clientsocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        // 绑定套接字
        struct sockaddr_in socketaddr;
        ZeroMemory(&socketaddr, sizeof(socketaddr));
        socketaddr.sin_family = AF_INET;
        socketaddr.sin_addr.S_un.S_addr = inet_addr("10.191.81.110");
        socketaddr.sin_port = htons(1234);
        connect(clientsocket, (struct sockaddr *)&socketaddr, sizeof(socketaddr));
        // 信息传递
        printf("Connect Ready!\n");
        char clientReceive[512] = {0};
        char clientSend[512] = {0};
        while (1)
        {
            memset(clientReceive, 0, sizeof(clientReceive));
            memset(clientSend, 0, sizeof(clientSend));
            recv(clientsocket, clientReceive, 512, 0);
            printf("%s\n", clientReceive);
            scanf("%s", clientSend);
            send(clientsocket, clientSend, strlen(clientSend), 0);
        }
        // 关闭套接字
        closesocket(clientsocket);
        // 停止使用DLL
        WSACleanup();
        return 0;
    }
    ```

2. 详解：

   - 服务端：
     - WinSock（Windows Socket）编程依赖于系统提供的动态链接库(DLL)，需在工程设置里链接`"ws2_32.lib"`。方法一：`#pragma comment (lib, "ws2_32.lib")`，方法二：工程设置里`"args"`中写入`"-lws2_32"`
     - `MAKEWORD(2, 2)`表示Windows Socket 2.2版本
     - `socket(协议族，类型，协议)`创建socket
     - 地址信息包括协议族，IP地址，端口号（1024~65535）
     - `bind(服务端套接字，服务端地址信息，地址信息大小)`给服务端套接字绑定地址
     - `listen(服务器套接字，最大排队数)`监听，转服务器套接字主动为被动
     - `accept(服务器套接字，客户端地址变量，地址变量大小)`与排队的第一个客户端建立连接，返回代表此客户端的新套接字，此套接字包含了服务端的地址信息
     - `send(生成的客户端套接字，数据缓冲区首地址，数据大小，flag)`，`recv(生成的客户端套接字，数据存放首地址，最大可接收大小，flag)`
     - 整体过程：你建立自己的套接字（`socket()` `bind()`），用这个套接字监听一个端口（`listne()`）端口有一群人排队等着跟你对话，你拉住第一个人给他一个套接字来标识这个人（`accept()`），然后开始说话（`send()` `recv()`），原来那个套接字还一直在监听这个端口上的那一群人
   - 客户端：
     - `connect(客户端套接字，服务器地址，地址大小)`
