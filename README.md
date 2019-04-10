# FoxGIS Server Lite

> 一款简单实用的地图服务软件，支持Windows、Linux和macOS。

## API

### Style API

```
GET /api/styles
GET /api/styles/{styleId}
GET /api/styles/{styleId}/html
```

### Tileset API

```
GET /api/tilesets
GET /api/tilesets/:tilesetId/tilejson
GET /api/tilesets/:tilesetId/html
GET /api/tilesets/:tilesetId/{z}/{x}/{y}.{format}
```

### Sprite API

```
GET /api/sprites
GET /api/sprites/{spriteId}/sprite(@[1-4]x).(json|png)
```

### Font API

```
GET /api/fonts
GET /api/fonts/{fontIds}/{start}-{end}.pbf
```
