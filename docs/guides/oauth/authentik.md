# Authentik
This will walk you through the process of setting up Authentik OAuth for your Zipline instance.

## Setup Authentik
Instructions can be found to do this [here](https://goauthentik.io/docs/installation/)

## Configure Provider
1. Navigate to the admin interface
2. Under applications/providers, create a new provider
3. Select the OAuth/OpenID type, and hit next.
  ![OAuthType](/guides/authentik-1.png)
5. Set the authention flow as default-authentication-flow
6. Set the authorization flow as default-explicit-authorization-flow
7. Set the client type as confidential, and note the client ID + Secret, these will be used in the enviroment variables
  ![Provider Config](/guide/authentik-2.png)
## Configure Application
1. Navigate to applications/appliactions
2. Create new application using the provider you just setup.
  ![Application Config](/guide/authentik-3.png)

## Configure Zipline
Using the client ID + Secret from the provider, set those to the respective variables(OAUTH_AUTEHNTIK_CLIENT_ID, OAUTH_AUTHENTIK_CLIENT_SECRET), and replace `authentik.example` with the accessible URL of your authentik install.
```bash
OAUTH_AUTEHNTIK_CLIENT_ID=your_client_id
OAUTH_AUTHENTIK_CLIENT_SECRET=sijfsoudhfdhi4s4sd
OAUTH_AUTHENTIK_AUTHORIZE_URL=https://authetik.example/application/o/authorize/
OAUTH_AUTHENTIK_USERINFO_URL=https://authentik.example/application/o/userinfo/
OAUTH_AUTHENTIK_TOKEN_URL=https://authentik.example/application/o/token/
```

Make sure you have the [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#featuresoauthregistration) environment variable set to `true`, or none of the endpoints will work.

If you have set up everything correctly, you can now navigate to the login page and click the "Login with Authentik" button.
