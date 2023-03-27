---
sidebar_position: 3
---

# cURL

## Upload Files

You can upload files using this simple shell script. You can export the `$TOKEN` AND `$HOST` in your `.bashrc` or `.zshrc` (whatever shell you use), or just replace them with their actual values within the script it self.

Before using this script you need to have [jq](https://stedolan.github.io/jq/) installed.

```bash title="upload.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload
```

You can also modify this a bit to make it copy the files url to the clipboard. This is made possible with the [xsel](https://github.com/kfish/xsel) tool.

```bash title="upload.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload | jq -r '.url' | xsel -ib
```

## Shorten URLs

You can also shorten URLs using this simple shell script. You can export the `$TOKEN` AND `$HOST` in your `.bashrc` or `.zshrc` (whatever shell you use), or just replace them with their actual values within the script it self.

```bash title="shorten.sh"
#!/bin/bash

arg=$1;
curl -H "authorization: j42hCgpWGIBxXzT1Uh2cXueC.MTY3MjY5ODA5NDMzNg" -H "Content-Type: application/json" -H "No-JSON: true" -d "{\"url\": \"$arg\"}" $HOST/api/shorten | tr -d '\n' | xsel -ib;
```

```
$ ./shorten.sh https://example.com
```

<Alert type="note">
This script can be automatically generated through the Manage User page, and selecing the "Generate Flameshot Script" (yes, it says flameshot, but this will not use flameshot). After this make sure "Upload Type" is set to "Shorten URLs" and feel free to configure any remaining settings.
</Alert>

This script takes advantage of the `No-JSON` header, which will return a text response. This is useful if you want to skip the JSON parsing, which can be slow in the case of [jq](https://stedolan.github.io/jq/).
