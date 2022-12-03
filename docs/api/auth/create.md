import APIBadge from '../../../src/components/APIBadge';

# /api/auth/create

## <APIBadge type="POST" /> Create a user (invite/regisration)

### Body (JSON)

| Field Name | Type     | Description     |
| ---------- | -------- | --------------- |
| `code`     | `string` | The invite code |
| `username` | `string` | The username    |
| `password` | `string` | The password    |

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type      | Description                                       |
| ---------- | --------- | ------------------------------------------------- |
| `success`  | `boolean` | `true` if the user was created, `false` otherwise |

### <APIBadge type="400" /> Bad Request (JSON)

- `invites are disabled` - [`FEATURES_INVITES`](/docs/config/features#features_invites) is set to `false`, therefore you cannot access this resource.
- `user registration is disabled` - [`FEATURES_USER_REGISTRATION`](/docs/config/features#features_user_registration) is set to `false`, therefore you cannot access this resource.
- `invalid invite code` - The invite code provided is invalid (doesn't exist probably or was wrong).
- `username already exists` - The username provided already exists.

## <APIBadge type="POST" /> Create a user (admin)

:::info
Requires [authentication](/docs/api#authentication)
:::

:::info
This requires administrator permissions
:::

### Body (JSON)

| Field Name      | Type      | Description                          |
| --------------- | --------- | ------------------------------------ |
| `username`      | `string`  | The username of the user             |
| `password`      | `string`  | The password of the user             |
| `administrator` | `boolean` | Whether the user is an administrator |

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user)

### <APIBadge type="400" /> Bad Request (JSON)

- `no username` - No username was provided
- `no password` - No password was provided
- `user exists` - The username already exists
