---
sidebar_position: 4
---

# Discord Webhooks
Zipline now supports notifications via Discord webhooks.

## Create a Webhook
First navigate to the channel you would like to have the webhook in, and click the gear icon "Edit Channel"

![](/img/discord-1.png)

Then click Integrations and click View Webhooks.

![](/img/discord-2.png)

Click "New Webhook", and feel free to change the name and picture.

![](/img/discord-3.png)

After this click "Copy Webhook URL" and keep it until the next step.

![](/img/discord-4.png)

## Configure Zipline to use the Webhook

If you do not use Docker, head over [here](#envlocal).

### Docker
If you are using Docker Compose, then inside of the `docker-compose.yml` file, you will need to add a few environment variables.

Make sure when adding the variables, that the spacing is correct as the yml format requires it to be that way.

![](/img/discord-5.png)

### .env.local
If you are not using Docker, and simply using the traditional .env.local file, you can simply add this line to the file.

```yml
DISCORD_URL=paste the webhook url from earlier here
```

## Customize the output
By default if the environment variables, `DISCORD_UPLOAD_*` or `DISCORD_SHORTEN_*` (* = any key that zipline supports to send content/embeds) are not present nothing will be sent. If you would like to configure them visit the configuration documentation [here](/docs/config/discord)

## Variables
Variables are the same as the ones found [here](/docs/guides/variables). Feel free to use the playground to test out the variables!