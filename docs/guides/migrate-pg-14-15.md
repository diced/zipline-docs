# Docker: Migrate from PostgreSQL 14 to 15

This guide describes how to migrate from PostgreSQL 14 to 15, since migrating through docker is a bit of a chore. This guide also assumes that you are using docker and the provided docker-compose file's defaults for postgres. If you don't use `docker-compose` figure it out yourself

## Is this needed?

This is optional, though it is highly recomended to run the latest version. If you do not want to go through the hassle of upgrading from 14 to 15, be assured that PostgreSQL 14 is still supported until November 12th, 2026. For more information see the [PostgreSQL release policy](https://www.postgresql.org/support/versioning/)

<Alert type="info">
If you choose to continue using 14, you should update it every so often to make sure you are up to date with security patches
</Alert>

## Backup

<Alert type="info">
Make sure the container is running before you do this!
</Alert>

Make sure to make a backup, using the `pg_dumpall` command!

```bash
docker-compose exec postgres pg_dumpall -U postgres > backup
```

## Delete Existing Volumes

<Alert type="danger">
This will delete all data in the database, so make sure you have a backup from the previous step!
</Alert>

<Alert type="danger">
Make sure to stop the container before you do this, or you will receieve an error.

```bash
docker-compose down
```

</Alert>

### Find the Volume's Name

The volume's name will be like this: `(the directory zipline is in)_pg_data`, for example if the directory Zipline is in is called `zipline`, the volume name will be `zipline_pg_data`. Run the following command, to verify that the volume name is correct:

```bash
docker volume ls
```

### Delete the Volume

```bash
docker volume rm (volume name)
```

## Change the Version to 15

In the `docker-compose.yml` file, find the `postgres` section, and under the `image` property, you might see either `postgres` or `postgres:14`. Replace this with `postgres:15`.

```yaml
version: '3'
services:
  postgres:
    image: postgres:15
    restart: always
```

### Pull the New Image

Once you have changed the version, you need to pull the new image. This step is optional as docker-compose will pull the image automatically when you start the container, but it is recommended to do this step to make sure you have the latest version if you have pulled the image before.

```bash
docker-compose pull
```

## Start the Postgres container

<Alert type="danger">
Make sure you start the postgres container, and leave the zipline container stopped. If the Zipline container starts, it will try to run migrations, and the backup step will fail.

You will have to restart this entire process if you start the Zipline container before the Postgres container.
</Alert>

```bash
docker-compose up -d postgres
```

## Restore Backup

Before doing anything, make sure to restore the backup! This will restore all the data from the previous version, from your [stored backup dump file](#backup).

```bash
docker-compose exec -T postgres psql -U postgres < backup
```

## Start Zipline

Now you can start the Zipline container, and it will run the migrations for you.

```bash
docker-compose up -d zipline
```
