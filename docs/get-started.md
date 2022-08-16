---
sidebar_position: 1
---

# Getting Started

## Install & run with Docker
This section requires [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/).

```shell
git clone https://github.com/diced/zipline
cd zipline

docker-compose up -d
```

:::danger
After installing, please edit the `docker-compose.yml` file and find the line that says `SECRET=changethis` and replace `changethis` with a random string.


Ways you could generate the string could be from a password managers generator, or you could just slam your keyboard and hope for the best.
:::

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

:::danger
After installing, please edit the `.env.local` file and find the line that says `SECRET=changethis` and replace `changethis` with a random string.


Ways you could generate the string could be from a password managers generator, or you could just slam your keyboard and hope for the best.
:::

## Default administrator password
After setting up Zipline for the first time, you may login to the dashboard with the username `administrator` and the password `password`.

:::danger
Remember to change this password in the manage user page.
:::