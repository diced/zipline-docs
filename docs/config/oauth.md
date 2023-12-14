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

## OAUTH_OIDC_CLIENT_ID
Your OIDC Client ID. 
```bash
OAUTH_OIDC_CLIENT_ID=your_client_id
```

## OAUTH_OIDC_CLIENT_SECRET
Your OIDC secret.
```bash
OAUTH_OIDC_CLIENT_SERCET=sijfsoudhfdhi4s4sd
```

## OAUTH_OIDC_AUTHORIZE_URL
The authorize URL for your OIDC provider. With Authentik, this typically is your Authentik host followed by `/application/o/authorize/`.
```bash
OAUTH_OIDC_AUTHORIZE_URL=https://authentik.example.com/application/o/authorize/
```

## OAUTH_OIDC_USERINFO_URL
Your userinfo URL. With Authentik, this typically your Authentik host followed by `/application/o/userinfo/`.
```bash
OAUTH_OIDC_USERINFO_URL=https://authentik.example.com/application/o/userinfo/
```

## OAUTH_OIDC_TOKEN_URL
Your token URL. With Authentik, this typically is your Authentik host followed by `/application/o/token/`.
```bash
OAUTH_OIDC_TOKEN_URL=https://authentik.example.com/application/o/token/
```
