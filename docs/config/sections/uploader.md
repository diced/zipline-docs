# Uploader

## `uploader.route`
Which route uploads should be served on

**Type**: `string`

**Env Property**: `UPLOADER_ROUTE`

**Example**:
```js
'/u'
```

## `uploader.embed_route`
Which route embed routes should be accessed via

**Type**: `string`

**Env Property**: `UPLOADER_EMBED_ROUTE`

**Example**:
```js
'/a'
```

## `uploader.length`
Length of randomly generated characters for uploads

**Type**: `number`

**Env Property**: `UPLOADER_LENGTH`

**Example**:
```js
6
```

## `uploader.directory`
Which directory uploads should be stored to

**Type**: `string`

**Env Property**: `UPLOADER_DIRECTORY`

**Example**:
```js
'./uploads'
```

## `uploader.admin_limit`
File size limit for administrators
**Type**: `number`

**Env Property**: `UPLOADER_ADMIN_LIMIT`

**Example**:
```js
104900000 // 100mb
```

## `uploader.user_limit`
File size limit for normal users
**Type**: `number`

**Env Property**: `UPLOADER_USER_LIMIT`

**Example**:
```js
104900000 // 100mb
```

## `uploader.disabled_extensions`
An array of disabled extensions to be blocked when uploading files
**Type**: `array`

**Env Property**: `UPLOADER_DISABLED_EXTENSIONS`

**Example**:
```js
// if config.toml
['png', 'jpg']

// if env vars (comma delimited)
png,jpg
```