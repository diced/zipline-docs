---
id: getting-started
title: Getting Started
---

Walk through of installing Zipline

# Requirements
* Git (if non-docker)
* Node.js version >= 14 or above (which can be checked by running `node -v`)
* [Optional] Docker for a one-command-install
* [Optional] Docker-compose for a one-command-install

## Without Docker
Installing without Docker

### Download
Clone the repository & enter the directory
```sh
git clone https://github.com/diced/zipline
cd zipline
```

### Install Dependencies
Install Ziplines dependencies

```bash npm2yarn
npm install
```

### Build Zipline
1. Rename `config.example.toml` to `config.toml` and edit any values to your liking.
:::danger
Remember to edit the database values or Zipline will not work.
:::

```bash npm2yarn
npm run build
```

### Start Zipline
Start Zipline

```bash npm2yarn
npm run start
```

## With Docker
```bash
docker pull diced/zipline:trunk
```

```bash
docker run -p 3000:3000 -v $PWD/config.toml:/zipline/config.toml -d diced/zipline:trunk
```

## With Docker-Compose
```bash
git clone https://github.com/diced/zipline
cd zipline
```

Rename `config.example.toml` to `config.toml` and edit any values to your liking.
:::danger
Remember to edit the database values or Zipline will not work.
:::
```bash
docker-compose up --build -d
```