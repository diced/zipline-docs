# /api/user/mfa/totp

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Get totp secret or qr code

### <APIBadge type="200" /> Ok (JSON)

| Field Name | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| `secret`   | `string` | The TOTP Secret, can be manually entered into 2fa apps, etc. |

```json
{
  "secret": "DLKCHDVWIGYWEFQHOFUH"
}
```

If the user doesn't have a totpSecret already set then it will create one, and also generate a QR code to use for scanning in apps.

| Field Name | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| `secret`   | `string` | The TOTP Secret, can be manually entered into 2fa apps, etc. |
| `data_url` | `string` | The base64 data url containing a qr code                     |

```json
{
  "secret": "DJHSOUIGS98EHGOADSJH",
  "data_url": "data:image/png;base64,..."
}
```

### <APIBadge type="401" /> Forbidden (JSON)

- `totp is disabled` - [`MFA_TOTP_ENABLED`](/docs/config/mfa#mfa_totp_enabled) is set to `false`, therefore you cannot access this resource.

## <APIBadge type="POST" /> Verify totp code

### Body (JSON)

| Field Name | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| `code`     | `string` | The TOTP code to verify           |
| `secret`   | `string` | The TOTP secret to verify against |

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/user#user-object)

### <APIBadge type="400" /> Bad Request (JSON)

- `no code` - No TOTP code was provided.
- `no secret` - No TOTP secret was provided.
- `invalid code (code.length != 6)` - The TOTP code provided is not 6 characters long.
- `Invalid code` - The TOTP code provided is invalid.
- `totp already registered` - The user already has TOTP enabled.

### <APIBadge type="401" /> Forbidden (JSON)

- `totp is disabled` - [`MFA_TOTP_ENABLED`](/docs/config/mfa#mfa_totp_enabled) is set to `false`, therefore you cannot access this resource.
