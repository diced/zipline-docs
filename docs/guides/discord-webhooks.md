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
If you are using docker-compose, then inside of the `docker-compose.yml` file, you will need to add a few environment variables.

Make sure when adding the variables, that the spacing is correct as the yml format requires it to be that way.

![](/img/discord-5.png)

### .env.local
If you are not using Docker, and simply using the traditional .env.local file, you can simply add this line to the file.

```yml
DISCORD_URL=paste the webhook url from earlier here
```

## Customize the output
By default if the environment variables, `DISCORD_UPLOAD` or `DISCORD_SHORTEN` are not present nothing will be sent. If you would like to configure them visit the configuration documentation [here](/docs/config/discord)

## Variables
You may customize the output of the webhook with variables like "`User uploaded {image.file}!`". The below variables are available for both shorten and upload notifications.

| Notaion | Description |
|---------|-------------|
| `{link}` | outputs the full link that can be accessed |
| `{user.admin}` | outputs yes or no if the user is an administrator |
| `{user.id}` | outputs the id of the user |
| `{user.name}` | outputs the name of the user |

### Upload Only Variables
| Notaion | Description |
|---------|-------------|
| `{file.id}` | outputs the numeric id of the file |
| `{file.file}` | outputs the file name |
| `{file.mime}` | outputs the mimetype of the file |
| `{file.created_at.full_string}` | outputs the full date |
| `{file.created_at.date_string}` | outputs only the date |
| `{file.created_at.time_string}` | outputs only the time |

### Shorten Only Variables
| Notaion | Description |
|---------|-------------|
| `{url.id}` | outputs the url id |
| `{url.vanity}` | outputs the url vanity |
| `{url.destination}` | outputs the destination |
| `{url.created_at.full_string}` | outputs the full date |
| `{url.created_at.date_string}` | outputs only the date |
| `{url.created_at.time_string}` | outputs only the time |