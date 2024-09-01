# Exiftool Metadata

This page documents how Zipline should handle metadata from Exiftool.

<Alert type="info">
When uploading a file while `EXIF_REMOVE_GPS` is enabled, the response (if JSON), will contain the property `removed_gps` with a value of `true` or `false`. If `true`, the file had GPS data that was removed. If `false`, the file did not have GPS data.
</Alert>

## `EXIF_ENABLED`

Whether or not to use any exif related features. If set to `false`, removing GPS metadata will not work.

```bash
EXIF_ENABLED=true
```

## `EXIF_REMOVE_GPS`

Whether or not to remove GPS data from the file's Exiftool metadata. If set to `true`, GPS data will be removed from the file's  Exiftool metadata. If set to `false`, GPS data will be kept in the file's  Exiftool metadata.


```bash
EXIF_REMOVE_GPS=true
```
