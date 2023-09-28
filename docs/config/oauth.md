# OAuth
This page documents OAuth variables that can be set in Zipline.

## `OAUTH_DISCORD_CLIENT_ID`
The Discord client ID for your application. This is used to authenticate with Discord's OAuth API.

```bash
OAUTH_DISCORD_CLIENT_ID=1234567890
```

## `OAUTH_DISCORD_CLIENT_SECRET`
The Discord client secret for your application. This is used to authenticate with Discord's OAuth API.

```bash
OAUTH_DISCORD_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

## `OAUTH_GITHUB_CLIENT_ID`
The GitHub client ID for your application. This is used to authenticate with GitHub's OAuth API.

```bash
OAUTH_GITHUB_CLIENT_ID=1234567890
```

## `OAUTH_GITHUB_CLIENT_SECRET`
The GitHub client secret for your application. This is used to authenticate with GitHub's OAuth API.

```bash
OAUTH_GITHUB_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

## `OAUTH_GOOGLE_CLIENT_ID`
The Google client ID for your application. This is used to authenticate with Google's OAuth API.

```bash
OAUTH_GOOGLE_CLIENT_ID=1234567890
```

## `OAUTH_GOOGLE_CLIENT_SECRET`
The Google client secret for your application. This is used to authenticate with Google's OAuth API.

```bash
OAUTH_GOOGLE_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

## `OAUTH_OIDC_CLIENT_ID`
The client ID for your application, as provided by your IdP.
```bash
OAUTH_OIDC_CLIENT_ID=qwertyuiopasdfghjklzxcvbnm
```

## `OAUTH_OIDC_CLIENT_SECRET`
The client secret for your application, as provided by your IdP.
```bash
OAUTH_OIDC_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

## `OAUTH_OIDC_AUTHORIZE_URL`
The authorize endpoint for your application, as provided by your IdP
```bash
OAUTH_OIDC_AUTHORIZE_URL=https://authentik.example.com/application/o/authorize/
```

## `OAUTH_OIDC_TOKEN_URL`
The token endpoint for your application, as provided by your IdP
```bash
OAUTH_OIDC_TOKEN_URL=https://authentik.example.com/application/o/token/
```

## `OAUTH_OIDC_USERINFO_URL`
The userinfo endpoint for your application, as provided by your IdP
```bash
OAUTH_OIDC_USERINFO_URL=https://authentik.example.com/application/o/userinfo/
```

## `OAUTH_OIDC_SCOPES`
The scopes required for authentication
```bash
OAUTH_OIDC_SCOPES=openid profile email
```

## `OAUTH_OIDC_NAME_FIELD`
The field used as a username, e.g. `email` or `preferred_username`
```bash
OAUTH_OIDC_NAME_FIELD=email
```

## `OAUTH_OIDC_USER_ID_FIELD`
The field used as a userid, e.g. `email`
```bash
OAUTH_OIDC_USER_ID_FIELD=email
```

## `OAUTH_OIDC_PROVIDER_DISPLAY_NAME`
The displayed name for this provider 
```bash
OAUTH_OIDC_PROVIDER_DISPLAY_NAME=OIDC
```