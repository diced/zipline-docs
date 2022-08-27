---
sidebar_position: 6
---

# Releases
When using Docker, you have two release channels you can use.

## Stable (default)
A new stable release comes whenever there is a new major, minor or patch version (`<major>.<minor>.<patch>`).
By default the Zipline docker-compose.yml file will use the latest stable release. You can view the releases [here](https://github.com/diced/zipline/pkgs/container/zipline).

## Upstream
On every commit pushed, the `trunk` tag will be updated, so if you want to live on the edge you can switch to the `trunk` tag which will usually be updated more often.