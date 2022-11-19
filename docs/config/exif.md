# Exiftool Metadata

This page documents how Zipline should handle metadata from Exiftool.

## `EXIF_ENABLED`

Whether or not Exiftool metadata is enabled. If set to `false`, Exiftool metadata will not be available. If enabled, you can view metadata for each file by clicking on the image and clicking the "Metadata" button.

```bash
EXIF_ENABLED=true
```

## `EXIF_REMOVE_GPS`

Whether or not to remove GPS data from Exiftool metadata. If set to `true`, GPS data will be removed from Exiftool metadata. If set to `false`, GPS data will be kept in Exiftool metadata.

:::info
This option will work whether or not `EXIF_ENABLED` is set to `true`.
:::

```bash
EXIF_REMOVE_GPS=true
```
