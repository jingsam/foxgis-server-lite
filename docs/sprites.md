# 符号库服务

?> 符号库服务以符号库**文件夹**名称作为`spriteId`，符号库文件存储在`data/sprites/{spriteId}`目录下，其中`sprite.json`是符号库的描述文件，`sprite.png`是符号库文件，`sprite@2x.json`和`sprite@2x.png`是2倍分辨率的符号库。符号库的生成，可以使用[spritezero-cli](https://github.com/mapbox/spritezero-cli)，该工具仅支持Linux和macOS。

```
GET /api/sprites                                        // 获取符号库列表
GET /api/sprites/{spriteId}/sprite(@2x).(json|png)      // 获取符号库文件
```