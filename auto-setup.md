---
title: Auto Setup
description: Creates a configuration for you.
slug: /auto
---

## Requirements

- [Node.js](https://nodejs.org/en/download/) version >= 12.19.0 or above (which can be checked by running `node -v`). 


Navigate to your existing Zipline directory, that you would have setup in [Getting Started](/docs/).

The AutoSetup will attempt to ask:
- for your database type
- database host
- database password
- database username
- database database
- database port (will use default if empty)
- secret
- whether or not you would like vanity urls

You can finally, run the executable here:
```bash
node setup.js
```