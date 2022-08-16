# Datasource
Zipline supports using different types of ways to store files. It defaults to saving files to the disk but Zipline now supports Amazon S3 and OpenStack Swift.

## `DATASOURCE_TYPE`
Must be either `local`, `s3` or `swift`
```bash
DATASOURCE_TYPE=local
```