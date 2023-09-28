# Authentik / OIDC
This will walk you through the process of setting up OAuth with Authentik, but it should be applicable to any IdP that supports OIDC.

## Create an Authentik Application

### Create OAuth2/OpenID Provider
1. Go to the Authentik Admin Interface
2. Click `Create` under Applications > Providers.
3. Select `OAuth2/OpenID Provider` as type. Click Next.
4. Fill out the form:
   1. Pick a recognizable name
   2. Select your Authentication and Authorization Flows. The default implicit flow is what was used for testing.
   3. Client type is Confidential
   4. In Redirect URIs/Origins you need to enter a RegEx that fits the URL where Zipline is running, e.g. `https:\/\/zipline.example.com\/.*`
   5. Everything else can be left default.
   6. You can copy Client ID and Client Secret from this page, so you can copy them to their corresponding environment variables.
5. After creating the provider, click on it in the provider list to open the provider details. There you can find the Authorize, Token and Userinfo URLs , you will need to copy those to the corresponding environment variables.

### Create Application
1. Click `Create` under Applications > Applications
2. Enter all required fields as you wish
3. Select the provider you created earlier
4. Under UI Settings you can optionally provide the URL of your Zipline instance and additional infos for your users.

## Configure Zipline
Set the [`OAUTH_OIDC_*`](/docs/config/oauth#oauth_oidc_client_id) environment variables to the values you copied earlier.

```bash
OAUTH_OIDC_CLIENT_ID=qwertyuiopasdfghjklzxcvbnm
OAUTH_OIDC_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
OAUTH_OIDC_AUTHORIZE_URL=https://authentik.example.com/application/o/authorize/
OAUTH_OIDC_TOKEN_URL=https://authentik.example.com/application/o/token/
OAUTH_OIDC_USERINFO_URL=https://authentik.example.com/application/o/userinfo/
OAUTH_OIDC_SCOPES=openid profile email
OAUTH_OIDC_NAME_FIELD=email
OAUTH_OIDC_USER_ID_FIELD=email
OAUTH_OIDC_PROVIDER_DISPLAY_NAME=Authentik
```

Make sure you have the [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#featuresoauthregistration) environment variable set to `true`, or none of the endpoints will work.

If you have set up everything correctly, you can now navigate to the login page and click the "Login with Authentik" button.