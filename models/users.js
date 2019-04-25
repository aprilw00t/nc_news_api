const connection = require("../db/connection");

exports.fetchUserByID = username => {
  return connection("users")
    .where({ username: username })
    .returning("*");
};
