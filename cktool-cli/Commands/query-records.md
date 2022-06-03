# `query-records`
> Queries the database for records with an optional set of filters.

#### Options
```
  -t, --token <token>     Authorization token
  --team-id <team-id>     An Apple Developer Program team identifier
  --container-id <container-id>
                          Unique iCloud container identifier
  --environment <environment>
                          The container environment
  --database-type <database-type>
                          The database type.
  --zone-name <zone-name> The record zone to query in. (default: _defaultZone)
  --record-type <record-type>
                          Record type for query.
  --filters <filters>     One or more filters described by strings to query with.
  --sort-by <sort-by>     One or more sort descriptors.
  --requested-fields <requested-fields>
                          One or more fields to request. (default: all fields are returned)
  --limit <limit>         Maximum number of records returned in a single query. (default: 200)
  --continuation-token <continuation-token>
                          Continuation token used when receiving limited result sets.
  -h, --help              Show help information.
```

#### Example Invocation

```
❯ xcrun cktool query-records \
  --team-id 6K6EUR9N36 \
  --container-id com.apple.acp.dev \
  --environment development \
  --database-type public \
  --record-type CoffeeShop \
  --filters "latteCost > 4.60" "employeeCount > 10" \
  --sort-by employeeCount \
  --requested-fields name latteCost employeeCount location
```

#### Output

Returns the set of matching records as JSON.

#### Notes

See [Filters](../Arguments/Filters.md) section for information on how filters are parsed, and what types are supported.

`--sort-by` supports multiple sorts, and direction can be specified with `ASC` or `DESC`.
