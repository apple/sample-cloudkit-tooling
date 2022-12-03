"use strict";

const { CKEnvironment, PromisesApi } = require("@apple/cktool.database");
const { File, createConfiguration } = require("@apple/cktool.target.nodejs");
const fs = require("fs/promises");
const path = require("path");

const schemaFileName = process.env.SCHEMA_FILE || "schema.ckdb";
const schemaPath = path.join(process.cwd(), schemaFileName);

// Create a configuration object suitable for use
// in Node.js environments.
const configuration = createConfiguration();

// Create an instance of the API promises object
// that we use to talk with the server.
const api = new PromisesApi({
  configuration,
  security: {
    // You can obtain a management token from the
    // Database section of CloudKit Console.
    ManagementTokenAuth: process.env.CKTOOL_MGMT_TOKEN,
  },
});

// teamId, containerId, and environment, are used by
// each of the CKTool JS methods we are calling in
// this sample. Rather than repeating ourselves, each
// time, we will store them in an object we can pass
// to each of the methods.
const defaultArgs = {
  teamId: process.env.TEAM_ID,
  containerId: process.env.CONTAINER_ID,
  environment: CKEnvironment.DEVELOPMENT,
};

async function importSchema() {
  try {
    console.log('Uploading schema...');
    const buffer = await fs.readFile(schemaPath);
    const file = new File([buffer], schemaFileName);

    await api.importSchema({
      ...defaultArgs,
      file,
    });

    console.log('Schema uploaded successfully');
  } catch (error) {
    console.error(configuration.jsonStringify(error, null, 2));
    throw error;
  }
}

async function resetToProduction() {
  try {
    console.log('Resetting schema to production...');
    await api.resetToProduction(defaultArgs);
    console.log('Schema reset to production successfully');
  } catch (error) {
    console.error(configuration.jsonStringify(error, null, 2));
    throw error;
  }
}

resetToProduction().then(() => importSchema());
