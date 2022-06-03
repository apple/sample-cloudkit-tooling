"use strict";

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

const fs = __importDefault(require("fs/promises")).default;
const path = __importDefault(require("path")).default;
const { CKEnvironment, PromisesApi } = require("@apple/cktool.database");
const { File, createConfiguration } = require("@apple/cktool.target.nodejs");

const schemasPath = path.join(__dirname, "..", "schemas");
const schemaFileName = "coins_v1.ckdb";

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

async function resetToProduction() {
  try {
    console.log(`Resetting schema to production...`);
    await api.resetToProduction(defaultArgs);
    console.log(`Schema reset to production successfully`);
  } catch (ex) {
    console.error(configuration.jsonStringify(ex, null, 2));
    throw ex;
  }
}

async function importSchema() {
  try {
    console.log(`Uploading schema...`);
    const schemaPath = path.join(schemasPath, schemaFileName);
    const buffer = await fs.readFile(schemaPath);
    const file = new File([buffer], schemaFileName);
    await api.importSchema({
      ...defaultArgs,
      // In addition to the default arguments,
      // we need to provide a file to this method.
      file,
    });
    console.log(`Schema uploaded successfully`);
  } catch (ex) {
    console.error(configuration.jsonStringify(ex, null, 2));
    throw ex;
  }
}

resetToProduction().then(() => importSchema());
