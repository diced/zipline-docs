# Debugging

If you happen to encounter some sort of bug in Zipline, you can enable debug logs to help us figure out the problem.

<Alert type="danger">
`DEBUG` mode can be **VERY** verbose, it is recomened to take a **good** look at the logs before sending them anywhere.
</Alert>

<Alert type="note">
It is not recommended to enable `DEBUG` mode in production, as it could cause performance issues.
</Alert>

## Enabling Debug Logs

You must set the `DEBUG` environment variable to `true`. This can be done in a few different ways:

<Tabs defaultValue="docker">
  <TabItem value="docker" default>

In your `docker-compose.yml`

```yml
environment:
  - DEBUG=true
```

  </TabItem>
  <TabItem value="non-docker">

Add `DEBUG=true` to the `.env` or `.env.local` file. Or `export DEBUG=true` then run `yarn/npm start`

  </TabItem>
</Tabs>
