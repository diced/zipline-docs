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

This section requires [nodejs](https://nodejs.org) (v16 or later), [yarn](https://yarnpkg.com/) or [npm](https://npmjs.com).

```bash
git clone https://github.com/diced/zipline
cd zipline
```

```bash npm2yarn
npm install
```

```bash npm2yarn
npm run build
```

```bash npm2yarn
npm run start
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

```bash npm2yarn
npm install
```

```bash npm2yarn
npm run build
```

then run

```bash npm2yarn
npm run start
```

to start.

## Installation using Easypanel

Easypanel is a modern server control panel. If you [run Easypanel](https://easypanel.io/docs) on your server, you can deploy Zipline with 1 click on it.

[![Deploy to Easypanel](https://easypanel.io/img/deploy-on-easypanel-40.svg)](https://easypanel.io/docs/templates/zipline)

### Instructions

1. Create a VM that runs Ubuntu on your cloud provider.
2. Install Easypanel using the instructions from the website.
3. Create a new project.
4. Install Zipline using the dedicated template.