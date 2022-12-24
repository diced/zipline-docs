# Supabase

Configuration for the `supabase` datasource. Ability to connect with Supabase's storage API.

<Alert type="tip">
It is also possible to use Supabase's postgres database for Ziplines [`CORE_DATABASE_URL`](/docs/config/core#core_database_url)
</Alert>

<Alert type="note">
Supabase's free plan limits uploads by 50MB, this is not bypassable through partial uploads. If an upload fails due to this limit, you must upgrade or suck it up.
</Alert>

## `DATASOURCE_SUPABASE_URL`

The URL of your Supabase project. This can be found in the Supabase dashboard under "Project URL" in "Project Settings" (Gear Icon on the sidebar) -> "API".

```bash
DATASOURCE_SUPABASE_URL=https://xxxxxxxx.supabase.co
```

## `DATASOURCE_SUPABASE_KEY`

The key of your Supabase project. This can be found in the Supabase dashboard under "Project API Keys" in "Project Settings" (Gear Icon on the sidebar) -> "API".

<Alert type="warning">
Using the `anon` `public` key will not work by default, as it doesn't have access to everything. You will need to use the `service_role` key, or feel free to configure your own role with the correct permissions.
</Alert>

```bash
DATASOURCE_SUPABASE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## `DATASOURCE_SUPABASE_BUCKET`

The name of the bucket to save files to. You will need to create this bucket in the Supabase dashboard under "Storage", and click "New Bucket".

```bash
DATASOURCE_SUPABASE_BUCKET=zipline
```
