---
sidebar_position: 3
---

# Upload Options

When uploading files you have a few options to choose from in the form of headers.

| Header Name                 | Type                                                                     | Description                                                                                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Format`                    | must be `UUID`, `DATE`, `RANDOM`, `NAME`                                 | See [File Format](#file-format)                                                                                                                                                                                                    |
| `Image-Compression-Percent` | `number`                                                                 | The quality of the image, leave blank if no compression. See [Image Compression](#image-compression) for more                                                                                                                      |
| `Expires-At`                | must be a Javascript resolvable `Date` or something like `"1d"` or `30m` | Set a date for the file to exipre at. See [Image Expiry](#image-expiration) for more.                                                                                                                                              |
| `Password`                  | `string`                                                                 | Create a password locked image                                                                                                                                                                                                     |
| `Zws`                       | `boolean`                                                                | If this header is present it will create a zero-width-space url                                                                                                                                                                    |
| `Embed`                     | `boolean`                                                                | If this header is present, the image will have additional `OG` metadata (mostly used on Discord)                                                                                                                                   |
| `Max-Views`                 | `number`                                                                 | The maximum amount of views before the file is deleted                                                                                                                                                                             |
| `UploadText`                | `boolean`                                                                | If this header is present, it will override the mimetype to `text/plain` and when the file is accessed will render with PrismJS, with syntax highlighting (limited). This option is primarily used by the server for text uploads. |
| `Authorization`             | `string`                                                                 | A required field, your users auth token                                                                                                                                                                                            |
| `No-JSON`                   | `boolean`                                                                | If this header is present, it will not return a JSON response, instead it will return the file url in plain text. See [/api/upload text](/docs/api/upload#-ok-text)                                                                |
| `X-Zipline-Filename`        | `string`                                                                 | The name of the file, this will override the name of the file.                                                                                                                                                                     |
| `Original-Name`             | `string`                                                                 | To preserve the original name, while also using a file name format. See [Original Name](#original-name)                                                                                                                            |
| `Override-Domain`           | `string`                                                                 | If this header is present, it will override the domain used in the response. For more information see [Override Domain](#override-domain)                                                                                          |

## File Format

The `Format` header dictates the format of a file name. Here is a list of what each format does.

<Alert type="note">
  This will not work if the `X-Zipline-Filename` header is present.
</Alert>

| Name     | Description                                                                                                                               | Example                                    |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `RANDOM` | This is the default format, which will create a alphanumeric string that is [UPLOADER_LENGTH](/docs/config/uploader#uploader_length) long | `8QdSZM.png`                               |
| `UUID`   | The UUID of the file is used as the name of the file.                                                                                     | `ec7eb6d2-c405-41ec-91eb-11387fc2f9a2.png` |
| `DATE`   | The current date as the file name in the format specified in [UPLOADER_FORMAT_DATE](/docs/config/uploader#)                               | `2022-08-16_09:55:31.png`                  |
| `NAME`   | This will keep the original name of the file, when sent to the server.                                                                    | `Somerandomfilenameidk.png`                |

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

| Expression | Time         | Example                                          |
| ---------- | ------------ | ------------------------------------------------ |
| `ms`       | Milliseconds | `10ms`, `10 milliseconds`, `10 ms`               |
| `s`        | Seconds      | `10s`, `10 seconds`, `10 secs`, `10 sec`, `10 s` |
| `m`        | Minutes      | `10m`, `10 minutes`, `10 mins`, `10 min`, `10 m` |
| `h`        | Hours        | `10h`, `10 hours`, `10 hrs`, `10 hr`, `10 h`     |
| `d`        | Days         | `10d`, `10 days`, `10 days`, `10 day`, `10 d`    |
| `w`        | Weeks        | `10w`, `10 weeks`, `10 week`, `10 w`             |
| `y`        | Years        | `10y`, `10 years`, `10 year`, `10 yrs`, `10 y`   |

## Ratelimit

If your user is ratelimited, you can see how long (seconds) you have to wait with the `X-Ratelimit-Remaining` header.

## Original Name

When using the `Original-Name` header, this will keep the original name in the `Content-Disposition` header, while also using a file name format. This is useful if you want the original name to show up when you save the file, but also want to use a file name format to display in the url.

![](/guides/original-name-1.png)

As you can see, the original name is `t.png`, but the file name format is `AuLOs1.png`. This is useful if you want to keep the original name, but also want to use a file name format.

## Override Domain

Overriding the domain may be useful if you would like your files to have a different "appearance", for example, having one domain for files and one domain for shortened URLs.

<Alert type="note">
  The dashboard provides a way to override the domain when uploading files through it.

  You can also set the override domain property within the ShareX and Flameshot generators.
</Alert>

### Example

If using two seperate domains, you will want to make sure they point to the same Zipline instance within your domain DNS settings.


| Type | Name    | Content   |
| ---- | ------- | --------- |
| A    | `files` | `1.1.1.1` |
| A    | `short` | `1.1.1.1` |

<Alert type="danger">
  Make sure the domains are pointing to the same IP address.
</Alert>

Then for your files, make sure the `Override-Domain` header is set to `files.example.com`, and for your shortened URLs, make sure the `Override-Domain` header is set to `short.example.com`.

You will be able to access your files at `http(s)://files.example.com/AuLOs1.png` and your shortened URLs at `http(s)://short.example.com/AuLOs1`.