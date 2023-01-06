# /api/shorten

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>
## <APIBadge type="POST" /> Shorten a URL

### Headers

| Header Name     | Type      | Description                                                     |
| --------------- | --------- | --------------------------------------------------------------- |
| `Zws`           | `boolean` | If this header is present it will create a zero-width-space url |
| `Max-Views`     | `number`  | The maximum amount of views before the url is deleted           |
| `Authorization` | `string`  | A required field, your users auth token                         |

### Body (JSON)

| Field Name | Type      | Description                                                              |
| ---------- | --------- | ------------------------------------------------------------------------ |
| `url`      | `string`  | The URL to shorten                                                       |
| `vanity`   | `string?` | The vanity URL to use. If the vanity is used already, it will error out. |

```json
{
  "url": "https://google.com",
  "vanity": "1234"
}
```

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type     | Description       |
| ---------- | -------- | ----------------- |
| `url`      | `string` | The shortened URL |

```json
{
  "url": "https://example.com/go/1234"
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `no body` - No JSON body was provided.
- `no url` - No URL was provided. (.url)
- `invalid max views (invalid number)` - The `Max-Views` header is set to an invalid number.
- `invalid max views (max views < 0)` - The `Max-Views` header is set to a number less than 0.
- `vanity already exists` - If a vanity is provided, and it exists.
- `vanity is empty` - If a vanity is provided, and it is empty (no empty strings).

### <APIBadge type="401" /> Forbidden (JSON)

- `no authorization` - The `Authorization` header is not present.
- `authorization incorrect` - The `Authorization` header is incorrect.
