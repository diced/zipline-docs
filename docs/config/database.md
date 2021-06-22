---
id: database
title: Database Config
---

## `database.type`
The type of the database

**Type**: `psql, mysql or sqlite` (`string`)
**Example:**:
```js
'psql'
```

## `database.url`
The url of the database

**Type**: `string`
**Example:**:
```js
// for postgresql
'postgres://zipline:zipline@localhost:5432/zipline'

// for mysql
'mysql://zipline:zipline@localhost:3306/zipline'

// for sqlite
'file:zipline.db'
```
