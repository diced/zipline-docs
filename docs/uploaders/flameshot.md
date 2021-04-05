---
title: Flameshot (Linux) Script
description: Flameshot Script
slug: /uploaders/flameshot
---

Using [flameshot](https://flameshot.org/) on linux you can pipe raw image data to a file and upload it using cURL.
Use the `upload.sh` from [here](/docs/uploaders/curl). The script below saves the raw image to a file with the date.

```sh title="screenshot.sh"
# create DATE variable for the below commands
DATE=$(date '+%h_%Y_%d_%I_%m_%S.png');
# open flameshot gui and returns raw image with the -r flag then saved to ~/pictures/$DATE
flameshot gui -r > ~/pictures/$DATE;
# uses the upload.sh from the the cURL example script
./upload.sh ~/pictures/$DATE;
```
