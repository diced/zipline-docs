# GitHub
This will walk you through the process of setting up GitHub OAuth for your Zipline instance.

## Create a GitHub OAuth Application
1. Go to the [GitHub Developer Settings](https://github.com/settings/developers).
2. Click the "New OAuth App" button.
3. Give your application a name.
4. Make sure the "Authorization callback URL" is `https://<your-zipline-domain>/api/auth/oauth/github`.
  ![GitHub OAuth Redirect](/guides/oauth-gh-1.png)
5. Click the "Register application" button.
6. Generate a client secret and save it for later.
  ![GitHub Generate Secret](/guides/oauth-gh-2.png)
7. Copy the "Client ID" and save it for later.

## Configure Zipline
Set the [`OAUTH_GITHUB_CLIENT_ID`](/docs/config/oauth#oauthgithubclientid) and [`OAUTH_GITHUB_CLIENT_SECRET`](/docs/config/oauth#oauthgithubclientsecret) environment variables to the values you copied earlier.

```bash
OAUTH_GITHUB_CLIENT_ID=1234567890
OAUTH_GITHUB_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

Make sure you have the [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#featuresoauthregistration) environment variable set to `true`, or none of the endpoints will work.

If you have set up everything correctly, you can now navigate to the login page and click the "Login with GitHub" button.