# `reset-schema`
>  Resets schema in the container development environment to match production, and deletes all data in the development environment.

#### Options
```
  -t, --token <token>     Authorization token
  --team-id <team-id>     An Apple Developer Program team identifier
  --container-id <container-id>
                          Unique iCloud container identifier
  --version               Show the version.
  -h, --help              Show help information.
```

#### Example Invocation

```
❯ xcrun cktool reset-schema --team-id 6K6EUR9N36 --container-id com.apple.cktool.testcontainer
```

#### Example Output

Exits with `0` if successful, otherwise prints an error and exits with error status.
