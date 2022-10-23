# Configuration

You can run Zipline with only a few configuration options, while everything else has a default option.

```bash
CORE_SECRET=changethis
CORE_DATABASE_URL=postgres://postgres:postgres@postgres/postgres
```

It will resort to using the [`local`](/docs/config/datasource/local) datasource. You may view the default options in the example [`.env.local.example`](https://github.com/diced/zipline/blob/trunk/.env.local.example) file.