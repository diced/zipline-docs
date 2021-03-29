---
title: FAQs
description: Frequently Asked Questions
slug: /config/faq
---

## DriverPackageNotInstalledError
If you're getting this please read the [drivers documentation here](/docs/config/getting-started#installing-database-drivers) and run the server once more.

## My images are 404 even though they exist in my database
This is probably happening due to the image not being found in your uploads directory (that is set in your `Zipline.toml`)

## `SyntaxError: Unexpected token '.' on Webhooks.js:41`
Zipline uses optional chaining for some of its webhook implementation. This can be fixed by upgrading your node version to a version later than `14` (current lts version)

## How can I factory reset?
If you would like to delete everything in the db, you will just need to drop all tables. For example on `postgres` you can do

```sql
DROP TABLE zipline_images;
DROP TABLE zipline_user;
DROP TABLE zipline_data;
```

Removing images completely, is also simple. Just remove the uploads directory, for example `rm -rf ./uploads`.