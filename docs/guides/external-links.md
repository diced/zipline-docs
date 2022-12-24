---
sidebar_position: 7
---

# External Links
You can now add external links in the sidebar of Zipline.

![](/img/el-1.png)

By default they will show the Zipline github and the documentation, but you can change it to have any links you would like. The structure is as follows:
```json
[
  { "label": "Text label that will be shown on the sidebar", "link": "the external link" },
]
```

You can stringify the above JSON and set the `WEBSITE_EXTERNAL_LINKS` environment variable. For more see [the config docs](/docs/config/website#website_external_links)

## Playground
Here is an easy utility to build the sidebar external links:

<ExternalLinksBuilder />