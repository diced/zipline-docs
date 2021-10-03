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
Whether or not to use https or not

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
