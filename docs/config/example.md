---
id: example
title: Example
---

Example Config, can be found [here](https://github.com/diced/zipline/tree/trunk/config.example.toml)

```toml
[core]
secure = true
secret = 'some secret'
host = '0.0.0.0'
port = 3000

[database]
type = 'psql'
url = 'postgres://postgres:postgres@postgres/postgres'

[uploader]
route = '/u'
embed_route = '/a'
length = 6
directory = './uploads'
```
