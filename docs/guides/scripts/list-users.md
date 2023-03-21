# List Users

This script will list the users, with any additional properties you specify.

## Usage

<Alert type="note">

[something] = optional property

</Alert>

<Tabs>
  <TabItem value="docker" label="Docker" default>

```bash
docker compose exec zipline yarn scripts:list-users [extras (comma delimited)] [specific_id]
```

  </TabItem>
  <TabItem value="non-docker" label="Non Docker">

```bash npm2yarn
npm run scripts:list-users [extras (comma delimited)] [specific_id]
```

  </TabItem>
</Tabs>

## Output

The output will be a 2-space tabbed JSON array of users (or one user if a specific_id is specified).

```json
[
  {
    "id": 1,
    "username": "administrator",
    "administrator": true,
  },
  ...
]
```

If you run `... scripts:list-users token`, the objects will now include each users token.

```json
[
  {
    "id": 1,
    "username": "administrator",
    "administrator": true,
    "token": "xxxxxxxxx"
  },
  ...
]
```

Specifying multiple extra properties: `... scripts:list-users token,domains,oauth`

```json
[
  {
    "id": 1,
    "username": "administrator",
    "administrator": true,
    "token": "xxxxxxxxx",
    "domains": [
      "example.com"
    ],
    "oauth": [
      {
        "id": 1,
        "provider": "GITHUB",
        "userId": 1,
        "username": "diced",
        "token": "gho_x",
        "refresh": null
      },
      {
        "id": 2,
        "provider": "DISCORD",
        "userId": 1,
        "username": "dicedtomato",
        "token": "x",
        "refresh": "x"
      }
    ]
  },
  ...
]
```

If you want to find a specific user by id, you can run `... scripts:list-users id,token 1` and it will return the user with id 1.

```json
[
  {
    "id": 1,
    "username": "administrator",
    "administrator": true,
    "token": "xxxxxxxxx"
  }
]
```
