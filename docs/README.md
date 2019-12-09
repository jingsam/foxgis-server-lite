# 概述

> FoxGIS Server Lite是一款简单易用的矢量瓦片地图服务软件，相当于FoxGIS Server的精简版。相比于FoxGIS Server，FoxGIS Server Lite功能更精简、安装更简单、兼容Windows平台。

> FoxGIS Server Lite的适用场景有：（1）在本地开发环境搭建简单地图服务；（2）在客户机器上快速部署地图服务。


## 安装

系统支持在Windows、Linux和macOS环境下运行，提供预编译的二进制文件作为部署包：
- Windows平台部署包：[下载](./foxgis-server-lite-win.tar.gz ':ignore')
- Linux平台部署包：[下载](./foxgis-server-lite-linux.tar.gz ':ignore')
- macOS平台部署包：[下载](./foxgis-server-lite-macos.tar.gz ':ignore')

以Windows平台部署为例，解压部署包得到以下文件：

```
|-- foxgis-server-lite-win/
    |-- foxgis-server-lite-win.exe    // 主程序
    |-- node_sqlite3.node             // node扩展，用于读取mbtiles
    |-- data/                         // 数据文件夹
        |-- styles/                   // 地图样式目录，用于存放样式json
        |-- tilesets/                 // 地图瓦片目录，用于存放mbtiles
        |-- sprites/                  // 符号库目录，用于存放sprite.json和sprite.png
        |-- fonts/                    // 字体目录，用于存放字形文件pbf
        |-- assets/                   // 资源目录，用于存放静态文件
```

启动时，进入`foxgis-server-lite-win`文件夹，在命令行中执行：

```
./foxgis-server-lite-win.exe
```

FoxGIS Server Lite的默认端口是`1234`，如需更改为其他端口，可以启动时设置环境变量：

```
set PROT=8080 && ./foxgis-server-lite-win.exe
```


## 服务接口

### 地图样式服务

?> 地图样式服务以样式的文件名（不带后缀）作为`styleId`，地图样式文件存储在`data/styles`目录下，在该目录下进行地图样式的新增、修改和删除操作。地图样式文件的生成，可以使用[Mapbox Studio](https://www.mapbox.com/studio)配图后导出。

```
GET /api/styles                                 // 获取样式列表
GET /api/styles/{styleId}                       // 获取样式
GET /api/styles/{styleId}/html                  // 预览样式
```

### 地图瓦片服务

?> 地图瓦片服务以瓦片集mbtiles的文件名作为`tilesetId`，地图瓦片集存储在`data/tilesets`目录下，在该目录下进行地图样式的新增、修改和删除操作。矢量瓦片集的生成，可以使用[tippecanoe](https://github.com/mapbox/tippecanoe)，该工具仅支持Linux和macOS。

```
GET /api/tilesets                                 // 获取瓦片集列表
GET /api/tilesets/:tilesetId/tilejson             // 获取瓦片集的描述信息
GET /api/tilesets/:tilesetId/html                 // 预览瓦片集
GET /api/tilesets/:tilesetId/{z}/{x}/{y}.{format} // 获取瓦片
```

### 符号库服务

?> 符号库服务以符号库**文件夹**名称作为`spriteId`，符号库文件存储在`data/sprites/{spriteId}`目录下，其中`sprite.json`是符号库的描述文件，`sprite.png`是符号库文件，`sprite@2x.json`和`sprite@2x.png`是2倍分辨率的符号库。符号库的生成，可以使用[spritezero-cli](https://github.com/mapbox/spritezero-cli)，该工具仅支持Linux和macOS。

```
GET /api/sprites                                        // 获取符号库列表
GET /api/sprites/{spriteId}/sprite(@2x).(json|png)      // 获取符号库文件
```

### 字体服务

?> 字体服务以字体**文件夹**名称作为`fontId`，字形文件存储在`data/fonts/{fontId}`目录下。字形文件的生成，可以使用[node-fontnik](https://github.com/mapbox/node-fontnik)的`build-glyphs`命令生成，该工具仅支持Linux和macOS。

```
GET /api/fonts                                          // 获取字体列表
GET /api/fonts/{fontId1, fontId2}/{start}-{end}.pbf     // 获取字形文件
```

