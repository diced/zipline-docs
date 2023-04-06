# Folder

The folder model is used to represent a folder in the database.

| Field Name  | Type                               | Description                     |
| ----------- | ---------------------------------- | ------------------------------- |
| `id`        | `number`                           | The ID of the folder            |
| `name`      | `string`                           | The name of the folder          |
| `public`    | `bool`                             | If the folder was marked public |
| `createdAt` | `date`                             | The date the folder was created |
| `updatedAt` | `date`                             | The date the folder was changed |
| `files`     | [`File[]?`](/docs/api/models/file) | The files of a folder.          |
