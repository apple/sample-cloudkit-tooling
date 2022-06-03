const { createCKDBRecordFieldStringValue } = require("@apple/cktool.database");

const RECORD_TYPE = "Currencies";
const ZONE_NAME = "_defaultZone";

/**
 * Make a local Currency object.
 *
 * @param {string} countryCode
 * @param {string} currencyCode
 * @param {string} name
 */
const make = (countryCode, currencyCode, name) => ({
  countryCode,
  currencyCode,
  name,
});

/**
 * Make a createRecordRequestBody object that will be
 * used in a createRecord operation.
 *
 * @param {string} currency.countryCode
 *     The currency country code.
 * @param {string} currency.currencyCode
 *     The currency code.
 * @param {string} currency.name
 *     The name of the currency.
 * @returns A CreateRecordRequestBody object for
 *     a currency createRecord operation.
 */
const makeCreateRecordRequestBody = (currency) => ({
  recordType: RECORD_TYPE,
  fields: {
    countryCode: createCKDBRecordFieldStringValue({
      value: currency.countryCode,
    }),
    currencyCode: createCKDBRecordFieldStringValue({
      value: currency.currencyCode,
    }),
    name: createCKDBRecordFieldStringValue({
      value: currency.name,
    }),
  },
});

/**
 * Writes the currency object to iCloud.
 *
 * @param {PromisesApi} userApi A CKTool JS PromisesApi
 *     instance that authenticates with a user token.
 * @param {String} databaseArgs.containerId
 *     The container identifier.
 * @param {CKEnvironment} databaseArgs.containerId
 *     The container environment.
 * @param {CKDatabaseType} databaseArgs.databaseType
 *     The database type.
 * @param {string} currency.countryCode
 *     The currency country code.
 * @param {string} currency.currencyCode
 *     The currency code.
 * @param {string} currency.name
 *     The name of the currency.
 * @returns The result of the createRecord operation.
 */
const create = (userApi, databaseArgs, currency) =>
  userApi.createRecord({
    ...databaseArgs,
    zoneName: ZONE_NAME,
    body: makeCreateRecordRequestBody(currency),
  });

/**
 * Retrieves all currency records from iCloud.
 *
 * @param {PromisesApi} userApi A CKTool JS PromisesApi
 *     instance that authenticates with a user token.
 * @param {String} databaseArgs.containerId
 *     The container identifier.
 * @param {CKEnvironment} databaseArgs.containerId
 *     The container environment.
 * @param {CKDatabaseType} databaseArgs.databaseType
 *     The database type.
 * @returns
 */
const fetchAll = (userApi, databaseArgs) =>
  userApi.queryRecords({
    ...databaseArgs,
    zoneName: ZONE_NAME,
    body: {
      query: {
        recordType: RECORD_TYPE,
      },
    },
  });

module.exports = {
  create,
  fetchAll,
  make,
  makeCreateRecordRequestBody,
  RECORD_TYPE,
  ZONE_NAME,
};
