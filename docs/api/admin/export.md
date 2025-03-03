# /api/admin/export

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
</Alert>

<Alert type="danger">
  Requires super administrator privileges.
</Alert>

## <APIBadge type="GET" /> Create and download a zipline export.

Create and download the latest zipline instance export. The information includes all [users](/docs/api/models/user), [files](/docs/api/models/file), [urls](/docs/api/models/url), and a plethora of information necessary to get a jumpstart on your v4 instance.

<Alert type="danger">

The information included in this export includes your users' [OAuth providers](/docs/api/models/user#oauth) and password hash. Treat the file with utmost care!

</Alert>
