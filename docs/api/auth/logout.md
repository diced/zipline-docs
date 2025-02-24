# /api/auth/logout

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Logout

Logout will clear the `user` cookie.

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type      | Description                                           |
| ---------- | --------- | ----------------------------------------------------- |
| `success`  | `boolean` | `true` if the login was successful, `false` otherwise |
