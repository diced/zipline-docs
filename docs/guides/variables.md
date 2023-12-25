# Variables

Variables can be used to customize the text used in embeds and discord webhook text. Variables allow allow certain [modifiers](#modifiers), that modify their appearance.

## Available Variables

Here is a list of all the variables you can use.

<Alert type="info">
Some variables may not work in some cases
</Alert>

### User Variables

| Notation               | Type     | Description                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `{user.id}`            | `int`    | The user's ID                                                                                             |
| `{user.username}`      | `string` | The user's username                                                                                       |
| `{user.token}`         | `string` | The user's token                                                                                          |
| `{user.administrator}` | `bool`   | Whether the user is an administrator                                                                      |
| `{user.superAdmin}`    | `bool`   | Whether the user is a super administrator                                                                 |
| `{user.systemTheme}`   | `string` | The user's system theme                                                                                   |
| `{user.ratelimit}`     | `date`   | The user's ratelimit, will return `{unknown_property}` if not ratelimited                                 |
| `{user.totpSecret}`    | `string` | The user's TOTP secret, will return `{unknown_property}` if none set. Unavailable in certain cirumstances |

### File Variables

| Notation              | Type      | Description                                                                                      |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `{file.id}`           | `int`     | The file's ID                                                                                    |
| `{file.name}`         | `string`  | The file's name                                                                                  |
| `{file.originalName}` | `string?` | The file's original name. Returns `{unknown_property}` if no original name exists for this file. |
| `{file.mimetype}`     | `string`  | The file's mimetype                                                                              |
| `{file.createdAt}`    | `date`    | The file's creation date                                                                         |
| `{file.expiresAt}`    | `date`    | The file's expiration date                                                                       |
| `{file.maxViews}`     | `int`     | The file's maximum views                                                                         |
| `{file.views}`        | `int`     | The file's current views                                                                         |
| `{file.favorite}`     | `bool`    | Whether the file is favorited                                                                    |
| `{file.embed}`        | `bool`    | Whether the file will be embedded                                                                |
| `{file.format}`       | `string`  | The file's format (RANDOM, etc)                                                                  |
| `{file.userId}`       | `int`     | The file's owner's ID                                                                            |
| `{file.size}`         | `int`     | The file's size in bytes. It is recommended to use the `bytes` modifier on this variable.        |

### Url Variables

| Notation            | Type     | Description             |
| ------------------- | -------- | ----------------------- |
| `{url.id}`          | `int`    | The URL's ID            |
| `{url.destination}` | `string` | The URL's destination   |
| `{url.createdAt}`   | `date`   | The URL's creation date |
| `{url.vanity}`      | `string` | The URL's vanity        |
| `{url.maxViews}`    | `int`    | The URL's maximum views |
| `{url.views}`       | `int`    | The URL's current views |
| `{url.userId}`      | `int`    | The URL's owner's ID    |

## Modifiers

Modifiers are noted by a `::` after a variable, for example if you wanted to make a variable uppercase, you would use `{user.id::upper}`.

<Alert type="info">
Modifiers do not work on `{link}` and `{raw_link}`
</Alert>

### `date` modifiers

| Notation | Description                                                                              | Example Output                  |
| -------- | ---------------------------------------------------------------------------------------- | ------------------------------- |
| `locale` | Returns the date in the systems locale or [other specified](#date-locales-and-timezones) | `12/11/2022, 3:07:42 PM`        |
| `time`   | Returns the time in the systems locale or [other specified](#date-locales-and-timezones) | `3:07:42 PM`                    |
| `date`   | Returns the date in the systems locale or [other specified](#date-locales-and-timezones) | `12/11/2022`                    |
| `unix`   | Returns the date in unix time                                                            | `1639129662`                    |
| `iso`    | Returns the date in ISO 8601 format                                                      | `2022-12-11T15:07:42.000Z`      |
| `utc`    | Returns the date in UTC                                                                  | `Sun, 11 Dec 2022 23:08:57 GMT` |
| `year`   | Returns the year                                                                         | `2022`                          |
| `month`  | Returns the month                                                                        | `12`                            |
| `day`    | Returns the day                                                                          | `11`                            |
| `hour`   | Returns the hour                                                                         | `15`                            |
| `minute` | Returns the minute                                                                       | `7`                             |
| `second` | Returns the second                                                                       | `42`                            |

#### Date Locales and Timezones

A recent update to Zipline finally adds the ability to specify a locale and or a timezone for the `locale`, `time`, and `date` modifiers.

The syntax for the 2nd modifier is `locale,timezone`. If you wanted to only specify a timezone you would use `,timezone` (the comma before the timezone is required to let Zipline know that you don't want to specify a locale).

For example if you wanted to use the `en-UK` locale, but with GMT -8:00 (America/Los_Angeles) you would use `{file.createdAt::locale/time/date::en-UK,America/Los_Angeles}`.

If you wanted to only change the timezone, but use the default (system specified) locale you would use `{file.createdAt::locale/time/date::,America/Los_Angeles}`.

#### Useful Info

A list of locales that may or may not work can be found at [www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html](https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html). To use this, you would take the language code (for example `en` for English) then append a territory code (for example `US` for the United States). The final locale should look like `en-US`. More examples, Japan's Japanese: `ja-JP`, New Zealand's English: `en-NZ`.

A list of timezones that may or may not work can be found below:
<TimezoneCollapse />

### `string` modifiers

| Notation  | Description                      | Example Output |
| --------- | -------------------------------- | -------------- |
| `upper`   | Uppercases                       | `HELLO`        |
| `lower`   | Lowercases                       | `hello`        |
| `title`   | Capitalizes                      | `Hello`        |
| `length`  | Returns the length of the string | `5`            |
| `reverse` | Reverses the string              | `olleh`        |
| `base64`  | Encodes the string in base64     | `aGVsbG8=`     |
| `hex`     | Encodes the string in hex        | `68656c6c6f`   |

### `int` modifiers

| Notation | Description                                       | Example Output |
| -------- | ------------------------------------------------- | -------------- |
| `comma`  | Adds commas to the number                         | `1,000`        |
| `hex`    | Converts the number to hex                        | `3e8`          |
| `binary` | Converts the number to binary                     | `1111101000`   |
| `octal`  | Converts the number to octal                      | `1750`         |
| `bytes`  | Converts the number to human readable byte format | `1 KB`         |

### `bool` modifiers

| Notation    | Description                     | Example Output |
| ----------- | ------------------------------- | -------------- |
| `yesno`     | Converts the bool to yes/no     | `yes`          |
| `onoff`     | Converts the bool to on/off     | `on`           |
| `truefalse` | Converts the bool to true/false | `true`         |

## Playground

Type in any variable below to test out the variables.

<Playground />
