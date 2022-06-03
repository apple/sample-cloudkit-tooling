# `export-schema`
> Returns the current schema for a given container and environment.

#### Options
```
  -t, --token <token>     Authorization token
  --team-id <team-id>     An Apple Developer Program team identifier
  --container-id <container-id>
                          Unique iCloud container identifier
  --environment <environment>
                          The container environment
  --output-file <output-file>
                          Writes returned schema to file on disk.
  --version               Show the version.
  -h, --help              Show help information.
```

`--environment` = `development` or `production`

Specifying `--output-file <path>` will write schema file to disk.

#### Example Invocation

```
❯ xcrun export-schema --team-id 76K942XQM3 --container-id com.apple.acp.dev --environment production
```

#### Example Output

```
DEFINE SCHEMA

    RECORD TYPE Users (
        "___createTime" TIMESTAMP,
        "___createdBy"  REFERENCE,
        "___etag"       STRING,
        "___modTime"    TIMESTAMP,
        "___modifiedBy" REFERENCE,
        "___recordID"   REFERENCE QUERYABLE,
        roles           LIST<INT64>,
        GRANT WRITE TO "_creator",
        GRANT READ TO "_world"
    );

```
