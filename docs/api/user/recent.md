import APIBadge from '../../../src/components/APIBadge';

# /api/user/recent

:::info
Requires [authentication](/docs/api#authentication)
:::

## <APIBadge type="GET" /> Get recent files

### Query

| Field Name | Type      | Description                                                                                                             |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `take`     | `number?` | How many files to take, defaults to `4`                                                                                 |
| `filter`   | `string?` | Filter by file type, defaults to `all`, but the other accepted value is `media` which checks for `video/audio/image`/\* |

### <APIBadge type="200" /> Ok (JSON)

Returns a array of [files](/docs/api/models/file)

```json
[
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
  }
]
```

### <APIBadge type="400" /> Bad Request (JSON)

- `take can't be more than 50` - The `take` query parameter can't be more than `50`.
