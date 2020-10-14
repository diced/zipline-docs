---
title: ShareX Config
description: ShareX Uploader Config
slug: /uploaders/sharex
---

If you upload images using [ShareX](https://getsharex.com), you can use this config.

```json title="uploader.sxcu"
{
  "Version": "13.2.1",
  "Name": "CDN",
  "DestinationType": "ImageUploader, TextUploader",
  "RequestMethod": "POST",
  "RequestURL": "http(s)://{YOUR HOST}/api/upload",
  "Headers": {
    "authorization": "{YOUR TOKEN}"
  },
  "Body": "MultipartFormData",
  "FileFormName": "file"
}
```
