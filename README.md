# FoxGIS Server Lite
A simple and fully functional vector tiles server

## API

### Style API

```
GET /api/v1/styles/{owner}
GET /api/v1/styles/{owner}/{styleId}
GET /api/v1/styles/{owner}/{styleId}/html
```

### Tileset API

```
GET /api/v1/tilesets/{owner}
GET /api/v1/tilesets/{owner}/:tilesetId/tilejson
GET /api/v1/tilesets/{owner}/:tilesetId/{z}/{x}/{y}.(pbf|png)
```

### Sprite API

```
GET /api/v1/sprites/{owner}
GET /api/v1/sprites/{owner}/{spriteId}/sprite(@[1-4]x).(json|png)
```

### Font API

```
GET /api/v1/fonts/{owner}
GET /api/v1/fonts/{owner}/{fontstack}/{start}-{end}.pbf
```
