---
id: getting-started
title: Getting Started
---

Walk through of installing Zipline

# Requirements
* Docker or Docker-compose (one-command-install)
* Git (if docker-compose)

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
```bash
docker-compose up --build -d
```
