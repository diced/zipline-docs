# Logger Filters

The `LOGGER_FILTERS` environment variable is used to filter logs that you want to see. This is useful if you want to see only the logs that are important to you.

If you want to see all logs, do not set this variable.

## Example
If you want to see `api` logs, you can set the variable to `api`:

```bash
LOGGER_FILTERS=api
```

If you want to see `api` and `discord` logs, you can set the variable to `api,discord`:

```bash
LOGGER_FILTERS=api,discord
```