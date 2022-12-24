# Read Config

This script will read the configuration file and print the values that it has parsed. This may be useful if the environment variables you specify are not being parsed correctly.

## Usage

<Tabs>
  <TabItem value="docker" label="Docker" default>

```bash
docker-compose exec zipline yarn scripts:read-config
```

  </TabItem>
  <TabItem value="non-docker" label="Non Docker">

```bash npm2yarn
npm run scripts:read-config
```

  </TabItem>
</Tabs>

## Output
The output will be a 2-space tabbed JSON object with the parsed configuration values.

```json
{
  "core": {
    "secret": "xxxxxxxxx",
    "database_url": "postgres://postgres:postgres@postgres/postgres",
    "https": false,
    "host": "0.0.0.0",
    "port": 3000,
    "logger": false,
    "stats_interval": 1800,
    "invites_interval": 1800
  },
  "datasource": {
    "type": "local",
    "local": {
      "directory": "./uploads"
    }
  },
  "uploader": {
    "route": "/u",
    "embed_route": "/a",
    "length": 6,
    "admin_limit": 104857600,
    "user_limit": 104857600,
    "disabled_extensions": [],
    "format_date": "YYYY-MM-DD_HH:mm:ss"
  },
  "urls": {
    "route": "/go",
    "length": 6
  },
  "ratelimit": {
    "user": 0,
    "admin": 0
  },
  "website": {
    "title": "Zipline",
    "show_files_per_user": true,
    "show_version": true,
    "disable_media_preview": false,
    "external_links": [
      {
        "label": "Zipline",
        "link": "https://github.com/diced/zipline"
      },
    ]
  },
  "discord": {
    "url": "https://discord.com/api/webhooks/x/x-x",
    "username": "Zipline",
    "avatar_url": "https://raw.githubusercontent.com/diced/zipline/9b60147e112ec5b70170500b85c75ea621f41d03/public/zipline.png",
    "upload": {
      "content": null,
      "embed": {
        "title": "upload",
        "description": "{link}",
        "footer": null,
        "color": 16769105,
        "thumbnail": false,
        "image": true,
        "timestamp": true
      }
    },
    "shorten": {
      "content": null,
      "embed": {
        "title": "shortened link",
        "description": "{link}",
        "footer": null,
        "color": 5337343,
        "thumbnail": false,
        "image": false,
        "timestamp": true
      }
    }
  },
  "oauth": {
    "github_client_id": "x",
    "github_client_secret": "x",
    "discord_client_id": "x",
    "discord_client_secret": "x",
    "google_client_id": "x-x.apps.googleusercontent.com",
    "google_client_secret": "x-x-x"
  },
  "features": {
    "invites": true,
    "oauth_registration": true,
    "user_registration": false
  },
  "chunks": {
    "max_size": 94371840,
    "chunks_size": 20971520
  }
}
```