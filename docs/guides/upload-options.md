---
sidebar_position: 3
---

# Upload Options
When uploading files you have a few options to choose from in the form of headers.

| Header Name | Type | Description |
|-------------|------|-------------|
|`Format`|must be `UUID`, `DATE`, `RANDOM`, `NAME`|See [Image Format](#image-format)|
|`Image-Compression-Percent`|`number`|The quality of the image, leave blank if no compression. See [Image Compression](#image-compression) for more|
|`Expires-At`|must be a Javascript resolvable `Date`|Set a date for the image to exipre at. See [Image Expiry](#image-expiration) for more.|
|`Password`|`string`|Create a password locked image|
|`Zws`|`boolean`|If this header is present it will create a zero-width-space url|
|`Embed`|`boolean`|If this header is present, the image will have additional `OG` metadata (mostly used on Discord)|
|`Authorization`|`string`|A required field, your users auth token|

## Image Format
The `Format` header dictates the format of a file name. Here is a list of what each format does.

| Name | Description | Example |
|------|-------------|---------|
|`RANDOM`|This is the default format, which will create a alphanumeric string that is [UPLOADER_LENGTH](/docs/config/uploader#uploader_length) long|`8QdSZM.png`|
|`UUID`|The UUID of the file is used as the name of the file.|`ec7eb6d2-c405-41ec-91eb-11387fc2f9a2.png`|
|`DATE`|The current date as the file name in the format of `YYYY-MM-DD_HH:mm:ss`|`2022-08-16_09:55:31.png`|
|`NAME`|This will keep the original name of the file, when sent to the server.|`Somerandomfilenameidk.png`|

## Image Compression
Zipline now supports compressing images. When compressing an image Zipline will turn it into a `jpeg` image with the preferred quality. Here is an example of an image compressed at 20% quality.

### No compression
![](/guides/compression-100.png)

### 20% compression
![](/guides/compression-20.png)

## Image Expiration
Zipline now supports expiring images. When an image is expired it will be deleted from the server. The string must be a javascript resolvable `Date`. If you do not want to deal with this you can just use the dashboard to upload an image with an expiration which is much easier.

If the date couldnt resolve to a date, Zipline will return a 400 error.

If the date is in the past Zipline will return a 400 error.

## Ratelimit
If your user is ratelimited, you can see how long you have to wait with the `X-Ratelimit-Remaining` header.