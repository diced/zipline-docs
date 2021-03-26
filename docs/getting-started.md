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
git clone https://github.com/diced/zipline
cd zipline
```

Once you are inside of the `zipline` directory, you will need to setup a configuration file

:::danger Remember to generate a config!
Zipline will not work without a configuration. [You can auto generate one here](/docs/auto)
:::

## Building

Note this might take some time!

```bash
npm i && npm run build
```

## Starting UNIX Based

Start zipline by running the command, after building.

```bash
npm start
```

## Starting on Windows

Start zipline by running the command, after building.

```bash
npm run start:windows
```

### Starting in Verbose mode

Run Zipline in verbose mode by running `npm run start:verbose`
or on windows `npm run start:windows:verbose`

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
