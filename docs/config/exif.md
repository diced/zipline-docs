# Exiftool Metadata

This page documents how Zipline should handle metadata from Exiftool.

<Alert type="info">
When uploading a file while `EXIF_REMOVE_GPS` is enabled, the response (if JSON), will contain the property `removed_gps` with a value of `true` or `false`. If `true`, the file had GPS data that was removed. If `false`, the file did not have GPS data.
</Alert>

## `EXIF_ENABLED`

Whether or not Exiftool metadata is enabled. If set to `false`, Exiftool metadata will not be available. If enabled, you can view metadata for each file by clicking on the image and clicking the "Metadata" button.

```bash
EXIF_ENABLED=true
```

## `EXIF_REMOVE_GPS`

Whether or not to remove GPS data from Exiftool metadata. If set to `true`, GPS data will be removed from Exiftool metadata. If set to `false`, GPS data will be kept in Exiftool metadata.

<Alert type="info">
This option will work whether or not `EXIF_ENABLED` is set to `true`.
</Alert>

```bash
EXIF_REMOVE_GPS=true
```
