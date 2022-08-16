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