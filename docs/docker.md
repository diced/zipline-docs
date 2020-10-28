---
title: Docker
description: Running in docker.
slug: /docker
---

Zipline now comes with a docker file that you can build & run.

## Build
Once you are inside of the `zipline` directory build the `Dockerfile`
```bash
docker build -t zipline .
```

## Run while persisted
If you want to persist zipline uploads, you must specify a volume.
```bash
docker run -d \
 -p 8000:8000 \
 -v ~/zipline/uploads:/opt/zipline/uploads \
 --name=zipline \
 zipline
```

## Run without persistence
If you **don't** want to persist your uploads, then there is no need t supply a volume here.
```bash
docker run -d \
 -p 8000:8000 \
 --name=zipline \
 zipline
```