# Uploader
This page documents the uploader configuration of Zipline.

## `UPLOADER_DEFAULT_FORMAT`
The default 'upload format' for files. For more info on what values are accepted, see [here](/docs/guides/upload-options#image-format).
```bash
UPLOADER_DEFAULT_FORMAT=NAME
```

## `UPLOADER_ROUTE`
The route to serve files on.
```bash
UPLOADER_ROUTE=/u
```

## `UPLOADER_LENGTH`
When using the `RANDOM` file name format, this will be the length of a random alphanumeric string to use as the file name.
```bash
UPLOADER_LENGTH=6
```

## `UPLOADER_ADMIN_LIMIT`
The amount of bytes that can be uploaded by an admin. For more info on what values are accepted, see [here](/docs/guides/byte-format).
```bash
UPLOADER_ADMIN_LIMIT=50mb
```

## `UPLOADER_USER_LIMIT`
The amount of bytes that can be uploaded by a user. For more info on what values are accepted, see [here](/docs/guides/byte-format)
```bash
UPLOADER_USER_LIMIT=50mb
```

## `UPLOADER_DISABLED_EXTENSIONS`
A comma separated list of file extensions that are not allowed to be uploaded.
```bash
UPLOADER_DISABLED_EXTENSIONS=png,jpg,gif,mp4
```

## `UPLOADER_FORMAT_DATE`
When using the [`DATE` format on file uploads](/docs/guides/upload-options#image-format) you can set the date format to use. For more info on date formats, visit [dayjs format](https://day.js.org/docs/en/display/format).

```bash
UPLOADER_FORMAT_DATE='YYYY-MM-DD_HH:mm:ss'
```

## `UPLOADER_DEFAULT_EXPIRATION`
The default expiration time for files. For more info on what values are accepted, see [image expiration](/docs/guides/upload-options#image-expiration). This is defaulted to being disabled.
```bash
UPLOADER_DEFAULT_EXPIRATION=1d
```
