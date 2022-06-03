import { CKEnvironment, PromisesApi } from "@apple/cktool.database";
import { File, createConfiguration } from "@apple/cktool.target.nodejs";
import fs from "fs/promises";
import path from "path";

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
    ManagementTokenAuth: process.env.CKTOOL_MGMT_TOKEN!,
  },
});

// teamId, containerId, and environment, are used by
// each of the CKTool JS methods we are calling in
// this sample. Rather than repeating ourselves, each
// time, we will store them in an object we can pass
// to each of the methods.
const defaultParams = {
  teamId: process.env.SAMPLE_TEAM_ID!,
  containerId: process.env.SAMPLE_CONTAINER_ID!,
  environment: CKEnvironment.DEVELOPMENT,
};

async function exportSchema(): Promise<void> {
  try {
    console.log(`Downloading schema...`);
    const response = await api.exportSchema(defaultParams);
    const destPath = path.join(__dirname, "sample.ckdb");
    const arrayBuffer = await response.result.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(destPath, buffer);
    console.log(`Schema downloaded to ${destPath}`);
  } catch (ex) {
    console.error(configuration.jsonStringify(ex, null, 2));
  }
}

async function importSchema(): Promise<void> {
  try {
    console.log(`Uploading schema...`);
    const srcPath = path.join(__dirname, "sample.ckdb");
    const buffer = await fs.readFile(srcPath);
    const file = new File([buffer], "sample.ckdb");
    await api.importSchema({
      ...defaultParams,
      // In addition to the default parameters,
      // we need to provide a file to this method.
      file,
    });
    console.log(`Schema uploaded successfully`);
  } catch (ex) {
    console.error(configuration.jsonStringify(ex, null, 2));
  }
}

async function resetToProduction(): Promise<void> {
  try {
    console.log(`Resetting schema to production...`);
    await api.resetToProduction(defaultParams);
    console.log(`Schema reset to production successfully`);
  } catch (ex) {
    console.error(configuration.jsonStringify(ex, null, 2));
  }
}

// We use the second command line parameter
// as the action we want to take.
const action = process.argv[2];
switch (action) {
  case "export": {
    exportSchema();
    break;
  }

  case "import": {
    importSchema();
    break;
  }

  case "reset": {
    resetToProduction();
    break;
  }

  default: {
    console.error(`Action not recognized: ${action}`);
    console.error(`Valid actions are: export, import, or reset`);
    break;
  }
}
