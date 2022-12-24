# /api/user/check

## <APIBadge type="POST" /> Check if a user exists

### Body (JSON)

| Field Name | Type     | Description           |
| ---------- | -------- | --------------------- |
| `code`     | `string` | Invite code           |
| `username` | `string` | The username to check |

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type      | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| `success`  | `boolean` | `true` if the user exists, `false` otherwise |

```json
{
  "success": true
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- **`username already exists` - The username provided already exists.**
- `no code` - No invite code was provided.
- `no username` - No username was provided.
- `invalid invite code` - The invite code provided is invalid (doesn't exist probably).

### <APIBadge type="401" /> Forbidden (JSON)

- `user/invites are disabled` - Either [`FEATURES_INVITES`](/docs/config/features#features_invites) or [`FEATURES_USER_REGISTRATION`](/docs/config/features#features_user_registration) is set to `false`, therefore you cannot access this resource.
