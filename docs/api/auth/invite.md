# /api/auth/invite

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="info">
  Requires administrator privileges
</Alert>

## <APIBadge type="GET" /> Get all invites

### <APIBadge type="200" /> Ok (JSON)

Returns an array of [invites](/docs/api/models/invite)

```json
[
  ...,
  {
    "id": 35,
    "code": "ix8iFD",
    "createdAt": "2022-11-11T03:34:25.532Z",
    "expiresAt": null,
    "used": false,
    "createdById": 1
  },
  ...
]
```

### <APIBadge type="400" /> Bad Request (JSON)

- `invites are disabled` - Invites are disabled

## <APIBadge type="POST" /> Create an invite

### Body (JSON)

| Field Name  | Type               | Description                                                                                                                |
| ----------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `expiresAt` | `date? \| string?` | The date the invite expires at. For more info, refer to the [upload options](/docs/guides/upload-options#image-expiration) |
| `count`     | `number?`          | The number of invites to create                                                                                            |

### <APIBadge type="200" /> Ok (JSON)

Returns an array of [invites](/docs/api/models/invite) or just a singular [invite](/docs/api/models/invite)

```json
[
  ...,
  {
    "id": 35,
    "code": "ix8iFD",
    "createdAt": "2022-11-11T03:34:25.532Z",
    "expiresAt": null,
    "used": false,
    "createdById": 1
  },
  ...
]
```

```json
{
  "id": 35,
  "code": "ix8iFD",
  "createdAt": "2022-11-11T03:34:25.532Z",
  "expiresAt": null,
  "used": false,
  "createdById": 1
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `invites are disabled` - Invites are disabled
- `invalid date` - The date is either invalid or set in the past.

## <APIBadge type="DELETE" /> Delete an invite

### Query

| Field Name | Type     | Description            |
| ---------- | -------- | ---------------------- |
| `code`     | `string` | The code of the invite |

### <APIBadge type="200" /> Ok (JSON)

Returns the [deleted invite](/docs/api/models/invite)

```json
{
  "id": 35,
  "code": "ix8iFD",
  "createdAt": "2022-11-11T03:34:25.532Z",
  "expiresAt": null,
  "used": false,
  "createdById": 1
}
```

### <APIBadge type="400" /> Bad Request (JSON)

- `no code` - No code was provided

### <APIBadge type="404" /> Not Found (JSON)

- `invite not found` - The invite was not found
