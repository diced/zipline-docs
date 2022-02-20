---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Get Started

## Requirements

### If Docker
* Docker: [docs.docker.com/engine/install](https://docs.docker.com/engine/install/)
* Docker Compose: [docs.docker.com/compose/install](https://docs.docker.com/compose/install/)
### Without Docker
* Node: [nodejs.org](https://nodejs.org)

## With Docker

```bash
docker pull diced/zipline:trunk
```
```bash
docker run -p 3000:3000 -v $PWD/config.toml:/zipline/config.toml -d diced/zipline:trunk
```

## With Docker Compose

```bash
git clone https://github.com/diced/zipline
cd zipline
```
Rename `config.example.toml` to `config.toml` and edit any values to your liking.
```bash
docker-compose up -d
```

## Without Docker (using plain node)
1. Clone the repo
```bash
git clone https://github.com/diced/zipline
```
2. Change the `config.example.toml`, and then rename it to `config.toml`
3. Install Dependencies
```bash npm2yarn
npm install
```
4. Build Zipline
```bash npm2yarn
npm run build
```
5. Run Zipline with
```bash npm2yarn
npm run start
```
