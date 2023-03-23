# Query Size

This script will set the size of all files in the database to the size of the file in the database.

## Usage

<Tabs>
  <TabItem value="docker" label="Docker" default>

```bash
docker compose exec zipline yarn scripts:query-size
```

  </TabItem>
  <TabItem value="non-docker" label="Non Docker">

```bash npm2yarn
npm run scripts:query-size
```

  </TabItem>
</Tabs>

## Output

When ran, the script will automatically query the size of all files within the datbase and set the size of the file to the size of the file in the database. 

This should be used when updating to a newer version from versions before `3.6.4`.