---
sidebar_position: 2
---

# Caddy Reverse Proxy

This section requires [Caddy](https://caddyserver.com/)

Edit `/etc/caddy/Caddyfile` with the following lines:

{/*  using nginx-conf so that the comments are syntax highlighted, even though it's not an nginx conf */}

```nginx-conf
# you can also use wildcard subdomains like *.example.com and base domains like example.com
something.example.com {
	encode gzip
	# replace this with the route in which zipline is hosted, default is 0.0.0.0:3000
	reverse_proxy 0.0.0.0:3000
}
```

Start the caddy service using `systemctl enable --now caddy`
