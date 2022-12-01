# Multi-Factor Authentication

This page documents multi-factor authentication options, such as Two-Factor Authentication (2FA) via services like Google Authenticator and Authy.

## `MFA_TOTP_ENABLED`

Whether or not TOTP is enabled. If set to `false`, TOTP will not be available.

```bash
MFA_TOTP_ENABLED=true
```

## `MFA_TOTP_ISSUER`

The custom issuer for the TOTP QR code. This is the name of the service that will be displayed on the TOTP app. If not set, the default value is `Zipline`.

```bash
MFA_TOTP_ISSUER=Zipline
```
