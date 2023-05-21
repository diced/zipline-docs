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

## OAUTH_AUTHENTIK_CLIENT_ID
Your OAuth Client ID. 
```bash
OAUTH_AUTEHNTIK_CLIENT_ID=your_client_id
```

## OAUTH_AUTHENTIK_CLIENT_SECRET
Your client secret.
```bash
OAUTH_AUTHENTIK_CLIENT_SERCET=sijfsoudhfdhi4s4sd
```

## OAUTH_AUTHENTIK_AUTHORIZE_URL
The authorize URL for your authentik server. This is typically your authetik host followed by `/application/o/authorize/`
```bash
OAUTH_AUTHENTIK_AUTHORIZE_URL=https://authetik.example/application/o/authorize/
```

## OAUTH_AUTHENTIK_USERINFO_URL
Your userinfo URL. This is typically your authetik host followed by `/application/o/userinfo/`
```bash
OAUTH_AUTHENTIK_USERINFO_URL=https://authentik.example/application/o/userinfo/
```

## OAUTH_AUTHENTIK_TOKEN_URL
Your Token URL. This is typically your authentik host follow by `/application/o/token/`
```bash
OAUTH_AUTHENTIK_TOKEN_URL=https://authentik.example/application/o/token/
```
