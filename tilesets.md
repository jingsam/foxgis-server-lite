# 地图瓦片服务

?> 地图瓦片服务以瓦片集mbtiles的文件名（不包含后缀）作为`tilesetId`，地图瓦片集存储在`data/tilesets`目录下，在该目录下进行地图样式的新增、修改和删除操作。矢量瓦片集的生成，可以使用[tippecanoe](https://github.com/mapbox/tippecanoe)，该工具仅支持Linux和macOS。

```
GET /api/tilesets                                 // 获取瓦片集列表
GET /api/tilesets/:tilesetId/tilejson             // 获取瓦片集的描述信息
GET /api/tilesets/:tilesetId/html                 // 预览瓦片集
GET /api/tilesets/:tilesetId/{z}/{x}/{y}.{format} // 获取瓦片
```