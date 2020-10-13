---
title: Example Config
description: Use this to base your config.
slug: /config/example
---

Zipline's configuration is determined by TOML.

```toml title="zipline/Zipline.toml"
[database]
type = "postgres"
host = "127.0.0.1"
username = "zipline"
password = "password"
database = "zipline"

[core]
secret = "my-secret"
port = 3000

[uploader]
directory = "./uploads"
route = "/u"
length = 6

[urls]
route = "/s"
length = 4
vanity = false
```