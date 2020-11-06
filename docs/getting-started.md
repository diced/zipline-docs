---
title: Getting Started
description: Installing & Running Zipline
slug: /
---

## Requirements

- [Node.js](https://nodejs.org/en/download/) version >= 14 or above (which can be checked by running `node -v`).

**We recomend using [docker](/docs/docker), yet if you want a simple install continue along.**

## Installing
You can clone Zipline by doing

```bash
git clone https://github.com/ZiplineProject/zipline
cd zipline
```

Once you are inside of the `zipline` directory, you will need to setup a configuration file (we recomend using [auto setup](/docs/auto))

## Building
Note this might take some time!
```bash
npm i && npm run build
```

## Starting
Start zipline by running the command, after building.
```bash
npm start
```

### Starting in Verbose mode

Run Zipline in verbose mode by running `npm run start:verbose`

### Starting in Dev mode

Run Zipline in dev mode by running `npm run dev`. This should not be used for normal uses.
:::danger Remember
Use dev mode only for development.
:::

### Starting in Dev Verbose mode

Run Zipline in dev verbose mode by running `npm run dev:verbose`
:::danger Remember
Use dev mode only for development.
:::
