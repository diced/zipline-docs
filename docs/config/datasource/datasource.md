# Datasource
Zipline supports using different types of ways to store files. It defaults to saving files to the disk but Zipline now supports S3 based storage, and local file storage.

## `DATASOURCE_TYPE`
Must be either `local`, `s3`
```bash
DATASOURCE_TYPE=local
```

```bash
DATASOURCE_TYPE=s3
```
