# Zipline Docs v4

Documentation for [Zipline v4](https://github.com/diced/zipline/tree/v4)!

## Contributing

Feel free to make a PR to the `v4` branch if you find any issues or have suggestions for improvement.

### Using the go sidebar generator
Recently, I've made a Go program that generates the sidebar.json file. This is wayyyy faster than the old version and is much better to use during dev. If you want to use it, install Go and run the following command:

```bash
pnpm go:build
```

Then run the dev server:

```bash
pnpm dev
```

If you don't want to use the go sidebar generator (or cbb ig), it will just warn you in the console and use the old node version instead.