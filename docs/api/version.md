# /api/version

<Alert type="info">
  Requires [authentication](/docs/api#authentication)
  
  Requires [`WEBSITE_SHOW_VERSION`](/docs/config/website#website_show_version)
</Alert>

## <APIBadge type="GET" /> Get version info

### <APIBadge type="200" /> Ok (JSON)

| Field Name         | Type                   | Description                                                                                              |
| ------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `isUpstream`       | `boolean`              | If the instance is on stable or upstream git                                                             |
| `update`           | `boolean`              | If the instances needs an update                                                                         |
| `updateToType`     | `stable` OR `upstream` | The instance's recommended update                                                                        |
| `version.stable`   | `string`               | Latest stable version                                                                                    |
| `version.upstream` | `string`               | Latest upstream version                                                                                  |
| `version.current`  | `string`               | Instance's current version, either a commit hash or a semver. Commit hash is shortened on the dashboard. |

```json
{
  "isUpstream": true,
  "update": true,
  "updateToType": "upstream",
  "versions": {
    "stable": "4.0.0",
    "upstream": "b842d594f78e0c5b97c1ab83cf6224509a41c402",
    "current": "3.7.13"
  }
}
```

### <APIBadge type="403" /> Unauthorized (JSON)

- `version hidden` - The [`WEBSITE_SHOW_VERSION`](/docs/config/website#website_show_version) is set to `false`, therefore the version is hidden.
