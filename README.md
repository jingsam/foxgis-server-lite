# FoxGIS Server Lite

> 一款简单易用的矢量瓦片地图服务软件。

## 使用文档

请查看[帮助文档](https://jingsam.github.io/foxgis-server-lite/docs)


## 快速开始

将系统代码克隆下来后，相关命令如下：

```
yarn        // 安装依赖
yarn start  // 启动服务，默认服务地址是localhost:1234/api
```

此外，还有以下可用命令：

```
yarn test   // 测试
yarn dist   // 打包为二进制文件
yarn docs   // 打开文档
```


## 项目结构

本项目基于Express搭建，并对Express默认的目录结构做了更改。Express默认的目录结构是按照Model、View、Controller组织代码，本项目则是按照服务组织代码。每个服务分配一个目录，每个服务目录下再按照MVC划分文件，各服务间尽量进行代码隔离、数据隔离，便于以后改造为微服务。

本项目的主要代码结构如下，主要的代码逻辑在`app`目录：

```
|-- app/
|   |-- services/                 // API服务目录
|   |   |-- styles/               // 地图样式服务
|   |   |   |-- index.js          // 地图样式服务入口，同时也定义了服务API的子路由
|   |   |   |-- controller.js     // 地图样式服务的Controller层，负责具体的业务过程
|   |   |-- tilesets/             // 地图瓦片服务
|   |   |-- sprites/              // 符号库服务
|   |   |-- fonts/                // 字体服务
|   |   |-- assets/               // 静态文件服务
|   |   |-- index.js              // 服务总路由
|   |-- index.js                  // 系统入口
|   |-- routes.js                 // 总路由
|-- bin/                          // 执行文件目录
|   |-- www                       // 系统启动脚本
|-- data/                         // 系统数据目录
|-- docs/                         // 文档目录
|-- test/                         // 测试文件
```

