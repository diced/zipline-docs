# Human Readable Byte Sizes

Some config values support human readable byte sizes. For example, `UPLOADER_ADMIN_LIMIT=50mb` is the same as `UPLOADER_ADMIN_LIMIT=52428800`. The following units are supported:

| Unit | Bytes |
| ---- | ----- |
| b    | 1 **byte** |
| kb   | 1024 **bytes** |
| mb   | 1024 \* 1024 **bytes** |
| gb   | 1024 \* 1024 \* 1024 **bytes** |
| tb   | 1024 \* 1024 \* 1024 \* 1024 **bytes** |
| pb   | 1024 \* 1024 \* 1024 \* 1024 \* 1024 **bytes** |