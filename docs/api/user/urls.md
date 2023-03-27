# /api/user/urls

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Get all URLs

### <APIBadge type="200" /> Ok (JSON)

| Field Name    | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `createdAt`   | `date`    | The date the URL was created                          |
| `id`          | `number`  | The ID of the URL                                     |
| `destination` | `string`  | The destination of the URL                            |
| `vanity`      | `string?` | The vanity of the URL                                 |
| `views`       | `number`  | The number of vists the URL has                       |
| `maxViews`    | `number?` | The maximum number of views the URL has until deleted |
| `url`         | `string`  | Route to view                                         |

```json
[
  ...,
  {
    "createdAt": "2022-08-22T19:11:13.526Z",
    "id": "LeifVu",
    "destination": "https://google.com",
    "vanity": null,
    "views": 53,
    "maxViews": null,
    "url": "/go/LeifVu"
  },
  {
    "createdAt": "2022-10-28T04:22:28.021Z",
    "id": "67q2JE",
    "destination": "https://google.com",
    "vanity": "adsgsdg",
    "views": 0,
    "maxViews": 1,
    "url": "/go/adsgsdg"
  },
  ...
]
```

## <APIBadge type="DELETE" /> Delete a URL

### Body (JSON)

| Field Name | Type     | Description       |
| ---------- | -------- | ----------------- |
| `id`       | `string` | The ID of the URL |

```json
{
  "id": "LeifVu"
}
```

### <APIBadge type="200" /> Ok (JSON)

| Field Name    | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `createdAt`   | `date`    | The date the URL was created                          |
| `id`          | `number`  | The ID of the URL                                     |
| `destination` | `string`  | The destination of the URL                            |
| `vanity`      | `string?` | The vanity of the URL                                 |
| `views`       | `number`  | The number of vists the URL has                       |
| `maxViews`    | `number?` | The maximum number of views the URL has until deleted |
| `url`         | `string`  | Route to view                                         |

```json
{
  "createdAt": "2022-08-22T19:11:13.526Z",
  "id": "LeifVu",
  "destination": "https://google.com",
  "vanity": null,
  "views": 53,
  "maxViews": null,
  "url": "/go/LeifVu"
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `no url id` - No URL ID was provided in the body.
