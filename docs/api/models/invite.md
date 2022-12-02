# Invite

The invite model is used to represent a invite in the database.

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| `id` | `number` | The ID of the invite |
| `code` | `string` | The code of the invite |
| `created_at` | `date` | The date the invite was created |
| `expires_at` | `date` | The date the invite expires |
| `used` | `boolean` | If the invite has been used |