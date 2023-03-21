# Clear Zero Byte Files

This script will try to find and delete any files that are 0 bytes in size.

## Usage

<Tabs>
  <TabItem value="docker" label="Docker" default>

```bash
docker compose exec zipline yarn scripts:clear-zero-byte
```

  </TabItem>
  <TabItem value="non-docker" label="Non Docker">

```bash npm2yarn
npm run scripts:clear-zero-byte
```

  </TabItem>
</Tabs>

## Output

When ran, the script will prompt you to confirm that you want to delete the files. If you type `y` (case insensitive), the files will be deleted. If you type `n` or anything else (case insensitive), the script will exit.

Before prompted, it will let you know how many files it found that have a size of 0 bytes.
