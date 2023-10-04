# Core

This page documents the core configuration of Zipline.

## `CORE_RETURN_HTTPS`

Whether or not to return an `https` url in uploads. This may be useful when using cloudflare's SSL and not your own. This option has nothing to do with Zipline's SSL options, do not confuse the two.

<Alert type="danger">
You will need to set this to true to make the uploader return https URLs if using [SSL](/docs/config/ssl).
</Alert>

```bash
CORE_RETURN_HTTPS=true
```

## `CORE_SECRET`

The secret key used to sign sensitive data. If the value remains as `changethis` then Zipline will exit with an error telling you to change it.

```bash
CORE_SECRET=changethis
```

## `CORE_HOST`

The hostname to listen on. Keep as `0.0.0.0` if using docker, usually `0.0.0.0` will work in other cases not using docker.

```bash
CORE_HOST=0.0.0.0
```

## `CORE_PORT`

The port to listen on.

```bash
CORE_PORT=3000
```

## `CORE_DATABASE_URL`

The PostgreSQL database url.

```bash
CORE_DATABASE_URL=postgres://user:password@host:port/database
```

## `CORE_STATS_INTERVAL`

The number of seconds to wait until refreshing statistics of Zipline. This is used to reduce load times when viewing statistics on the dashboard.

```bash
CORE_STATS_INTERVAL=1800
```

## `CORE_INVITES_INTERVAL`

The number of seconds to wait until clearing expired or used invites from the database. This is used as invites that are expired are not automatically removed from the database.

```bash
CORE_INVITES_INTERVAL=1800
```

## `CORE_THUMBNAILS_INTERVAL`

The number of seconds to wait until generating thumbnails for videos, that **don't** have thumbnails already associated with them. See [Video Thumbnails](/docs/guides/video-thumbnails) for more information.

```bash
CORE_THUMBNAILS_INTERVAL=600 # every 10 mins
```

## `CORE_COMPRESSION_ENABLED`

Whether to have compression enabled. This is used to save on bandwidth by enabling the `?compress` query in the `/r/:id` and the `/u/:id` endpoints. Currently, this is experimental and could end up compressing contents that should\'t be compressed. This is disabled by default.

```bash
CORE_COMPRESSION_ENABLED=true
```

## `CORE_COMPRESSION_THRESHOLD`

The amount of bytes a file size can be before it can be compressed. For more info on what values are accepted, see [here](/docs/guides/byte-format). The default, if enabled, is 2048 bytes.

```bash
CORE_COMPRESSION_THRESHOLD=1gb
```

## `CORE_COMPRESSION_ON_DASHBOARD`

Whether to have compression be used on the dashboard. This will have all images on the dashboard, excluding built in, be served with compression in mind.

```bash
CORE_COMPRESSION_ON_DASHBOARD=true
```

## `CORE_TEMP_DIRECTORY`

The location of your zipline temp directory. It will be in `/tmp/zipline` by default. If partial files from chunking an upload were left in the temp directory, Zipline may warn on start about them. To remove the warning for any future (re)starts, clear the temp directory.

```bash
CORE_TEMP_DIRECTORY=/tmp/zipline-temp
```
