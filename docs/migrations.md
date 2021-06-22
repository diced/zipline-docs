---
id: migrations
title: Migrate from v2 to v3
---

Migrating from v2 to v3 is easy as we provide a script that automatically take files from a dir and turn them into database entries from your [`config.toml`](/docs/config/overview)

The script can be found at `scripts/migrate-v2-v3.js`, and can be run by:
```bash
node scripts/migrate-v2-v3.js /path/to/v2/uploads/dir
```

Once the migration is finished (even if there are thousands of images in the directory, it should only take a few seconds) it will ask you to move your old uploads dir to the one you have in the `config.toml` - **make sure to do this or none of your uploads will be available on v3**
