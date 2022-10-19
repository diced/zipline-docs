# Uploader
This page documents the uploader configuration of Zipline.

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
The amount of bytes that can be uploaded by an admin.
```bash
UPLOADER_ADMIN_LIMIT=1000000
```

## `UPLOADER_USER_LIMIT`
The amount of bytes that can be uploaded by a user.
```bash
UPLOADER_USER_LIMIT=1000000
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