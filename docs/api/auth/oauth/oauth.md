# /api/auth/oauth

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

## <APIBadge type="GET" /> Get OAuth providers

### <APIBadge type="200" /> Ok (JSON)

Returns an array of linked [OAuth providers](/docs/api/models/user#oauth-providers)

```json
[
  {
    "id": 2,
    "provider": "DISCORD",
    "userId": 18,
    "username": "dicedtomato",
    "token": "x",
    "refresh": "x"
  },
  {
    "id": 3,
    "provider": "GITHUB",
    "userId": 18,
    "username": "diced",
    "token": "gho_x",
    "refresh": null
  }
]
```
