# `import-schema`
> Import a local schema file into the given CloudKit container and environment.

#### Options
```
  -t, --token <token>     Authorization token
  --team-id <team-id>     An Apple Developer Program team identifier
  --container-id <container-id>
                          Unique iCloud container identifier
  --environment <environment>
                          The container environment
  --file <file>           Path to the schema file to import.
  --version               Show the version.
  -h, --help              Show help information.
```

`--environment` = `development` or `production`

#### Example Invocation

```
❯ xcrun cktool import-schema --team-id 6K6EUR9N36 --container-id com.apple.acp.dev --environment development --file schema.ckdb
```

#### Example Output

No output. Exit code `0` if successful, otherwise exits with error code and error info.
