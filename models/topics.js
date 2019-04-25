const connection = require("../db/connection");

exports.fetchAllTopics = () => {
  return connection("topics").returning("*");
};
