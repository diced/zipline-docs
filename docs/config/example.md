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

[database]
type = "postgres"
host = "209.126.3.203"
username = "dicedtomato"
password = "69696969"
database = "zipline"

[meta]
title = "Zipline"
description = "My Zipline Server"
thumbnail = "https://github.githubassets.com/images/modules/open_graph/github-mark.png"
color = "#128377"

[core]
secret = "my-secret"
port = 3001
blacklisted_ips = [
  "127.0.0.1"
]

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

# remove this part if you do not want webhooks!
[webhooks]
enabled = true
url = "https://canary.discord.com/api/webhooks/id/token"
username = "Zipline Logs"
events = ["upload", "delete_image", "shorten", "delete_url", "login", "token_reset", "user_delete", "user_edit", "create_user"]
 
  [webhooks.upload]
  content = "{image_url} {image_id}"

  [webhooks.delete_image]
  content = "{image_url} {image_id}"

  [webhooks.shorten]
  content = "{url_id} {url} {url_vanity}"

  [webhooks.delete_url]
  content = "{url_id} {url} {url_vanity}"

  [webhooks.login]
  content = "{user_id} {user_name} {user_admin}"

  [webhooks.token_reset]
  content = "{user_id} {user_name} {user_admin}"

  [webhooks.user_delete]
  content = "{user_id} {user_name} {user_admin}"

  [webhooks.user_edit]
  content = "{user_id} {user_name} {user_admin}"

  [webhooks.create_user]
  content = "{user_id} {user_name} {user_admin}"
```