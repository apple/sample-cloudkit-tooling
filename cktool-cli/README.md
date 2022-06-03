# `cktool` CLI Samples

## Goals

These documents demonstrate how to use the `cktool` command-line interface to perform various CloudKit container management, data manipulation, and querying operations.

## Prerequisites

- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 13.0 or later.
- CloudKit Management and User Tokens (obtainable in the [Tokens section of CloudKit Console](https://icloud.developer.apple.com/dashboard/account/tokens))
- An [Apple Developer Program](https://developer.apple.com/support/compare-memberships/)
membership is needed if you wish to create your own CloudKit container.

## Setup Steps

Ensure that `cktool` is available as part of your Xcode installation. You can check by running the following in your terminal:
```zsh
$ xcrun cktool help
```

If you see an error that `xcrun` is unable to find the utility, update Xcode to a version later than 13.0 and check the active Xcode installation with:
```zsh
$ xcode-select -p
```

You can change your currently selected Xcode install with, e.g.:
```zsh
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

## Configuring `cktool` Authentication Tokens

To authenticate with CloudKit you need to provide your CloudKit Management or User Token to `cktool`. Management operations, such as resetting schema, require a Management Token, while data manipulation and querying operations require a User Token. You can use the `CLOUDKIT_MANAGEMENT_TOKEN` and `CLOUDKIT_USER_TOKEN` environment variables to provide these, or using `xcrun cktool save-token`, following the prompts to save your tokens to the Keychain.

## Management Commands

- [Schema Management](schema-management/README.md)
- [`get-teams`](Commands/get-teams.md)
- [`export-schema`](Commands/export-schema.md)
- [`import-schema`](Commands/import-schema.md)
- [`validate-schema`](Commands/validate-schema.md)
- [`reset-schema`](Commands/reset-schema.md)

## User Commands

- [Record Operations](record-operations/README.md)
- [`create-record`](Commands/create-record.md)
- [`query-records`](Commands/query-records.md)
- [`delete-record`](Commands/delete-record.md)
- [`delete-records`](Commands/delete-records.md)
