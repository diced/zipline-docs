# /api/admin/clear

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="danger">
  Requires super administrator privileges.
</Alert>

## <APIBadge type="POST" /> Clear storage

### Body (JSON)

| Field Name | Type      | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| `orphaned` | `boolean` | Set to true if you want to clear files without an owner |

### <APIBadge type="200" /> Ok (JSON)

- `cleared storage` - All files are now removed.
- `cleared storage (orphaned only)` - Files that are without owners are removed.

### <APIBadge type="400" /> Bad request (JSON)

- `failed to clear the database or storage: [ERROR]` - Something went wrong while clearing storage, it's best to open an issue with any logs that lead up to this.
