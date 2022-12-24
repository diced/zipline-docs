# /api/version

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Get version info

### Headers

Upload a file to Zipline, for more options see the [configuration](/docs/guides/upload-options) page.

### Body (multipart/form-data)

Field names of files should be `file`, if you want to upload multiple files then just append multiple fields with the name still being `file`.

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type               | Description                    |
| ---------- | ------------------ | ------------------------------ |
| `files`    | `array of strings` | The URLs of the uploaded files |

```json
{
  "files": ["https://example.com/asdfgh.png"]
}
```

### <APIBadge type="403" /> Unauthorized (JSON)

- `version hidden` - The [`WEBSITE_SHOW_VERSION`](/docs/config/website#website_show_version) is set to `false`, therefore the version is hidden.
