# 字体服务

?> 字体服务以字体**文件夹**名称作为`fontId`，字形文件存储在`data/fonts/{fontId}`目录下。字形文件的生成，可以使用[node-fontnik](https://github.com/mapbox/node-fontnik)的`build-glyphs`命令生成，该工具仅支持Linux和macOS。

```
GET /api/fonts                                          // 获取字体列表
GET /api/fonts/{fontId1, fontId2}/{start}-{end}.pbf     // 获取字形文件
```