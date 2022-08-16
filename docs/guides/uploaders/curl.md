---
sidebar_position: 3
---

# cURL
You can upload files using this simple shell script. You can export the `$TOKEN` AND `$HOST` in your `.bashrc` or `.zshrc` (whatever shell you use), or just replace them with their actual values within the script it self.

Before using this script you need to have [jq](https://stedolan.github.io/jq/) installed.

```bash title="upload.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload
```

You can also modify this a bit to make it copy the files url to the clipboard. This is made possible with the [xsel](https://github.com/kfish/xsel) tool.

```bash title="upload.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload | jq -r '.url' | xsel -ib
```