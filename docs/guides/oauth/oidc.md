# OIDC

This will walk you through the process of setting up Authentik OIDC for your Zipline instance.

## Authentik

### Configure Authentik

Instructions on how to install Authentik can be found [here](https://goauthentik.io/docs/installation/).

1. Navigate to the Authentik admin interface
2. Under applications/providers, create a new provider
3. Select the OAuth/OpenID type, and hit next.
   ![OAuthType](/guides/authentik-1.png)
4. Set the authentication flow as `default-authentication-flow`
5. Set the authorization flow as `default-explicit-authorization-flow`
6. Set the client type as confidential, and note the client ID + Secret, these will be used in the environment variables
   ![Provider Config](/guides/authentik-2.png)
7. Navigate to applications/applications
8. Create new application using the provider you just setup.
   ![Application Config](/guides/authentik-3.png)

### Configure Zipline

You need to set the respective variables (`OAUTH_OIDC_CLIENT_ID`, `OAUTH_OIDC_CLIENT_SECRET`) those to the client ID + secret you got from the provider, and replace `authentik.example.com` with the accessible URL of your Authentik install.

```bash
OAUTH_OIDC_CLIENT_ID=your_client_id
OAUTH_OIDC_CLIENT_SECRET=sijfsoudhfdhi4s4sd
OAUTH_OIDC_AUTHORIZE_URL=https://authetik.example.com/application/o/authorize/
OAUTH_OIDC_USERINFO_URL=https://authentik.example.com/application/o/userinfo/
OAUTH_OIDC_TOKEN_URL=https://authentik.example.com/application/o/token/
```

Make sure you have the [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#featuresoauthregistration) environment variable set to `true`, or none of the endpoints will work.

If you have set up everything correctly, you can now navigate to the login page and click the "Login with OIDC" button.
