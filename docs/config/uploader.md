---
title: Uploader
description: Uploader Config
slug: /config/uploader
---

## Directory
Where uploaded files should be stored.

**Option**: `core.directory`<br/>
**Type**: `path`<br/>
**Example**:
```js
"./uploads"
```

## Route
The route where your uploads will be served at.

**Option**: `core.route`<br/>
**Type**: `string`<br/>
**Example**:
```js
"/u"
"/u/"
"/cdn"
"/cdn/"
```

## Length
This will determine how long your randomly generated file names should be.
:::danger Remember
Make sure the length is **greater** than `1` or `2`, this will only allow `72` or `32` images to be uploaded.
:::

**Option**: `core.length`<br/>
**Type**: `number`<br/>
**Example**:
```js
6
```

## Original
If this is enabled, then the original file name & extension will be kept.

**Option**: `core.original`<br/>
**Type**: `boolean`<br/>
**Example**:
```js
false
```

## Blacklisted
Blacklist certain extensions from entering your server.

**Option**: `core.blacklisted`<br/>
**Type**: `string[]`<br/>
**Example**:
```js
["jpg"]
```