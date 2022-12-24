# Discord
This page documents the discord webhook configuration of Zipline.

## `DISCORD_URL`
The webhook URL, if having trouble getting one, visit [this guide](/docs/guides/discord-webhooks).
```bash
DISCORD_URL=https://discord.com/api/webhooks/x/x
```

## `DISCORD_USERNAME`
An optional field that defaults to "Zipline", but can be customized to your liking. This will be the username of the webhook.
```bash
DISCORD_USERNAME=Zipline
```

## `DISCORD_AVATAR_URL`
An optional field that defaults to the Zipline logo, but can be customized to your liking. This will be the avatar of the webhook.
```bash
DISCORD_AVATAR_URL=https://example.com/something.png
```
### Body
The variable can be either `DISCORD_UPLOAD_something` or `DISCORD_SHORTEN_something`. UPLOAD will be used when a file is uploaded and SHORTEN will be used when a url is shortened.

### `DISCORD_<UPLOAD/SHORTEN>_CONTENT`
The message content of the webhook, not required if using embed.
```bash
DISCORD_UPLOAD_CONTENT="something"
DISCORD_SHORTEN_CONTENT="something"
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_TITLE`
The title of the embed, not required.
```bash
DISCORD_UPLOAD_EMBED_TITLE="something"
DISCORD_SHORTEN_EMBED_TITLE="something"
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_DESCRIPTION`
The description of the embed, not required.
```bash
DISCORD_UPLOAD_EMBED_DESCRIPTION="something"
DISCORD_SHORTEN_EMBED_DESCRIPTION="something"
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_FOOTER`
The footer of the embed, not required.
```bash
DISCORD_UPLOAD_EMBED_FOOTER="something"
DISCORD_SHORTEN_EMBED_FOOTER="something"
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_COLOR`
The color of the embed, not required.
```bash
DISCORD_UPLOAD_EMBED_COLOR=0x1bebeb
DISCORD_SHORTEN_EMBED_COLOR=0x1bebeb
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_IMAGE`
Whether to display an image (if the file is an image) in the embed's image field, not required.
```bash
DISCORD_UPLOAD_EMBED_IMAGE=true
DISCORD_SHORTEN_EMBED_IMAGE=true
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_THUMBNAIL`
Whether to display a thumbnail (if the file is an image) in the embed's thumbnail field, not required.
```bash
DISCORD_UPLOAD_EMBED_THUMBNAIL=true
DISCORD_SHORTEN_EMBED_THUMBNAIL=true
```

## `DISCORD_<UPLOAD/SHORTEN>_EMBED_TIMESTAMP`
Whether to display a timestamp in the embed's timestamp field, not required.
```bash
DISCORD_UPLOAD_EMBED_TIMESTAMP=true
DISCORD_SHORTEN_EMBED_TIMESTAMP=true
```