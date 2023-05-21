# Invite

The invite model is used to represent a invite in the database.

| Field Name    | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `id`          | `number`  | The ID of the invite                    |
| `code`        | `string`  | The code of the invite                  |
| `createdAt`   | `date`    | The date the invite was created         |
| `expiresAt`   | `date`    | The date the invite expires             |
| `used`        | `boolean` | If the invite has been used             |
| `createdById` | `number`  | The ID of the user that made the invite |