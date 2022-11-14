# Features
This page documents features that can be disabled or enabled in Zipline.

## `FEATURES_INVITES`
Disable or enable invites. If disabled, users will not be able to invite other users to Zipline. Defaults to being enabled.
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

## `FEATURES_USER_REGISTRATION`
Disable or enable user registration. If disabled, users will not be able to register themselves. Defaults to being disabled.
```bash
FEATURES_USER_REGISTRATION=false
```