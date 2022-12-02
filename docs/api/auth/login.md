import APIBadge from '../../../src/components/APIBadge';

# /api/auth/login

## <APIBadge type="POST" /> Login

### Body (JSON)

| Field Name | Type      | Description                |
| ---------- | --------- | -------------------------- |
| `username` | `string`  | The username to login with |
| `password` | `string`  | The password to login with |
| `code`     | `string?` | TOTP code, if needed       |

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type      | Description                                           |
| ---------- | --------- | ----------------------------------------------------- |
| `success`  | `boolean` | `true` if the login was successful, `false` otherwise |

### <APIBadge type="403" /> Unauthorized (JSON)

- `Wrong password` - The password provided is incorrect.
- `TOTP required` - The user has 2FA enabled and a TOTP code is required. A modal will be shown to the user to enter the code.

### <APIBadge type="400" /> Bad Request (JSON)

- `Invalid code` - The TOTP code provided is invalid. Extra: `.totp`

### <APIBadge type="404" /> Not Found (JSON)

- `user not found` - The username provided doesn't exist.