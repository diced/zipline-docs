--
title: Uploader
description: Uploader Config
slug: /config/urls
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