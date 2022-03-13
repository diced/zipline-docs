# Datasource
If no datasource is specified it will use default options from the `local` datasource.

## `datasource.type`
Type of datasource to use.

**Type**: `string`

**Env Property**: `DATASOURCE_TYPE`

**Example**:
```js
'local'
// or
's3'
```

## Local Datasource `datasource.local`

### `datasource.local.directory`
Directory for uploads

**Type**: `string`

**Env Property**: `DATASOURCE_LOCAL_DIRECTORY`

**Example**:
```js
'./uploads'
```

## S3 Datasource `datasource.s3`

### `datasource.s3.access_key_id`
AWS Access key

**Type**: `string`

**Env Property**: `DATASOURCE_S3_ACCESS_KEY`

**Example**:
```js
'aoughwkuifaurgt4wiheajdknmk'
```

### `datasource.s3.secret_access_key`
AWS Secret Access key

**Type**: `string`

**Env Property**: `DATASOURCE_S3_SECRET_ACCESS_KEY`

**Example**:
```js
'aoughwkuifaurgt4wiheajdknmk'
```

### `datasource.s3.bucket`
S3 Bucket to use

**Type**: `string`

**Env Property**: `DATASOURCE_S3_BUCKET`

**Example**:
```js
'zipline-uploads'
```