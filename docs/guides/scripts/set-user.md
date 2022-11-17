import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set User

This script allows you to modify any user in the database.

## Supported Fields
* `username` (string)
* `password` (string -> will be hashed)
* `administrator` (boolean)
* `token` (string)
* `superAdmin` (boolean)
* `systemTheme` (string, may cause errors on invalid values)
* `embedTitle` (string)
* `embedColor` (string, hex)
* `embedSiteName` (string)
* `ratelimit` (Date, must be a JS resolvable date string)
* `domains` (string[], must be a comma delimited string)

## Usage

:::note

<something\> = required property

:::

<Tabs>
  <TabItem value="docker" label="Docker" default>

```bash
docker-compose exec zipline yarn scripts:set-user <user_id> <property> <value>
```

  </TabItem>
  <TabItem value="non-docker" label="Non Docker">

```bash npm2yarn
npm run scripts:set-user <user_id> <property> <value>
```

  </TabItem>
</Tabs>

## Output
If no errors occured, then the script will return with a simple message with what has been changed.

`... scripts:set-user 17 administrator true` -> `Updated user 17 with administrator = true`

If setting a password, the password supplied will be hashed and then stored.

`... scripts:set-user 17 password test` -> `Updated user 17 with password = ***`

If setting a users domains, it must be a comma delimited string.

`... scripts:set-user 17 domains example.com,example2.com` -> `Updated user 17 with domains = example.com,example2.com]`