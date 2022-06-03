# CKTool JS Sample: Travis CI

## Goals

Demonstrates how to run a test script that uses
CKTool JS with [Travis CI](https://www.travis-ci.com).
It also demonstrates how to manage your schema and query and create records

## Prerequisites

- A CloudKit container identifier.
- An [Apple Developer Program](https://developer.apple.com/support/compare-memberships/)
membership is needed if you wish to create your own CloudKit container.

## Set up the Sample

Clone this repository to your GitHub aaccount.

Ensure that you've set up an account at https://travis-ci.com and
follow the instructions there to connect a GitHub repository
to your Travis CI account.

This sample already has a `.travis.yml` file included, so you can
clone this repo to your GitHub account. For the build to
work in Travis, make sure that you have the following
[environment variables](https://docs.travis-ci.com/user/
for your Travis CI configuration.
  - `CKTOOL_MGMT_TOKEN`: Your management token that you obtain from CloudKit Console.
  - `CKTOOL_USER_TOKEN`: Your user token that you obtain from CloudKit Console.
  - `TEAM_ID`: The identifier of your team.
  - `CONTAINER_ID`: The identifier of your container.

You can then manually trigger a build.

To see a build and tests triggered due to code changes,
make a change to your clone, commit and push the changes to GitHub.

## How it Works

In the `package.json` file for this repository, there are two scripts:
- `test:before_script` This script runs `src/resetAndApplySchema.js` before the
  tests are run and is called because of the `before_script` entry
  in the `.travis.yml` configuration file.
- `test` Run the tests in `index.test.js`.

When a build is triggered, `resetAndApplySchema.js` will reset the
development container to the state of production and then apply
the schema described by `schemas/coins_v1.ckdb` to the development container.
The CKDB file is in CloudKit Schema Language.
This prepares the container for reading and writing test records.

Then the tests in `index.test.js` are run since `npm test` is the
default build script for Travis CI. This JS file will create
records and query for them.

There are a couple of things to note in `src/Currencies.js`:

`fetchAll` does not account for continuation tokens that indicate
more records are available to be fetched.

`makeCreateRecordRequestBody` uses `createCKDBRecordField{DataType}Value`
functions to create record field values when creating records.
There are convenience variants of this that are rooted at
`CKRecordFieldValue.make` in the latest version of CKTool JS.
An example of creating a string record field
value would be `const fv = CKRecordFieldValue.make.string("foo)`.

A valid user token, obtainable from CloudKit Console, is required to
run code that accesses records. Note that user tokens are short lived.

## Things to Learn

- Resetting your development container to the production state.
- Applying a schema contained in a file to your development container.
- How to create and query for records.
- Incorporating a Node.js script using CKTool JS into a Travis CI workflow.

## Further Reading

- CloudKit Schema Language:
[Integrating a Text-Based Schema into Your Workflow](https://developer.apple.com/documentation/cloudkit/integrating_a_text-based_schema_into_your_workflow).
- Travis CI: [Building a JavaScript and Node.js project](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)
