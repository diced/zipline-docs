---
title: Auto Setup
description: Creates a configuration for you.
slug: /auto
---

## Requirements

- [Node.js](https://nodejs.org/en/download/) version >= 14.15.0 or above (which can be checked by running `node -v`). 

Navigate to your existing Zipline directory, that you would have setup in [Getting Started](/docs/).

Before running autosetup, make sure to run `npm i` to install dependencies required by autosetup.
Run autosetup with the following command:
```bash
node setup.js
```

The autosetup will attempt to ask:
- for your database type
- database host
- database password
- database username
- database database
- database port (will use default if empty)
- secret
- whether or not you would like vanity urls
- asks if you would like to generate a docker-compose with all your options.
