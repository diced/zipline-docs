# /api/user/folders

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Get all folders

### Query

| Field Name | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `files`    | `boolean` | Whether to include the files in the response. |

### <APIBadge type="200" /> Ok (JSON)

Returns an array of folders

```json
[
  {
    "id": 1,
    "name": "test",
    "userId": 1,
    "createdAt": "2023-01-28T18:56:55.363Z",
    "updatedAt": "2023-01-28T18:56:55.363Z"
  },
  ...
]
```

If `?files=true`:

```json
[
  {
    "files": [
      {
        "id": 37,
        "name": "NhOHti.png",
        "originalName": null,
        "mimetype": "image/png",
        "createdAt": "2023-01-14T21:32:35.097Z",
        "expiresAt": null,
        "maxViews": null,
        "views": 0,
        "favorite": false,
        "embed": true,
        "format": "RANDOM",
        "userId": 1,
        "folderId": 1,
        "url": "/NhOHti.png"
      },
      ...
    ],
    "id": 1,
    "name": "test",
    "userId": 1,
    "createdAt": "2023-01-28T18:56:55.363Z",
    "updatedAt": "2023-01-28T18:56:55.363Z"
  },
  ...
]
```

## <APIBadge type="POST" /> Create a folder

### Body (JSON)

| Field Name | Type                  | Description                                      |
| ---------- | --------------------- | ------------------------------------------------ |
| `name`     | `string`              | The name for the folder                          |
| `add`      | `number[] / string[]` | ID's of files to add to the folder upon creation |

### <APIBadge type="200" /> Ok (JSON)

Returns the created folder

```json
{
  "id": 1,
  "name": "test",
  "userId": 1,
  "createdAt": "2023-01-28T18:56:55.363Z",
  "updatedAt": "2023-01-28T18:56:55.363Z"
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `name is required` - No name was provided.
- `name cannot be empty` - The name provided was empty.
- `files {id,id,id...} not found` - One or more of the files provided were not found.
