# Features

This page documents features that can be disabled or enabled in Zipline.

## `FEATURES_INVITES`

Disable or enable invites. If disabled, users will not be able to invite other users to Zipline. Defaults to being disabled.

```bash
FEATURES_INVITES=true
```

## `FEATURES_INVITES_LENGTH`

The length of the invite code. Defaults to 6.

```bash
FEATURES_INVITES_LENGTH=6
```

## `FEATURES_OAUTH_REGISTRATION`

Disable or enable Oauth user registration. If disabled, users will not be able to register themselves via an [oauth provider](/docs/guides/oauth). Defaults to being disabled.

```bash
FEATURES_OAUTH_REGISTRATION=false
```

## `FEATURES_OAUTH_LOGIN_ONLY`

Enable or disable Oauth's user login. If enabled, users will only be able to login when using Oauth rather than registering. Logging in with a username and passworl will still work. Defaults to being disabled.

```bash
FEATURES_OAUTH_LOGIN_ONLY=true
```

## `FEATURES_USER_REGISTRATION`

Disable or enable user registration. If disabled, users will not be able to register themselves. Defaults to being disabled.

```bash
FEATURES_USER_REGISTRATION=false
```

## `FEATURES_HEADLESS`

Runs Zipline in headless mode. This will entirely disable the front end, leaving only the API accessible. This defaults to being disabled as normal users usually want to use the front end. This may be useful if you create your own front end and want to use Zipline as a backend.

```bash
FEATURES_HEADLESS=false
```

## `FEATURES_DEFAULT_AVATAR`

The default avatar to use when new users are created or invited. Defaults to nothing.

<Alert type="info">
This is a path to a file, not a URL. If using docker, a relative path will be relative to the root of the docker container, and you can use the `./public` directory to store files, which already has a volume in the `docker-compose.yml`
</Alert>

```bash
FEATURES_DEFAULT_AVATAR=./public/zipline.png
```

## `FEATURES_ROBOTS_TXT`

If enabled, this will automatically create a /robots.txt route, that will disallow certain routes including upload routes from crawler bots.

```bash
FEATURES_ROBOTS_TXT=false
```

## `FEATURES_THUMBNAILS`

If enabled, thumbnails will be generated for uploaded videos.

```bash
FEATURES_THUMBNAILS=true
```
