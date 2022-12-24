# SSL

This page documents the SSL configuration of Zipline.

<Alert type="info">
You will need to configure the correct volumes, if using docker so that Zipline can read the `.pem` files.
</Alert>

## `SSL_KEY`

The path to the SSL key file.

```bash
SSL_KEY=/path/to/key.pem
# or relative to the root of the project
SSL_KEY=./key.pem
# or going back one directory from the root of the project
SSL_KEY=../key.pem
```

## `SSL_CERT`

The path to the SSL certificate file.

```bash
SSL_CERT=/path/to/cert.pem
# or relative to the root of the project
SSL_CERT=./cert.pem
# or going back one directory from the root of the project
SSL_CERT=../cert.pem
```

## `SSL_ALLOW_HTTP1`

Allow HTTP/1.1 connections.

```bash
SSL_ALLOW_HTTP1=true
```
