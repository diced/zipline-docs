---
title: Core
description: Core Config
slug: /config/core
---

## Port
Where Zipline should serve to.

**Option**: `core.port`<br/>
**Type**: `number`<br/>
**Example**:
```js
3000
```

## Secret
This is the secret (that can't be shared to anyone!) that is used for cookies and encrypting user tokens.

**Option**: `core.secret`<br/>
**Type**: `string`<br/>
**Example**:
```js
"secret"
```

## Blacklisted IPs
Want someone out of your server? Add their IP to this array and they will not be able to use Zipline at all.

**Option**: `core.blacklisted_ips`<br/>
**Type**: `string[]`<br/>
**Example**:
```js
["127.0.0.1", "localhost"]
```

## MultiFactor Authentication (TOTP)
Enable MFA with Authy/Google Authenticator to add an extra layer of protection when accessing Zipline.

**Option**: `core.mfa`<br/>
**Type**: `boolean`<br/>
**Example**:
```js
false
```