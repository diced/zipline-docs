---
title: Docker
description: Running in docker.
slug: /docker
---

Zipline now comes with a docker file that you can build & run.

## Run with compose
First edit the `docker-compose.yml` to your liking. This will not be needed soon as we are making a script that auto-generates it from your input. Then run the following, and zipline should be up and running on the specified port.

```bash
docker-compose up -d --build
```