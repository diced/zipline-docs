# /api/auth/image

## <APIBadge type="GET" /> Get an image

This endpoint is used to retrieve an image that is password protected.

### Query

| Field Name | Type     | Description                |
| ---------- | -------- | -------------------------- |
| `id`       | `number` | The id of the image to get |
| `password` | `string` | The password of the image  |

### <APIBadge type="200" /> Ok (any)

Returns the file.

### <APIBadge type="400" /> Bad Request (JSON)

- `image not found` - The image doesn't exist.
- `image password provided` - You didn't provide a password.
- `wrong password` - The password provided is incorrect.

### <APIBadge type="404" /> Not Found (JSON)

- `image not found` - The image doesn't exist.
