const ENV = process.env.NODE_ENV || "development";

const development = require("./development-data");
const test = require("./test-data");

const data = {
  development,
  test
};

module.exports = data[ENV];

//requires in dev data and test data, exports them to be used in the other files
//determines if you use and export the dev data or the test data, based on the node environment we are using
