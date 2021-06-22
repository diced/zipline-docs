---
id: example
title: Example
---

Example Config, can be found [here](https://github.com/diced/zipline/tree/trunk/config.example.toml)

```toml
[core]
secure = false
secret = 'test'
host = '0.0.0.0'
port = 3000

[database]
# postgresql
type = 'psql'
url = 'postgres://zipline:zipline@postgres/zipline'

# mysql
# type = 'mysql'
# url = 'mysql://zipline:zipline@mysql/zipline'

# sqlite
# type = 'sqlite'
# url = 'file:zipline.db'

[uploader]
route = '/u'
embed_route = '/a'
length = 6
directory = './uploads'
```