---
id: sharex
title: ShareX Config
---

If you upload images using [ShareX](https://getsharex.com), you can use this config.

## Without Embed
```json title="uploader.sxcu"
{
  "Version": "13.2.1",
  "Name": "CDN",
  "DestinationType": "ImageUploader, TextUploader",
  "RequestMethod": "POST",
  "RequestURL": "http(s)://{YOUR HOST}/api/upload",
  "Headers": {
    "Authorization": "{YOUR TOKEN}"
  },
  "URL": "$json:url$",
  "Body": "MultipartFormData",
  "FileFormName": "file"
}
```

## With Embed
```json title="uploader_with_embed.sxcu"
{
  "Version": "13.2.1",
  "Name": "CDN",
  "DestinationType": "ImageUploader, TextUploader",
  "RequestMethod": "POST",
  "RequestURL": "http(s)://{YOUR HOST}/api/upload",
  "Headers": {
    "Authorization": "{YOUR TOKEN}",
    "Embed": "true"
  },
  "URL": "$json:url$",
  "Body": "MultipartFormData",
  "FileFormName": "file"
}
```
