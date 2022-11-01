# Website
This page documents the frontend configuration of Zipline.

## `WEBSITE_TITLE`
The title of the website. This will change anything that says "Zipline", into your name of choice.
```bash
WEBSITE_TITLE=Zipline
```

## `WEBSITE_SHOW_FILES_PER_USER`
Due to privacy concerns when running Zipline with many users, you may want to hide the number of files a user has uploaded from the statistics page so taht other users do not see emails or usernames.
```bash
WEBSITE_SHOW_FILES_PER_USER=true
```

## `WEBSITE_EXTERNAL_LINKS`
External links to show on the sidebar, see [here](/docs/guides/external-links).
```bash
WEBSITE_EXTERNAL_LINKS='[{"label":"Zipline","link":"https://github.com/diced/zipline"}]'
```

## `WEBSITE_SHOW_VERSION`
Whether or not to show the Zipline version in the sidebar. A red badge will appear if there is a new version available showing that you are on an outdated version.
```bash
WEBSITE_SHOW_VERSION=true
```

## `WEBSITE_DISABLE_MEDIA_PREVIEW`
For those who want to save data, or just don't want to have image previews on the dashboard, you can disable them here. Defaults to being enabled.
```bash
WEBSITE_DISABLE_MEDIA_PREVIEW=false
```