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