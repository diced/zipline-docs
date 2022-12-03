import APIBadge from '../../../../src/components/APIBadge';

# /api/auth/oauth/[provider]

:::info
Whenever there are errors, the response will redirect to the /oauth_error page. All responses on this page are based on if [`FEATURES_HEADLESS`](/docs/config/features#features_headless) was set to `true`, therefore all responses will be JSON.
:::

## <APIBadge type="GET" /> [provider] OAuth

### Query

| Field Name | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `code`     | `string?` | The OAuth code from [provider] |

<!-- Redirects to oauth link -->

### <APIBadge type="308" /> Redirect

If there is no `code` present in the query, it will redirect to the providers OAuth link for the user to authenticate with.

### <APIBadge type="400" /> Bad Request (JSON)

- `oauth registration is disabled` - [`FEATURES_OAUTH_REGISTRATION`](/docs/config/features#features_oauth_registration) is set to `false`, therefore you cannot access this resource.
- `[provider] OAuth is not configured` - The provider you are trying to use is not configured correctly. Check the [configuration](/docs/config/oauth) page for more information.
- `invalid request` - Unable to verify oauth request, the OAuth provider did not return a <APIBadge type="200" />.
- `no access_token in response` - The OAuth provider did not return an access token.
- `no refresh_token in response` - The OAuth provider did not return a refresh token (if applicable).
- `invalid user request` - Unable to get user information from the OAuth provider.
