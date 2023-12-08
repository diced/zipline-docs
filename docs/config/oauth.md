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

## `OAUTH_DISCORD_REDIRECT_URI`

Use a different redirect uri instead of an automatically assumed one, this is useful when using tunnels.

```bash
OAUTH_DISCORD_REDIRECT_URI=https://zipline.example.com/api/auth/oauth/discord
```

## `OAUTH_DISCORD_WHITELISTED_USERS`

A comma-seperated list of Discord user IDs that are allowed to login to Zipline. This is useful for restricting access to Zipline to a specific set of users.

```bash
OAUTH_DISCORD_WHITELISTED_USERS='328983966650728448,123456789'
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

## `OAUTH_GOOGLE_REDIRECT_URI`

Use a different redirect uri instead of an automatically assumed one, this is useful when using tunnels.

```bash
OAUTH_GOOGLE_REDIRECT_URI=https://zipline.example.com/api/auth/oauth/google
```
