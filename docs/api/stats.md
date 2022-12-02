import APIBadge from '../../src/components/APIBadge';

# /api/stats

:::info
Requires [authentication](/docs/api#authentication)
:::

## <APIBadge type="GET" /> Get current statistics

### Query

| Field Name | Type     | Description                |
| ---------- | -------- | -------------------------- |
| `amount`   | `number` | The amount of stats to get |

### <APIBadge type="200" /> Returns (JSON Array)

| Field Name      | Type     | Description                           |
| --------------- | -------- | ------------------------------------- |
| `id`            | `number` | `id` of the stats object              |
| `created_at`    | `date`   | The date the stats object was created |
| `data`          | `object` | [The stats data](#data)               |
| `max_timestamp` | `date`   | The max timestamp of the stats data   |

#### Data

| Field Name      | Type     | Description                            |
| --------------- | -------- | -------------------------------------- |
| `size`          | `string` | Human readable size of uploads         |
| `size_num`      | `number` | Size of uploads in bytes               |
| `count`         | `number` | Total number of files                  |
| `count_users`   | `number` | Total number of users                  |
| `views_count`   | `number` | Total number of views                  |
| `types_count`   | `object` | [Count of each mimetype](#types-count) |
| `count_by_user` | `object` | [Count of each user](#count-by-user)   |

##### Types Count

| Field Name | Type     | Description               |
| ---------- | -------- | ------------------------- |
| `mimetype` | `number` | The mimetype              |
| `count`    | `number` | The count of the mimetype |

##### Count By User

| Field Name | Type     | Description  |
| ---------- | -------- | ------------ |
| `username` | `number` | The username |
| `count`    | `number` | The count    |

```json
[
  {
    "id": 454,
    "created_at": "2022-12-02T00:18:31.955Z",
    "data": {
      "size": "318.5 MB",
      "count": 471,
      "size_num": 333996722,
      "count_users": 14,
      "types_count": [
        {
          "count": 210,
          "mimetype": "image/png"
        },
        {
          "count": 119,
          "mimetype": "application/octet-stream"
        }
      ],
      "views_count": 5842,
      "count_by_user": []
    },
    "max_timestamp": "2022-12-02T00:18:31.955Z"
  },
  {
    "id": 453,
    "created_at": "2022-12-01T17:41:38.738Z",
    "data": {
      "size": "318.5 MB",
      "count": 470,
      "size_num": 333975064,
      "count_users": 14,
      "types_count": [
        {
          "count": 209,
          "mimetype": "image/png"
        },
        {
          "count": 119,
          "mimetype": "application/octet-stream"
        }
      ],
      "views_count": 5842,
      "count_by_user": []
    },
    "max_timestamp": "2022-12-01T17:41:38.738Z"
  }
]
```

### <APIBadge type="400" /> Errors (JSON)

- `invalid amount` - The `amount` field is not a number, or couldn't be parsed as one.

## <APIBadge type="POST" /> Force a stats update

### <APIBadge type="200" /> Returns (JSON)

Same response as [this](#-returns-json-array)

### <APIBadge type="403" /> Errors (JSON)
`not an administrator` - You are not an administrator, therefore you cannot force a stats update.
