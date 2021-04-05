---
title: cURL Script
description: cURL Script
slug: /uploaders/curl
---

You can upload files using this simple shell script. You can export the vars `$TOKEN` and `$HOST` in your `.bashrc` or `.zshrc`, or just replace them with your actual values.

```bash title="upload.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload
```

This requires `xsel` to work. You can replace the pipe with any command that can copy to clipboard.
```bash title="upload.sh copy to clipboard"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload | xsel -ib
```

Once done you can start using the script!
```bash
chmod +x uploader.sh
./upload.sh pic.png
```
