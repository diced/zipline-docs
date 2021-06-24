---
id: nginx
title: NGINX Config
---

When setting up Zipline you might want to have it behind a reverse proxy like NGINX...

```conf
server {
    listen 80 default_server;
    client_max_body_size 100M;
    server_name <your domain (optional)> 

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
