---
sidebar_position: 6
---

# Caddy Reverse Proxy

This section requires [Caddy](https://caddyserver.com/)

Edit `/etc/caddy/Caddyfile` with the following lines:
```
something.example.com { # you can also use wildcard subdomains like *.example.com and base domains like example.com
	encode gzip
	reverse_proxy 0.0.0.0:3000 # replace this with the route in which zipline is hosted, default is 0.0.0.0:3000
}
```

Start the caddy service using `systemctl enable --now caddy`
