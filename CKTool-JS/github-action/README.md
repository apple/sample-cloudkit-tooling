# CKTool JS Sample: Reset and apply database schema

## Goals

Demonstrates a script that can be run as a GitHub workflow action.

The script that is run on GitHub push and pull requests will
reset a container's schema and apply a new schema to the
container as defined in the `schema.ckdb` file.

## Prerequisites

- A GitHub account.
- A CloudKit container identifier.
- An [Apple Developer Program](https://developer.apple.com/support/compare-memberships/)
membership is needed if you wish to create your own CloudKit container.

## Set up the sample

Clone this repository to your GitHub account.

In the settings for your cloned repository, set up the
following encrypted secrets:
  - `CKTOOL_MGMT_TOKEN`: Your management token that you obtain from CloudKit Console.
  - `TEAM_ID`: The identifier of your team.
  - `CONTAINER_ID`: The identifier of your container.
Learn more about GitHub encrypted secrets [here](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

This should be sufficient to run the sample.

To add an additional action, do the following:
- Create a new JS file with your script in `src`.
- Add an additional script to the `scripts`
  entry in `package.json` to run the new JS script.
- Copy the contents of `.github/workflows/node.js.yml`
  to another yml file in that same directory.
- Change the last line in the `yml` file to run your new script.

## Things to Learn

- Resetting your development container to the production state.
- Applying a schema contained in a file to your development container.
- Incorporating a Node.js script using CKTool JS into a GitHub workflow action.

## Further Reading

- GitHub: [Using workflows](https://docs.github.com/en/actions/using-workflows)
- [Automating CloudKit Development](https://developer.apple.com/icloud/cloudkit/automating/)
