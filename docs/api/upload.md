import APIBadge from '../../src/components/APIBadge';

# /api/upload

:::info
Requires [authentication](/docs/api#authentication)
:::

## <APIBadge type="POST" /> Upload a file

### Headers

Upload a file to Zipline, for more options see the [configuration](/docs/guides/upload-options) page.

### Body (multipart/form-data)

Field names of files should be `file`, if you want to upload multiple files then just append multiple fields with the name still being `file`.

### <APIBadge type="200" /> Ok (JSON)

| Field Name    | Type               | Description                                            |
| ------------- | ------------------ | ------------------------------------------------------ |
| `files`       | `array of strings` | The URLs of the uploaded files                         |
| `expires_at`  | `date`             | The date the file will expire                          |
| `removed_gps` | `boolean`          | Whether or not the GPS data was removed from the image |

```json
{
  "files": ["https://example.com/asdfgh.png"],
  "expires_at": "2021-01-01T00:00:00.000Z",
  "removed_gps": true
}
```

```json
{
  "files": ["https://example.com/asdfgh.png"],
  "expires_at": "2021-01-01T00:00:00.000Z"
}
```

```json
{
  "files": ["https://example.com/asdfgh.png"]
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `invalid date` - Provided an invalid date for the `Expires-At` header.
- `invalid date (UPLOADER_DEFAULT_EXPIRATION)` - The [`UPLOADER_DEFAULT_EXPIRATION`](/docs/config/uploader#uploader_default_expiration) is set to an invalid date, therefore the default expiration is invalid.
- `invalid image compression percent (invalid number)` - The `Image-Compression-Percent` header is set to an invalid number.
- `invalid image compression percent (% < 0 || % > 100)` - The `Image-Compression-Percent` header is set to a number less than 0 or greater than 100.
- `invalid max views (invalid number)` - The `Max-Views` header is set to an invalid number.
- `invalid max views (max views < 0)` - The `Max-Views` header is set to a number less than 0.
- `no files` - No files were provided in the multipart/form-data body.
- `file[i]: size too big` - The file at index `i` is too big.
- `file[i]: no filename` - The file at index `i` has no filename.
- `file[i]: disabled extension recieved: ext` - The file at index `i` has a disabled extension.

### <APIBadge type="401" /> Forbidden (JSON)

- `no authorization` - No `Authorization` header present.
- `authorization incorrect` - The provided `Authorization` header is incorrect.
