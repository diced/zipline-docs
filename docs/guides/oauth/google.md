# Google
This will walk you through the process of setting up Google OAuth for your Zipline instance.

## Create a Google OAuth2 Application

### Configure OAuth consent screen
1. Click ["OAuth consent screen"](https://console.cloud.google.com/apis/credentials/consent) on the sidebar
2. It will ask you if you would like Internal or External, read the descriptions and choose the one that best fits your use case.
3. Fill in the required fields like App name, User support email, Developer contact information, etc.
4. Under Authorized domains, add your Zipline domain without the protocol (e.g. `example.com` instead of `https://example.com`).

![Google OAuth Consent Screen](/guides/oauth-google-4.png)

5. Click the "Save and Continue" button.
6. Click the "Add or Remove Scopes" button on the next page.

![Google OAuth Scopes](/guides/oauth-google-5.png)

7. Under "Manually add scopes" add the following scopes:
   - `https://www.googleapis.com/auth/userinfo.profile`
  Then click the "Add to table button" button.
8. Click "Update" button.

![Google OAuth Scopes](/guides/oauth-google-6.png)

9. Click the "Save and Continue" button.
10. Feel free to add test users to your liking, then hit the "Save and Continue" button again.
11. Finish the setup and head to the next section [Create Credentials](#create-oauth2-credentials).

### Create OAuth2 Credentials
1. Head over to [Google Cloud > Create OAuth client ID](https://console.cloud.google.com/apis/credentials/oauthclient)
2. Select "Web Application" under Application Type
3. Under "Authorized redirect URIs", add `https://<your-domain>/api/auth/oauth/google`
4. Under "Authorized JavaScript origins", add `https://<your-domain>`

![Google OAuth Redirect](/guides/oauth-google-1.png)

5. Click "Create"
6. On the next screen you will see your "Client ID" and "Client Secret". Save these for later, as you will not be able to see the secret again.

![Google OAuth Client ID/Secret](/guides/oauth-google-2.png)

7. Click ["Library"](https://console.cloud.google.com/apis/library) on the sidebar
8. Search for "People API" or click [here](https://console.cloud.google.com/apis/library/people.googleapis.com)
9. Click "Enable", and wait for it to finish loading.

![Google People API](/guides/oauth-google-3.png)



## Configure Zipline
Set the [`OAUTH_GOOGLE_CLIENT_ID`](/docs/config/oauth#oauthgoogleclientid) and [`OAUTH_GOOGLE_CLIENT_SECRET`](/docs/config/oauth#oauthgoogleclientsecret) environment variables to the values you copied earlier.

```bash
OAUTH_GOOGLE_CLIENT_ID=1234567890
OAUTH_GOOGLE_CLIENT_SECRET=qwertyuiopasdfghjklzxcvbnm
```

Make sure you have the [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#featuresoauthregistration) environment variable set to `true`, or none of the endpoints will work.

If you have set up everything correctly, you can now navigate to the login page and click the "Login with Google" button.
