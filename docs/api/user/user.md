# /api/user

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="info">
  If your user has an oauth account linked, Zipline will attempt to check if the user's access_token's are still valid. If they are invalid, they will return a <APIBadge type="200" />, tough there is an error message in the response. Only `discord` and `google` support refresh tokens, so their token checking is seamless and will not cause a refresh unless it fails.

#### Responses

```json
{
  "error": "oauth token expired",
  "redirect_uri": "<redirect uri for oauth provider>"
}
```

</Alert>

## <APIBadge type="GET" /> Get user information

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user).

## <APIBadge type="PATCH" /> Edit user information

### Body (JSON)

Each field is optional, and only the fields you specify will be updated.

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

### <APIBadge type="200" /> Ok (JSON)

Returns a [user object](/docs/api/models/user).

### <APIBadge type="400" /> Bad Request (JSON)

- `username is already taken` - The username you are trying to use is already taken.
- `invalid domains` - The domains you are trying to use are invalid. Extra fields: `.invalidDomains`
