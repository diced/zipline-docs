# POST /api/shorten

Shortens a URL, an easier way to do this is straight from the dashboard.

## Headers

| Header Name | Type | Description |
|-------------|------|-------------|
|`Zws`|`boolean`|If this header is present it will create a zero-width-space url|
|`Max-Views`|`number`|The maximum amount of views before the url is deleted|
|`Authorization`|`string`|A required field, your users auth token|

## Body (JSON)

| Field Name | Type | Description |
|------------|------|-------------|
|`url`|`string`|The URL to shorten|
|`vanity`|`string`|The vanity URL to use. If the vanity is used already, it will error out.|

```json
{
  "url": "https://google.com",
  "vanity": "1234"
}
```

## Returns (JSON)

| Field Name | Type | Description |
|------------|------|-------------|
|`url`|`string`|The shortened URL|

```json
{
  "url": "https://example.com/go/1234"
}
```