---
sidebar_position: 3
---

# POST /upload

## Headers
|Field|Type|Required|Description|
|-|-|-|-|
|Authorization|`string`|Yes|Authorization key to verify uploads|
|ZWS|`boolean`|No|Zero Width Space URLS (invisible)|
|Embed|`boolean`|No|Embed links|

## Body
Must be `multipart/form-data`, you can have multple file fields

## Response
```json
{
    "images": [
        "http://localhost:3000/u/mo1Y3y.png",
        "http://localhost:3000/u/e9LmYr.png"
    ],
    "url": "http://localhost:3000/u/mo1Y3y.png"
}
```
`url` is the first image