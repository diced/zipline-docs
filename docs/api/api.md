# API Reference

This page attempts to document the entire Zipline API, currently it is a work in progress.

## Errors

All errors are returned in the following format:

| Field Name | Type     | Description                         |
| ---------- | -------- | ----------------------------------- |
| `error`    | `string` | The error message                   |
| `code`     | `string` | The error code, an HTTP status code |

There may be additional fields, these are not documented here, but are documented in the specific endpoint.

```json
{
  "error": "error message",
  "code": 400
}
```

## Authentication

Most endpoints require authentication, this is done by providing an `Authorization` header with the value being your users auth token OR having a cookie named `user` being set, with the value being a signed string. For more information about how it's signed see the source.
