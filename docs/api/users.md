# /api/users

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="info">
  Requires administrator privileges
</Alert>

## <APIBadge type="GET" /> Get all users

### <APIBadge type="200" /> Ok (JSON)

Returns an array of [users](/docs/api/models/user)

```json
[
  ...,
  {
    "id": 10,
    "username": "dicedtomato",
    "avatar": "data:image/png;base64,xxx",
    "token": "x.x",
    "administrator": false,
    "superAdmin": false,
    "systemTheme": "system",
    "embed": {},
    "ratelimit": null,
    "totpSecret": null,
    "domains": []
  },
  {
    "id": 3,
    "username": "test2",
    "avatar": "data:image/png;base64,xxx",
    "token": "x.x",
    "administrator": false,
    "superAdmin": false,
    "systemTheme": "system",
    "embed": {},
    "ratelimit": null,
    "totpSecret": null,
    "domains": []
  },
  ...
]
```