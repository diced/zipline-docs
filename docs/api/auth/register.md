# /api/auth/register

## <APIBadge type="POST" /> Register a user

<Alert type="info">
  
  - Having administrator permissions will allow access to this endpoint despite having both [`FEATURES_INVITES`](/docs/config/features#features_invites) and [`FEATURES_USER_REGISTRATION`](/docs/config/features#features_user_registration) disabled.
  - Having super administrator permissions will allow the `administrator` field to be used. 
</Alert>

### Body (JSON)

| Field Name | Type      | Description     |
| ---------- | --------- | --------------- |
| `code`     | `string` | The invite code |
| `username` | `string`  | The username    |
| `password` | `string`  | The password    |
| `administrator` | `boolean` | Whether to grant admin |

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user)

### <APIBadge type="400" /> Bad Request (JSON)

- `This endpoint is unavailable due to current configurations` - Both registration and invites are disabled.
- `Bad invite` - The invite code provided is invalid due to it either being used/expired or invalid.
- `Bad Username/Password` - There are 3 cases where this occurs

  - The username already exists
  - An invite code is provided despite being disabled
  - Either username or password in the body's request is missing.

## <APIBadge type="POST" /> Create a user (admin)

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="info">
  Requires administrator privileges
</Alert>

### Body (JSON)

| Field Name      | Type      | Description                          |
| --------------- | --------- | ------------------------------------ |
| `username`      | `string`  | The username of the user             |
| `password`      | `string`  | The password of the user             |
| `administrator` | `boolean` | Whether the user is an administrator |

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user)

### <APIBadge type="400" /> Bad Request (JSON)
