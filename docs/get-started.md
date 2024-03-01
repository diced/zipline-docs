---
sidebar_position: 1
---

# Getting Started

## Install & run with Docker

This section requires [Docker](https://docs.docker.com/get-docker/) and [docker compose](https://docs.docker.com/compose/install/).

```shell
git clone https://github.com/diced/zipline
cd zipline

docker compose up -d
```

<Alert type="danger">
After installing, please edit the `docker-compose.yml` file and find the line that says `CORE_SECRET=changethis` and replace `changethis` with a random string.

Ways you could generate the string could be from a password managers generator, or you could just slam your keyboard and hope for the best.
</Alert>

## Building & running from source

This section requires [nodejs](https://nodejs.org) (v18 (or current LTS) or later), [yarn](https://yarnpkg.com/).

<Alert type="info">
NPM is not supported as it produces unintended side effects during the build process.
</Alert>

```bash
git clone https://github.com/diced/zipline
cd zipline
```

```bash
yarn install
```

<Alert type="warning">
Building from source requires having a valid configuration through environment variables. This does not have to be an exhaustive list of variables, but it does require the following variables to be set: `CORE_SECRET` and `CORE_DATABASE_URL`.
</Alert>

```bash
yarn build
```

```bash
yarn start
```

After this rename the `.env.local.example` file to `.env.local` and feel free to configure as needed.

<Alert type="danger">
After installing, please edit the `.env.local` file and find the line that says `SECRET=changethis` and replace `changethis` with a random string.

Ways you could generate the string could be from a password managers generator, or you could just slam your keyboard and hope for the best.
</Alert>

## Install on Unraid

This section is specific to [Unraid OS](https://unraid.net) and uses the default [Community Apps](https://forums.unraid.net/topic/38582-plug-in-community-applications/) plugin.

<Alert type="warning">
An existing PostgreSQL *(15 or higher)* database is required! If you do not already have one you can install [`postgresql15`](https://unraid.net/community/apps?q=postgresql15) from the app center.
</Alert>

Zipline is available on the [Community Application Center](https://unraid.net/community/apps?q=zipline) and can be installed from there:

1. Search for `"zipline"` in community applications and install the app from [ImSkully's Repository](https://github.com/ImSkully/unraid-templates/blob/master/zipline/zipline.xml)
2. Update the required variables:
   - [`CORE_SECRET`](/docs/config/core#core_secret): Used to sign sensitive data, replace this with a random string
   - [`CORE_DATABASE_URL`](/docs/config/core#core_database_url): Your Postgres database connection string
3. _(Optional)_ Adjust default configuration as required, see [Configuration](/docs/config) for more variables and their usage

Once created, Zipline should be running at the configured webUI port, by default this is `8092`.

<Alert type="info">
The [Unraid template](https://github.com/ImSkully/unraid-templates/blob/master/zipline/zipline.xml) for Zipline is maintained seperately, for support visit the [Zipline Support topic](https://forums.unraid.net/topic/144184-support-imskully-zipline/) on the Unraid forums. The Zipline Discord server or GitHub issues are not the place to ask for support for the Unraid template, and will be ignored or at best redirected to the Unraid forums.
</Alert>

## Default administrator password

After setting up Zipline for the first time, you may login to the dashboard with the username `administrator` and the password `password`.

<Alert type="danger">
Remember to change this password in the manage user page.
</Alert>

## Updating

### Docker

To update with docker you can simply run:

```bash
docker compose pull
```

then run

```
docker compose up -d
```

to restart.

### Unraid

The Unraid application automatically updates with the latest released image from [`ghcr.io/diced/zipline:latest`](https://github.com/diced/zipline/pkgs/container/zipline).

You will be notified of future updates that are ready to install by the application center, or visit the **Action Center** to manually install the latest update when available.

### From Source

To update from source you can simply run:

```bash
git pull
```

then run

```bash
yarn install
```

```bash
yarn build
```

then run

```bash
yarn start
```

to start.
