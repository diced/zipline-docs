# Core

## `core.secure`
Whether or not to use https or not

**Type**: `boolean`

**Env Property**: `SECURE`

**Example**:
```js
true
```

## `core.secret`
Secret used to hash cookies and other fun stuff.
:::caution
Please use something that will randomly generate a string of chars!
:::

**Type**: `string`

**Env Property**: `SECRET`

**Example**:
```js
'1234567890qwertyuiopasdfghjklzxcvbnm'
```

## `core.host`
What host Zipline should run on.
:::caution
If using Docker, set the value to `'0.0.0.0'`
:::

**Type**: `string`

**Env Property**: `HOST`

**Example**:
```js
'0.0.0.0'
```

## `core.port`
What port Zipline should run on

**Type**: `number`

**Env Property**: `PORT`

**Example**:
```js
3000
```

## `core.database_url`
The PostgreSQL database url to connect to

**Type**: `string`

**Env Property**: `DATABASE_URL`

**Example**:
```js
'postgres://zipline:zipline@localhost:5432/zipline'
```

## `core.logger`
Whether or not to log route access, and other fun stuff

**Type**: `boolean`

**Env Property**: `LOGGER`

**Example**:
```js
false
```

## `core.stats_interval`
The interval in seconds that stats will be collected. Recomended to set this to more than 30 minutes.

**Type**: `boolean`

**Env Property**: `STATS_INTERVAL`

**Example**:
```js
1800 // 30 minutes
```