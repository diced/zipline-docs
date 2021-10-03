---
sidebar_position: 2
---

# Example

Example Config, can be found [here](https://github.com/diced/zipline/tree/trunk/config.example.toml)

:::tip
  You can use environment variables instead of a file, like the `docker-compose.yml` file does
:::

```toml
[core]
secure = true
secret = 'some secret'
host = '0.0.0.0'
port = 3000
database_url = 'postgres://postgres:postgres@postgres/postgres'

[uploader]
route = '/u'
embed_route = '/a'
length = 6
directory = './uploads'
```
