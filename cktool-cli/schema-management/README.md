# `cktool` CLI Sample: Schema Management

## Goals

Demonstrates how to use the `cktool` command-line interface to import a schema to your container and how to export a schema from your container. It also shows how to reset your schema.

## Exporting Your Schema

You can export your schema by running the following in your terminal:
```zsh
$ xcrun cktool export-schema --team-id TEAM_ID --container-id CONTAINER_ID --environment ENVIRONMENT
```
where `TEAM_ID` is your Apple Developer team identifier, `CONTAINER_ID` is the identifier of your CloudKit Container, and `environment` is `development` or `production`.

You can save this output to a file using the `>` operator, e.g.
```zsh
$ xcrun cktool export-schema --team-id TEAM_ID --container-id CONTAINER_ID --environment ENVIRONMENT > /tmp/ck-schema.ckdb
```

## Importing Your Schema

You can import your schema by running the following in your terminal:
```zsh
$ xcrun cktool import-schema --team-id TEAM_ID --container-id CONTAINER_ID --environment ENVIRONMENT --file /path/to/your/schema.ckdb
```

## Resetting Your Schema

To reset your container's schema to the production schema, run:

```zsh
$ xcrun cktool reset-schema --team-id TEAM_ID --container-id CONTAINER_ID
```
