---
sidebar_position: 2
---

# Flameshot
This section requires [Flameshot](https://www.flameshot.org/), [jq](https://stedolan.github.io/jq/), and [xsel](https://github.com/kfish/xsel).

To upload files using flameshot we will use a script. Replace $TOKEN and $HOST with your own values, you probably know how to do this if you use linux.

```shell title="ss.sh"
DATE=$(date '+%h_%Y_%d_%I_%m_%S.png');
flameshot gui -r > ~/Pictures/$DATE;

curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload | jq -r 'files[0].url' | xsel -ib
```