const dbConfig = require("../knexfile");

module.exports = require("knex")(dbConfig);

// const knex = require("knex");
// const dbConfig = require("../knexfile");
// const connection = knex(dbConfig);
// module.exports = connection;
