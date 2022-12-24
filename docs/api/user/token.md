# /api/user/token

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="PATCH" /> Reset your token

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type     | Description            |
| ---------- | -------- | ---------------------- |
| `success`  | `string` | Contains the new token |

```json
{
  "success": "something.something"
}
```
