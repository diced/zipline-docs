# File

The file model is used to represent a file in the database.

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| `created_at` | `date` | The date the file was created |
| `expires_at` | `date?` | The date the file will expire |
| `id` | `number` | The ID of the file |
| `mimetype` | `string` | The mimetype of the file |
| `views` | `number` | The number of views the file has |
| `maxViews` | `number?` | The maximum number of views the file has until deleted |
| `url` | `string?` | The URL of the file (/u/test.png) |
