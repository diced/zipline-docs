---
title: URLs
description: URLs Config
slug: /config/urls
---

## Route
The route where your shortened urls will be served at.

**Option**: `core.route`<br/>
**Type**: `string`<br/>
**Example**:
```js
"/s"
"/s/"
"/urls"
"/urls/"
```

## Length
This will determine how long your randomly generated url names should be. This option is not used when `vanity` is supplied while creating a url.

:::danger Remember
Make sure the length is **greater** than `1` or `2`, this will only allow `62` or `3844` urls to be shortened.
:::

**Option**: `core.length`<br/>
**Type**: `number`<br/>
**Example**:
```js
6
```

## Vanity
This will allow for custom urls like `https://example.com/s/google` or `https://example.com/s/zipline`. If this option is disabled, then if a `vanity` url is supplied, it will be ignored.

**Option**: `core.vanity`<br/>
**Type**: `boolean`<br/>
**Example**:
```js
true
```
