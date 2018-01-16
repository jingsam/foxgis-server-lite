# FoxGIS Server Lite
A simple and fully functional vector tiles server

## API

### Style API

```
GET /api/v1/styles
GET /api/v1/styles/{styleId}
PUT /api/v1/styles/{styleId}
DELETE /api/v1/styles/{styleId}
```

### Tileset API

```
GET /api/v1/tilesets
GET /api/v1/tilesets/:tilesetId/{z}/{x}/{y}.(pbf|png)
```

### Font API

```
GET /api/v1/fonts
GET /api/v1/fonts/{fontstack}/{start}-{end}.pbf
```

### Sprite API

```
GET /api/v1/sprites
PUT /api/v1/sprites/{spriteId}
DELETE /api/v1/sprites/{spriteId}
GET /api/v1/sprites/{spriteId}/icons/{icon}
PUT /api/v1/sprites/{spriteId}/icons/{icon}
DELETE /api/v1/sprites/{spriteId}/icons/{icon}
GET /api/v1/sprites/{spriteId}/sprite(@[1-4]x).(json|png)
```
