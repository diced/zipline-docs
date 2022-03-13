---
sidebar_position: 1
---
# Overview
Ziplines Configuration file consists of 3 parts:
* [Core](/docs/config/sections/core)
* [Uploader](/docs/config/sections/core)
* [URLs](/docs/config/sections/urls)
* [Ratelimit](/docs/config/sections/ratelimit)
* [Datasources](/docs/config/sections/datasource)

You can view the example config [here](/docs/config/example)

## Error validation
If there is an error or a property's type does not match the schema we have then zipline will error out in a message like:

```log
2021-09-23 05:21:28,585 PM ERROR [server] 4 errors occured
        core.secret is a required field
        core.database_url is a required field
```