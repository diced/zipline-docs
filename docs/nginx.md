---
sidebar_position: 3
---

# NGINX Config
When setting up Zipline you might want to have it behind a reverse proxy like NGINX... You can use the config below and modify it to your liking.

The `client_max_body_size` is set to `100M` as most people use [Cloudflare](https://dash.cloudflare.com) which has a upload limit of only `100M` on free plans.

You can remove the server_name part, or just input your domain you want zipline on.

Replace `PORT` with the port Zipline has been exposed to.

You may remove the `default_server` attribute from `listen` if you don't want it to be the default server running.

```conf title="/etc/nginx/sites-enabled/zipline.conf"
server {
  listen 80 default_server;
  client_max_body_size 100M;
  server_name <your domain (optional)>;
  location / {
    proxy_pass http://localhost:PORT;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```