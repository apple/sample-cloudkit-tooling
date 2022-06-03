# CKTool JS Sample: Schema Management

## Goals

Demonstrates how to import a schema to your container
and how to export a schema from your container.
It also shows how to reset your schema.

## Prerequisites

- A CloudKit container identifier.
- An [Apple Developer Program](https://developer.apple.com/support/compare-memberships/)
membership is needed if you wish to create your own CloudKit container.

## Set up the Sample

- Ensure that [Node.js](https://nodejs.org/) is installed.
- The following environment variables should be set
  - `CKTOOL_MGMT_TOKEN`: Your management token that you obtain from CloudKit Console.
  - `SAMPLE_TEAM_ID`: The identifier of your team.
  - `SAMPLE_CONTAINER_ID`: The identifier of your container.

### TypeScript and JavaScript

TypeScript types ship with CKTool JS packages.
There are both TypeScript and JavaScript variants
of this sample.

Before you install and run the sample, you'll need
to change directory to the variant you want to work
with.

## Install Dependencies

From your terminal, run:
```zsh
$ npm install
```

## Run the Sample

This sample runs like a command line tool. You'll run
the sample using `npm start {action}`, where `{action}`
is one of `export`, `import`, or `reset`.

### Exporting Your Schema

To download your schema from your container:
```zsh
$ npm start export
```
This will create the `src/sample.ckdb` file if successful.
The contents of that file will be text in CloudKit Schema Language.

### Importing Your Schema

Create or modify the `src/sample.ckdb` text file with
your schema in CloudKit Schema Language. Then
upload your schema to your container:

```zsh
$ npm start import
```

### Resetting Your Schema

To reset your container's schema to the production schema,
run:

```zsh
$ npm start reset
```

## Things to Learn

- Resetting your development container to the production state.
- Importing and exporting schemas related to your development container.

## Further Reading

- CloudKit Schema Language:
[Integrating a Text-Based Schema into Your Workflow](https://developer.apple.com/documentation/cloudkit/integrating_a_text-based_schema_into_your_workflow).
