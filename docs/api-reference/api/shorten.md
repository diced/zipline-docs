# POST /shorten

## Headers
|Field|Type|Required|Description|
|-|-|-|-|
|Authorization|`string`|Yes|Authorization key to verify shortens|
|ZWS|`boolean`|No|Zero Width Space URLS (invisible)|

## Body
Must be `application/json`

|Field|Type|Required|Description|
|-|-|-|-|
|url|`string`|Yes|URL to shorten|
|vanity|`string`|No|Vanity URL|

```json
{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

```json
{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "vanity": "rick"
}
```

## Response
```json
{
    "url": "http://localhost:3000/go/h38hd3"
}
```

```json
{
    "url": "http://localhost:3000/go/rick"
}
```