# `create-record`
> Creates a new record in a given database, returning the new record.

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
  --zone-name <zone-name> The record zone to create the record in. (default: _defaultZone)
  --record-type <record-type>
                          Record type being created. Must be defined in schema.
  --fields-file <fields-file>
                          File containing JSON-formatted fields in {"KEY=": {"type": FIELD_TYPE, "value": VALUE}} format.
  --fields-json <fields-json>
                          Inline JSON description of fields as an alternative to using a file.
  --fields-stdin
  --version               Show the version.
  -h, --help              Show help information.
```

#### Example Invocation

```
❯ xcrun cktool create-record --team-id WWDRTEAMID \
   --container-id iCloud.com.mycompany.mycontainer \
   --environment development \
   --database-type public \
   --record-type Book \
   --fields-json \
      '{
          "title": { "type": "stringType", "value": "The Mysterious Island" },
          "pageCount": { "type": "int64Type", "value": 1464 },
          "description": { "type": "stringType", "value": "An awesome book" },
          "publishedOn": { "type": "timestampType", "value": "1875-09-12T21:12:42Z" },
          "authorImage": { "type": "assetType", "value": "AUTHOR_IMG" },
          "covers": { "type": "assetListType", "value": ["COVER_IMG_1", "COVER_IMG_2"] }
      }' \
      --asset-files AUTHOR_IMG=~/Pictures/jverne.jpg COVER_IMG_1=/tmp/LM1.jpg COVER_IMG_2=/tmp/LM2.jpg
```

#### Output

Returns a JSON description of the newly created record.

#### Notes

`timestampType` in `cktool` supports more flexible parsing as well as ISO8601. The following standard formats are supported:
* `yyyy-MM-dd`
* `yyyy-MM-dd HH:mm`

Additionally, three localized formats are supported:
* `MM-dd-yyyy` (e.g. "04/28/2021" in en_US)
* `MM-dd-yyyy HH:mm` (e.g. "04/28/2021, 17:05" in en_US)
* `MM-dd-yyyy hh:mm` (e.g. "04/28/2021, 5:05 pm" in en_US)

Assets are referenced by unique keys in the JSON, and later assigned file paths with the `--asset-files` option, which supports full and relative paths.
