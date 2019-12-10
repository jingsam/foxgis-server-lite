# 安装部署

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