---
id: uploader
title: Uploader Config
---

## `uploader.route`
Which route uploads should be served on

**Type**: `string`
**Env Property**: `UPLOADER_ROUTE`
**Example:**:
```js
'/u'
```

## `uploader.embed_route`
Which route embed routes should be accessed via

**Type**: `string`
**Env Property**: `UPLOADER_EMBED_ROUTE`
**Example:**:
```js
'/a'
```

## `uploader.length`
Length of randomly generated characters for uploads

**Type**: `number`
**Env Property**: `UPLOADER_LENGTH`
**Example:**:
```js
6
```

## `uploader.directory`
Which directory uploads should be stored to

**Type**: `string`
**Env Property**: `UPLOADER_DIRECTORY`
**Example:**:
```js
'./uploads'
```
