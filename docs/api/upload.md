# /api/upload

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="POST" /> Upload a file

### Headers

Upload a file to Zipline, for more options see the [configuration](/docs/guides/upload-options) page.

### Body (multipart/form-data)

Field names of files should be `file`, if you want to upload multiple files then just append multiple fields with the name still being `file`.

### <APIBadge type="200" /> Ok (JSON)

| Field Name    | Type        | Description                                                                                                               |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `files`       | `strings[]` | The URLs of the uploaded files                                                                                            |
| `expiresAt`   | `date`      | The date the file will expire. For more info, refer to the [upload options](/docs/guides/upload-options#image-expiration) |
| `removed_gps` | `boolean`   | Whether or not the GPS data was removed from the image                                                                    |

```json
{
  "files": ["https://example.com/asdfgh.png"],
  "expiresAt": "2021-01-01T00:00:00.000Z",
  "removed_gps": true
}
```

```json
{
  "files": ["https://example.com/asdfgh.png"],
  "expiresAt": "2021-01-01T00:00:00.000Z"
}
```

```json
{
  "files": ["https://example.com/asdfgh.png"]
}
```

### <APIBadge type="200" /> Ok (Text)

If the `No-JSON` header is present, it will return a text response. This is useful if you want to skip the JSON parsing, which can be slow in the case of [jq](https://stedolan.github.io/jq/).

```
https://example.com/asdfgh.png
```

Or with multiple files, it will be comma separated.

```
https://example.com/asdfgh.png,https://example.com/qwerty.png
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
- `file[i]: filename already exists: filename` - The file at index `i` has a filename that already exists. This is only possible if the `X-Zipline-Filename` header is set.

### <APIBadge type="401" /> Forbidden (JSON)

- `no authorization` - No `Authorization` header present.
- `authorization incorrect` - The provided `Authorization` header is incorrect.
