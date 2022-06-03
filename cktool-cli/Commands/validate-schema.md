# `validate-schema`
> Validates a schema file against the given CloudKit container and environment.

Acts as a dry-run of `import-schema`

#### Options
```
  -t, --token <token>     Authorization token
  --team-id <team-id>     An Apple Developer Program team identifier
  --container-id <container-id>
                          Unique iCloud container identifier
  --environment <environment>
                          The container environment
  --file <file>           Path to the schema file to validate.
  --version               Show the version.
  -h, --help              Show help information.
```

`--environment` = `development` or `production`

#### Example Invocation

```
❯ xcrun cktool validate-schema --team-id 6K6EUR9N36 --container-id com.apple.acp.dev --environment development --file schema.ckdb
```

#### Example Output

Valid schema:

```
✅ Schema is valid.
```

Invalid schema:

```
❌ Schema validation failed: Encountered " <IDENTIFIER> "BADTYPE "" at line 6, column 25.
Was expecting:
    "LIST" ...

```
