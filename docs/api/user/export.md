# /api/user/export

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> See current or download available exports

### Query

| Field Name | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| `name`     | `string` | The name of the export to get |

### <APIBadge type="200" /> Ok (JSON or application/zip)

If `name` is not provided, returns a JSON array with available exports that you can download.

| Field Name | Type     | Description                     |
| ---------- | -------- | ------------------------------- |
| `name`     | `string` | The name of the export          |
| `size`     | `number` | The size of the export in bytes |

```json
{
  "exports": [
    {
      "name": "zipline_export_1_1669958089608.zip",
      "size": 123456
    },
    ...
  ]
}
```

If `name` is provided, returns a zip file with the export.

### <APIBadge type="401" /> Forbidden (JSON)

- `cannot access export owned by another user` - The export you are trying to access does not belong to you.

## <APIBadge type="POST" /> Create an export

### <APIBadge type="200" /> Ok (JSON)

This will return immediately, even if the export is not finished, so you must wait for the export to finish before downloading it.

| Field Name | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| `url`      | `string` | The url to download the export |

```json
{
  "url": "/api/user/export?name=zipline_export_1_1669958089608.zip"
}
```

### <APIBadge type="404" /> Not Found (JSON)

- `no files found` - No files were found to export.
