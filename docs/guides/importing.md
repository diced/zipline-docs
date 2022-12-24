# Importing Data
This guide may be useful if you are migrating from another host to Zipline. this may only work if the data is in a directory. Other datasources like S3 will not work with this method.

## Prerequisites
* Directory full of files (can literally be anything)
* Latest version of Zipline

## Importing

### Docker
If using docker you need to add a volume to the directory you wish to import from. This can be done by simply adding a new entry under the `volumes:` section of the `docker-compose.yml` file.

```yaml
volumes:
  - ./import:/zipline/import
```

Then you can run the following command to import the data:

```bash
docker-compose exec zipline yarn scripts:import-dir /zipline/import
```

By default this will import all files into the currently configured datasource, whether its Local, S3 or Swift, this will also try to guess each files mimetype and set the correct content-type header. 

### Non-Docker
Simply run the following command:

```bash
yarn scripts:import-dir /path/to/import
```

### Import to another user account
If you don't want files to be imported into the default `administrator` account, you can specify a number (the user id) to import to. This can be done by simply adding another argument to the command.


<Tabs>
  <TabItem value="docker" label="Docker" default>

```bash
docker-compose exec zipline yarn scripts:import-dir /zipline/import 2
# 2 = the user id
```
  </TabItem>
  <TabItem value="non-docker" label="Non-Docker">

```bash
yarn scripts:import-dir /path/to/import 2
```
  </TabItem>
</Tabs>


