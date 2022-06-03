# `cktool` CLI Sample: Record Operations

## Goals

Demonstrates how to use the `cktool` command-line interface to create and delete CloudKit records.

## Creating Records

CloudKit records can be created with `cktool` via the `create-record` command. Records created this way are defined by JSON, which can be provided in-line through the `--fields-json` option, by a file with `--fields-file`, or from stdin with `--fields-stdin`.

Below is an example which creates a `Book` record:

```zsh
$ xcrun cktool create-record --team-id TEAM_ID \
       --container-id CONTAINER_ID \
       --environment ENVIRONMENT \
       --database-type DB_TYPE \
       --zone-name ZONE_NAME \
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

where:

* `TEAM_ID` is your Apple Developer team identifier,
* `CONTAINER_ID` is the identifier of the target CloudKit Container,
* `ENVIRONMENT` is `development` or `production`,
* `DB_TYPE` is `public`, `private` or `shared`,
* `ZONE_NAME` is the zone where the record should be created,
* `--record-type` is the record type being created, in this case `Book`, and
* `--fields-json` is an in-line JSON description of the record keys and values.

Note that in the above example, CloudKit Assets are used for the `authorImage` and `covers` fields, and the `--asset-files` option is used to provide paths for referenced assets.

The `create-record` command returns a JSON description of the newly created record.

## Deleting Records

You can delete a specific record by running the following in your terminal:

```zsh
$ xcrun cktool delete-record \
      --team-id TEAM_ID \
      --container-id CONTAINER_ID \
      --environment ENVIRONMENT \
      --database-type DB_TYPE \
      --zone-name ZONE_NAME \
      --record-name UNIQUE_RECORD_NAME
```

where `UNIQUE_RECORD_NAME` is the unique CloudKit record name you want to delete.

## Deleting Multiple Records

You can delete multiple records matching a set of filters by running, for example, the following in your terminal:

```zsh
$ xcrun cktool delete-records \
        --container-id CONTAINER_ID \
        --environment ENVIRONMENT \
        --database-type DB_TYPE \
        --zone-name ZONE_NAME \
        --record-type Book \
        --filters "pageCount < 1000" \
        --dry-run false
```

where `--filters` is a set of filters that records must match to perform deletion. More on how `cktool` parses filters can be found in the [Filters](../Arguments/Filters.md) document.
