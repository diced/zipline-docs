# Flameshot Uploader (recomended)
Using [https://github.com/diced/flameshot-uploader](https://github.com/diced/flameshot-uploader) on Linux, you can import your ShareX uploader files.
First download your SXCU from the Zipline Account management page.
![](https://i.diced.tech/u/h3bwmK.png)

Once you have installed `flameshot-uploader`, follow these steps:

```sh
fu add <path to sxcu downloaded previously>
# now run 
fu gui
fu screen
fu full
```

# Flameshot
Using [flameshot](https://flameshot.org/) on Linux or macOS you can pipe raw image data to a file and upload it using cURL.
Use the `upload.sh` from [here](/docs/uploaders/curl). The script below saves the raw image to a file with the date.

```bash title="ss.sh"
# create DATE variable for the below commands
DATE=$(date '+%h_%Y_%d_%I_%m_%S.png');
# open flameshot gui and returns raw image with the -r flag then saved to ~/pictures/$DATE
flameshot gui -r > ~/pictures/$DATE;
# uses the upload.sh from the the cURL example script
./upload.sh ~/pictures/$DATE;
```
