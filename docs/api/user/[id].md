# /api/user/[id]

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="info">
  Requires administrator privileges
</Alert>

# URL Parameters

| Field Name | Type     | Description               |
| ---------- | -------- | ------------------------- |
| `id`       | `number` | The id of the user to get |

## <APIBadge type="GET" /> Get a user

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user).

```json
{
  "id": 1,
  "username": "administrator",
  "avatar": "data:image/png;base64",
  "token": "LxWko2S4LSoxTyZZKsGhS6D4.MTY1OTQ1NzMwNzk2NQ",
  "administrator": true,
  "superAdmin": true,
  "systemTheme": "system",
  "embed": {},
  "ratelimit": null,
  "totpSecret": null,
  "domains": []
}
```

### <APIBadge type="404" /> Not Found (JSON)

- `user not found` - The user you are trying to access does not exist.

## <APIBadge type="PATCH" /> Update a user

### Body (JSON)

| Field name      | Type       | Description                                                                                                                                         |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `password`      | `string`   | Update the password, the password supplied will be hashed and stored.                                                                               |
| `username`      | `string`   | Update the username.                                                                                                                                |
| `avatar`        | `string`   | Must be a base64 encoded image, if invalid it may be displayed incorrectly.                                                                         |
| `embedTitle`    | `string`   | Update the embed title used on OG tags                                                                                                              |
| `embedColor`    | `string`   | Update the embed color used on OG tags                                                                                                              |
| `embedSiteName` | `string`   | Update the embed site name used on OG tags                                                                                                          |
| `systemTheme`   | `string`   | Update the user's theme, this will change the theme on the frontend, if a invalid theme is specified the frontend will default to the system theme. |
| `domains`       | `string[]` | Update the user's domains. These domains are used to to provide random domains when uploading files.                                                |
| `administrator` | `boolean`  | Update the user's administrator status.                                                                                                             |

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user).

### <APIBadge type="400" /> Bad Request (JSON)

- `username is already taken` - The username you are trying to use is already taken.
- `invalid domains` - The domains you are trying to use are invalid. Extra fields: `.invalidDomains`

### <APIBadge type="401" /> Forbidden (JSON)

- `cannot modify administrator` - You cannot modify the administrator user if you are not a `superAdmin`.
