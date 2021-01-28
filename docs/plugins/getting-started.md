---
title: Getting Started
description: Learn how to change Zipline's behaviour with the use of Zipline Plugins
slug: /plugins
---


Zipline plugins are a great way of changing zipline, and also serves as a good way to modularize Zipline as plugins can be disabled and enabled to your liking.

# Example Plugin
An example plugin that adds a route to the server
```ts title="src/plugins/HelloPlugin.ts"
import { FastifyInstance } from 'fastify';
import { Config } from '../lib/Config';
import { Plugin } from '../lib/plugin';
import { Console } from '../lib/logger';
import { Connection } from 'typeorm';
import Server from 'next/dist/next-server/server/next-server';

export default class implements Plugin {
  public name: string = "hello_route";

  public onLoad(server: FastifyInstance, orm: Connection, app: Server, config: Config) {
    server.get('/hello', async (req, reply) => {
      reply.send("hello world!")
    });
  }
}
```

1. Once you have finished creating your plugin, you must **[re-build](/docs/#building)** Zipline.
2. Run zipline normally, and in the logs you should see something saying that your plugin has been loaded. If an error occured while loading the plugin, then the plugin will not be loaded and it will show the error in the logs.

:::caution  Third Party Plugins
When using a plugin that isnt on our cuarted list, be careful as plugins dont have much saftey as they are just ran from Zipline. This means that a plugin could delete everything in your database or folder. Make sure to double check the code before implementing, if you are unsure if a plugin is safe please join our Discord server and ask! We are not responsible for any damage caused by un safe plugins.
:::