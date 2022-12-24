# /api/user/paged

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Get paged files

### Query

| Field Name | Type       | Description                                                                                                             |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `favorite` | `boolean?` | Only get favorite files                                                                                                 |
| `filter`   | `string?`  | Filter by file type, defaults to `all`, but the other accepted value is `media` which checks for `video/audio/image`/\* |
| `page`     | `number`   | The page to get, required if no `type`                                                                                  |
| `count`    | `boolean?` | If `count` is provided, this will retrieve the number of pages needed                                                   |

### <APIBadge type="200" /> Ok (JSON)

Returns a array of [files](/docs/api/models/file)

```json
[
  ...,
  {
    "created_at": "2022-12-01T17:41:48.887Z",
    "expires_at": null,
    "file": "jO2DMR.png",
    "mimetype": "image/png",
    "id": 529,
    "views": 0,
    "maxViews": null,
    "url": "/u/jO2DMR.png"
  },
  {
    "created_at": "2022-12-01T17:41:19.582Z",
    "expires_at": "2022-12-02T17:41:19.578Z",
    "file": "w48LRo.png",
    "mimetype": "image/png",
    "id": 528,
    "views": 0,
    "maxViews": null,
    "url": "/u/w48LRo.png"
  },
  {
    "created_at": "2022-11-28T04:44:14.703Z",
    "expires_at": null,
    "file": "2RCTta.txt",
    "mimetype": "text/plain",
    "id": 520,
    "views": 0,
    "maxViews": null,
    "url": "/u/2RCTta.txt"
  },
  {
    "created_at": "2022-11-28T04:42:34.821Z",
    "expires_at": null,
    "file": "17qFqL.zip",
    "mimetype": "application/zip",
    "id": 519,
    "views": 1,
    "maxViews": null,
    "url": "/u/17qFqL.zip"
  },
  ...
]
```

or when `count=true`

```json
{
  "count": 2
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `no page` - No page was provided
- `page is not a number` - The page provided is not a number
