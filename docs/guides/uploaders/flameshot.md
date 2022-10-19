---
sidebar_position: 2
---

# Flameshot
This section requires [Flameshot](https://www.flameshot.org/), [jq](https://stedolan.github.io/jq/), and [xsel](https://github.com/kfish/xsel).

## Generate from Zipline
Zipline now supports generating a script that will upload files to Zipline using flameshot. To generate a script, head to your user management page within Zipline.

![](/guides/sharex-1.png)

Then head to the bottom of the page and click the "Generate Flameshot Script" button.

![](/guides/flameshot-1.png)

After clicking this, it will prompt you to configure your script. You may leave everything as is to use the default settings, or you may change them to your liking.

![](/guides/flameshot-2.png)

Once you download one save it to your computer, remember the path, and make the file executable.

### Through the terminal
```bash
chmod +x ~/Downloads/zipline.sh
```

### Through the file manager
![Gnome Files (nautilus)](/guides/flameshot-3.png)
![KDE (dolphin)](/guides/flameshot-4.png)


### Extra: Set up a keyboard shortcut with KDE
Head over to the Settings app, and go to Custom Shortcuts. Create a new shortcut.
![](/guides/flameshot-kde-1.png)

Set the keyboard shortcut to whatever, usually `Print`.

![](/guides/flameshot-kde-2.png)

Set the command to the path of the script you downloaded.
![](/guides/flameshot-kde-3.png)

Hit `Apply` and you're done! You can now press `Print` to open the flameshot gui and once you take the screenshot it will upload it to Zipline then copy the URL.

## DIY

To upload files using flameshot we will use a script. Replace $TOKEN and $HOST with your own values, you probably know how to do this if you use linux.

```shell title="ss.sh"
DATE=$(date '+%h_%Y_%d_%I_%m_%S.png');
flameshot gui -r > ~/Pictures/$DATE;

curl -H "Content-Type: multipart/form-data" -H "authorization: $TOKEN" -F file=@$1 $HOST/api/upload | jq -r 'files[0].url' | xsel -ib
```