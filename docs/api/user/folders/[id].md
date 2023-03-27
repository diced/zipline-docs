# /api/user/folders/[id]

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## Parameters

| Field Name | Type     | Description |
| ---------- | -------- | ----------- |
| `id`       | `number` | Folder ID   |

## <APIBadge type="GET" /> Get a folder

### Query

| Field Name | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `files`    | `boolean` | Whether to include the files in the response. |

### <APIBadge type="200" /> Ok (JSON)

Returns a folder

```json
{
  "id": 1,
  "name": "test",
  "userId": 1,
  "createdAt": "2023-01-28T18:56:55.363Z",
  "updatedAt": "2023-01-28T18:56:55.363Z"
}
```

If `?files=true`:

```json
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
}
```

### <APIBadge type="404" /> Not Found

- `folder not found` - Folder not found

### <APIBadge type="403" /> Forbidden

- `you do not have permission to access this folder` - You do not have permission to access this folder I guess.

## <APIBadge type="POST" /> Add a file to a folder

### Query

| Field Name | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `files`    | `boolean` | Whether to include the files in the response. |

### Body (JSON)

| Field Name | Type    | Description |
| ---------- | ------- | ----------- |
| `file`     | `number | string`     |

### <APIBadge type="200" /> Ok (JSON)

Returns same as [Get a folder](#get-a-folder)

### <APIBadge type="400" /> Bad Request

- `file is required` - There was no `file` property within the JSON body
- `file must be a number` - The `file` property must be resolvable to a number.
- `file is already in folder` - The file is already in the folder.

### <APIBadge type="404" /> Not Found

- `file not found` - File not found
- `folder not found` - Folder not found

### <APIBadge type="403" /> Forbidden

- `you do not have permission to access this file` - You can't add another user's file to your folder.
- `you do not have permission to access this folder` - You can't add a file to another user's folder.

## <APIBadge type="DELETE" /> Remove a file from a folder or delete a folder

### Query

| Field Name | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `files`    | `boolean` | Whether to include the files in the response. |

### Body (JSON)

| Field Name       | Type      | Description                                                                                                                                                                       |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deletingFolder` | `boolean` | Whether to delete the folder or not. If this value is present and `true`, it will delete the folder. If it is `false` or not present it will delete a file with the below options |
| `file`           | `number   | string`                                                                                                                                                                           |

### <APIBadge type="200" /> Ok (JSON) (deleting a file)

Returns same as [Get a folder](#get-a-folder)

### <APIBadge type="200" /> Ok (JSON) (deleting a folder)

Returns the folder that was deleted

```json
{
  "id": 1,
  "name": "test",
  "userId": 1,
  "createdAt": "2023-01-28T18:56:55.363Z",
  "updatedAt": "2023-01-28T18:56:55.363Z"
}
```

### <APIBadge type="400" /> Bad Request

- `id must be a number` - The `id` parameter must be resolvable to a number.
- `file is required` - There was no `file` property within the JSON body
- `file must be a number` - The `file` property must be resolvable to a number.
- `file is not in folder` - The file is not in the folder.

### <APIBadge type="404" /> Not Found

- `file not found` - File not found
- `folder not found` - Folder not found

### <APIBadge type="403" /> Forbidden

- `you do not have permission to access this file` - You can't remove another user's file from your folder.
- `you do not have permission to access this folder` - You can't remove a file from another user's folder.
