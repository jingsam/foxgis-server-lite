# 地图样式服务

?> 地图样式服务以样式的文件名（不包含后缀）作为`styleId`，地图样式文件存储在`data/styles`目录下，在该目录下进行地图样式的新增、修改和删除操作。地图样式文件的生成，可以使用[Mapbox Studio](https://www.mapbox.com/studio)配图后导出。

```
GET /api/styles                                 // 获取样式列表
GET /api/styles/{styleId}                       // 获取样式
GET /api/styles/{styleId}/html                  // 预览样式
```