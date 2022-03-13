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

## With Docker Compose (recomended)
This is the most easy way to setup zipline as it takes virtually zero work from you to setup.
```bash
git clone https://github.com/diced/zipline
cd zipline
```
The configuration is editable via [environment variables](/docs/config/overview) inside the [`docker-compose.yml`](https://github.com/diced/zipline/blob/trunk/docker-compose.yml) file.
```bash
docker-compose up -d
```

### Updating with Docker Compose (recomended)
```bash
# make sure you're in zipline dir
docker-compose pull
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
