import APIBadge from '../../../src/components/APIBadge';

# /api/user/token

:::info
Requires [authentication](/docs/api#authentication)
:::

## <APIBadge type="PATCH" /> Reset your token

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| `success` | `string` | Contains the new token |

```json
{
  "success": "something.something"
}
```