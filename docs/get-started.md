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
