# Invite

The url model is used to represent a url in the database.

| Field Name    | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `createdAt`   | `date`    | The date the URL was created                          |
| `id`          | `number`  | The ID of the URL                                     |
| `destination` | `string`  | The destination of the URL                            |
| `vanity`      | `string?` | The vanity of the URL                                 |
| `views`       | `number`  | The number of vists the URL has                       |
| `maxViews`    | `number?` | The maximum number of views the URL has until deleted |
| `url`         | `string`  | Route to view                                         |
