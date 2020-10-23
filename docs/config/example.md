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

[meta]
title = "Zipline"
description = "My Zipline Server"
thumbnail = "https://github.githubassets.com/images/modules/open_graph/github-mark.png"
color = "#128377"

[core]
secret = "my-secret"
port = 3000

[uploader]
directory = "./uploads"
route = "/u"
length = 6
original = false
blacklisted = ["jpg"]

[urls]
route = "/s"
length = 4
vanity = false

[webhooks]
enabled = true
url = "https://discord.com/api/webhooks/420/sometoken"
username = "Zipline Logs"
events = ["upload", "shorten", "login", "token_reset", "user_delete", "user_edit"]
 
  [webhooks.upload]
  content = "{user_name} uploaded an image: {image_url}"

  [webhooks.shorten]
  content = "{user_name} shortened a url {url_to} -> {url}"

  [webhooks.login]
  content = "{user_name} logged in"

  [webhooks.token_reset]
  content = "{user_name} reset their token"

  [webhooks.user_delete]
  content = "{user_name} was deleted"

  [webhooks.user_edit]
  content = "{user_name} edited their account"
```