# Core
This page documents the core configuration of Zipline.

## `CORE_HTTPS`
Whether or not to return an `https` url.
```bash
CORE_HTTPS=true
```

## `CORE_SECRET`
The secret key used to sign sensitive data. IF the value remains as `changethis` then Zipline will exit with an error telling you to change it.
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