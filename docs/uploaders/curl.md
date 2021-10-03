# cURL
You can upload files using this simple shell script. You can export the vars `$TOKEN` and `$HOST` in your `.bashrc` or `.zshrc`, or just replace them with your actual values.

## Upload Script
```bash title="upload.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload
```

## Upload script that copies to clipboard
This requires `xsel` to work. You can replace the pipe with any command that can copy to clipboard.
```bash title="copy.sh"
curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload | jq -r '.url' | xsel -ib
```

Once done you can start using the script!
```bash
chmod +x uploader.sh
./upload.sh pic.png
```
