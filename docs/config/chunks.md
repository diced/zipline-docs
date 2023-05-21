# Chunks
This page documents the file chunking configuration of Zipline. Chunking may be useful when uploading large files while using Cloudflare's Free Plan which limits the maximum upload size to 100MB.

## `CHUNKS_CHUNKS_SIZE`
The size of each chunk to be uploaded, Zipline will attempt to split a file equally so that each chunk is `CHUNKS_CHUNKS_SIZE`. For more info on what values are accepted, see [here](/docs/guides/byte-format).
```bash
CHUNKS_CHUNKS_SIZE=25mb
```

## `CHUNKS_MAX_SIZE`
The max size of an upload before it is chunked. If a file is 500mb, it will be chunked, if a file is only 30mb it will not be chunked. If using Cloudflare's Free Plan, it is recomended to leave the `CHUNKS_MAX_SIZE` at 95mb. For more info on what values are accepted, see [here](/docs/guides/byte-format)
```bash
CHUNKS_MAX_SIZE=95mb
```

## `CHUNKS_ENABLED`
Whether to enable or disable chunking. The above variables will be ignored if this were to be set to `false`
```bash
CHUNKS_ENABLED=true
```