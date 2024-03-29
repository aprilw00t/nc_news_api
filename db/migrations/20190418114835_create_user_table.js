exports.up = function(knex, Promise) {
  console.log("creating user table...");
  return knex.schema.createTable("users", userTable => {
    userTable.string("username").primary();
    userTable.string("avatar_url").notNullable();
    userTable.string("name");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing user tables...");
  return knex.schema.dropTable("users");
};
