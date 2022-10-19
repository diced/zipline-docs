# GET /api/upload

## Headers
Upload a file to Zipline, for more options see the [configuration](/docs/guides/upload-options) page.

## Body (multipart/form-data)
Field names of files should be `file`, if you want to upload multiple files then just append multiple fields with the name still being `file`.

## Returns (JSON)

| Field Name | Type | Description |
|------------|------|-------------|
|`files`|`array of strings`|The URLs of the uploaded files|

```json
{
  "files": [
    "https://example.com/asdfgh.png"
  ]
}
```