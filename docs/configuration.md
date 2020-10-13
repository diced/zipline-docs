---
title: Getting Started
description: Creating a base configuration
slug: /config/getting-started
---

Zipline's configuration is determined by TOML. You can see an example configuration [here](/docs/config/example)

Your configuration should include **4** sections.
- database
- core
- uploader
- urls

## Database
The database settings are determined by [TypeORM's Configuration Options](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md)

### Supported Databases by Zipline
Some database support is experimental, try at your own risk.
- Recomended Database: [postgres / cockroachdb](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#postgres--cockroachdb-connection-options)
- [mysql / mariadb](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#mysql--mariadb-connection-options)
- [sqlite](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#sqlite-connection-options)
- [sqlite3](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#better-sqlite3-connection-options)
- [mssql](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#mssql-connection-options)
- Upcoming support: [mongodb](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#mongodb-connection-options)

## Core
These are the core configuration options, like your `secret` and `port`. See more [here](/docs/config/core)

## Uploader
These are your uploader options, the main feature of Zipline is uploading images, and this is how you can configure it to your liking. [here](/docs/config/uploader)

## URLs
These are your URL Shortener options, you can entirely disable it if you wanted to! [here](/docs/config/urls)