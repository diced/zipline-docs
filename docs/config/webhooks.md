---
title: Discord Webhooks
description: Webhooks Config
slug: /config/webhooks
---

## Enabled
Whether discord webhooks are enabled

**Option**: `webhooks.enabled`<br/>
**Type**: `boolean`<br/>
**Example**:
```js
true
```

## URL
When creating a webhook on Discord, it will give you a URL, this is what you will put here.

**Option**: `webhooks.url`<br/>
**Type**: `string`<br/>
**Example**:
```js
"https://discord.com/api/webhooks/420/sometoken"
```

## Username
Supply a custom username 

**Option**: `webhooks.username`<br/>
**Type**: `string`<br/>
**Example**:
```js
"Zipline Logs"
```

## Events
A list of events you would like the webhook to post on. See [Webhook Events](/docs/config/webhooks#webhook-events)


**Option**: `webhooks.events`<br/>
**Type**: `webhookevents[]`<br/>
**Example**:
```js
["upload", "delete_image", "shorten", "delete_url", "login", "token_reset", "user_delete", "user_edit", "create_user"]
```

---
## Webhook Events
- Upload (`upload`)
- Delete Image (`delete_image`)
- Shorten (`shorten`)
- Delete URL (`delete_url`)
- Login (`login`)
- Token Reset (`token_reset`)
- User Delete (`user_delete`)
- User Edit (`user_edit`)
- Create User (`create_user`)

### Upload
Triggers whenever an image is uploaded to Zipline.
### Shorten
Triggers whenever a url is shortened.
### Login
Triggers whenever someone logs into Zipline.
### Token Reset
Triggers whenever a user resets their token.
### User Delete
Triggers whenever an administrator deletes a user account.
### User Edit
Triggers whenever a user edit's their account.