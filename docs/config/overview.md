---
id: overview
title: Configuration Overview
---

Ziplines Configuration file consists of 3 parts:
* [Core](/docs/config/core)
* [Database](/docs/config/database)
* [Uploader](/docs/config/database)

You can view the example config [here](/docs/config/example)

## Error validation
If there is an error or a property's type does not match the schema we have then zipline will error out in a message like:
```
2021-06-21 09:09:35,375 PM ERROR [config] expected boolean on core.secure, but got string
2021-06-21 09:09:35,375 PM ERROR [config] expected number on core.port, but got string
2021-06-21 09:10:08,627 PM ERROR [config] there was no database.type in config
2021-06-21 09:09:35,375 PM ERROR [config] exiting due to 3 errors
```