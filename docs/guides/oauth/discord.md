# Discord
This will walk you through the process of setting up Discord OAuth for your Zipline instance.

## Create a Discord Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click the "New Application" button.
3. Give your application a name.
4. Click the "Create" button then click the "OAuth2" tab.
5. Click the "Add Redirect" button.
  - Make sure the redirect URL is `https://<your-zipline-domain>/api/auth/oauth/discord`.
  ![Discord OAuth Redirect](/guides/oauth-discord-1.png)
6. Copy the "Client ID" and "Client Secret" and save them for later.

## Configure Zipline
Set the [`OAUTH_DISCORD_CLIENT_ID`](/docs/config/oauth#oauthdiscordclientid) and [`OAUTH_DISCORD_CLIENT_SECRET`](/docs/config/oauth#oauthdiscordclientsecret) environment variables to the values you copied earlier.

```bash
OAUTH_DISCORD_CLIENT_ID=1234567890
OAUTH_DISCORD_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

Make sure you have the [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#featuresoauthregistration) environment variable set to `true`, or none of the endpoints will work.

If you have set up everything correctly, you can now navigate to the login page and click the "Login with Discord" button.