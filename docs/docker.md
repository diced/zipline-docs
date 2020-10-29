---
title: Docker
description: Running in docker.
slug: /docker
---

Zipline now comes with a docker file that you can build & run.

## Run with compose
Before running anything, you should generate a `docker-compose.yml`. This should be asked during the [Auto Setup](/docs/auto). If you select `Yes` to the `Use docker?` question then a `docker-compose.yml` should be created and you can proceed with the following command. 

```bash
docker-compose up -d --build
```