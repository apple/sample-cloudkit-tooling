"use strict";

const {
  PromisesApi,
  CKEnvironment,
  CKDatabaseType,
} = require("@apple/cktool.database");
const { createConfiguration } = require("@apple/cktool.target.nodejs");
const Currencies = require("./Currencies");

// Create a configuration object suitable for use
// in Node.js environments.
const configuration = createConfiguration();

// For working with records, a User Token must
// be used instead.
const userApi = new PromisesApi({
  configuration,
  security: {
    UserTokenAuth: process.env.CKTOOL_USER_TOKEN,
  },
});

const defaultBaseArgs = {
  teamId: process.env.TEAM_ID,
};

const defaultDatabaseArgs = {
  ...defaultBaseArgs,
  containerId: process.env.CONTAINER_ID,
  environment: CKEnvironment.DEVELOPMENT,
  databaseType: CKDatabaseType.PUBLIC,
};

// Since this is talking to the server, set the
// timeout to be longer than the default.
const timeoutDuration = 20000;

describe("test", () => {
  it(
    "can write and read Currencies records",
    async () => {
      const currencies = [
        Currencies.make("AU", "AUD", "Australian Dollar"),
        Currencies.make("CA", "CAD", "Canadian Dollar"),
        Currencies.make("US", "USD", "United States Dollar"),
      ];

      const promisesForCreates = currencies.map((currency) =>
        Currencies.create(userApi, defaultDatabaseArgs, currency)
      );
      const promiseResults = await Promise.allSettled(promisesForCreates);
      expect(promiseResults.every((result) => result.statusCode === 201));

      // Fetch all currencies
      const response = await Currencies.fetchAll(userApi, defaultDatabaseArgs);
      expect(response.statusCode).toBe(200);

      // Verify that they were all found.
      currencies.forEach((currency) => {
        const found = response.result.records.find(
          (record) =>
            record.fields["countryCode"].value === currency.countryCode
        );
        expect(found).toBeDefined();
      });
    },
    timeoutDuration
  );
});
