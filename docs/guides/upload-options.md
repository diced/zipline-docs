---
sidebar_position: 3
---

# Upload Options
When uploading files you have a few options to choose from in the form of headers.

| Header Name | Type | Description |
|-------------|------|-------------|
|`Format`|must be `UUID`, `DATE`, `RANDOM`, `NAME`|See [Image Format](#image-format)|
|`Image-Compression-Percent`|`number`|The quality of the image, leave blank if no compression. See [Image Compression](#image-compression) for more|
|`Expires-At`|must be a Javascript resolvable `Date` or something like `"1d"` or `30m`|Set a date for the image to exipre at. See [Image Expiry](#image-expiration) for more.|
|`Password`|`string`|Create a password locked image|
|`Zws`|`boolean`|If this header is present it will create a zero-width-space url|
|`Embed`|`boolean`|If this header is present, the image will have additional `OG` metadata (mostly used on Discord)|
|`Max-Views`|`number`|The maximum amount of views before the file is deleted|
|`UploadText`|`boolean`|If this header is present, it will override the mimetype to `text/plain` and when the file is accessed will render with PrismJS, with syntax highlighting (limited). This option is primarily used by the server for text uploads.|
|`Authorization`|`string`|A required field, your users auth token|

## Image Format
The `Format` header dictates the format of a file name. Here is a list of what each format does.

| Name | Description | Example |m
|------|-------------|---------|
|`RANDOM`|This is the default format, which will create a alphanumeric string that is [UPLOADER_LENGTH](/docs/config/uploader#uploader_length) long|`8QdSZM.png`|
|`UUID`|The UUID of the file is used as the name of the file.|`ec7eb6d2-c405-41ec-91eb-11387fc2f9a2.png`|
|`DATE`|The current date as the file name in the format specified in [UPLOADER_FORMAT_DATE](/docs/config/uploader#)|`2022-08-16_09:55:31.png`|
|`NAME`|This will keep the original name of the file, when sent to the server.|`Somerandomfilenameidk.png`|

## Image Compression
Zipline now supports compressing images. When compressing an image Zipline will turn it into a `jpeg` image with the preferred quality. Here is an example of an image compressed at 20% quality.

### No compression
![](/guides/compression-100.png)

### 20% compression
![](/guides/compression-20.png)

## Image Expiration
Zipline now supports expiring images. 
When an image is expired it will be deleted from the server.
If the header starts with `date=`, the following string must be a Javascript resolvable `Date`, an example: `date=2022-08-21T19:26:16.779Z`.
If you would like to use a shorthand expression, you may do the following as the header value: `1d` (expire one day from now).
If the date couldnt resolve to a date or is in the past, Zipline will return a 400 error.

### Shorthand expressions
The expression is `{number}{optional space}{unit}`. The space between the number and the unit is **not** required. You may only specify one expression per expiry, `1d 6h` (1 day and 6 hours) will not work.

| Expression | Time | Example |
|------------|------|---------|
| `ms` | Milliseconds | `10ms`, `10 milliseconds`, `10 ms` |
| `s` | Seconds | `10s`, `10 seconds`, `10 secs`, `10 sec`, `10 s` |
| `m` | Minutes | `10m`, `10 minutes`, `10 mins`, `10 min`, `10 m` |
| `h` | Hours | `10h`, `10 hours`, `10 hrs`, `10 hr`, `10 h` |
| `d` | Days | `10d`, `10 days`, `10 days`, `10 day`, `10 d` |
| `w` | Weeks | `10w`, `10 weeks`, `10 week`, `10 w` |
| `y` | Years | `10y`, `10 years`, `10 year`, `10 yrs`, `10 y` | 

## Ratelimit
If your user is ratelimited, you can see how long you have to wait with the `X-Ratelimit-Remaining` header.