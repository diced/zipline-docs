import APIBadge from '../../src/components/APIBadge';

# /api/exif

:::info
Requires [authentication](/docs/api#authentication)
:::

## <APIBadge type="GET" /> Get exif tags for an image

### Query

| Field Name | Type     | Description                |
| ---------- | -------- | -------------------------- |
| `id`       | `number` | The id of the image to get |

### <APIBadge type="200" /> Ok (JSON)

Returns a JSON object with the tag name as the key and the tag value as the value.

```json
{
  "Tag": "Value",
  ...
}
```

### <APIBadge type="401" /> Forbidden (JSON)

- `exif disabled` - The [`EXIF_ENABLED`](/docs/config/exif#exif_enabled) is set to `false`, therefore you cannot access this resource.

### <APIBadge type="404" /> Not Found (JSON)

- `image not found` - The image you are trying to access does not exist, or you do not own the image.
- `image not found on fs` - The image you are trying to access does not exist on the file system (local datasource).