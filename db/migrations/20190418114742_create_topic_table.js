exports.up = function(knex, Promise) {
  console.log("creating topic table...");
  return knex.schema.createTable("topics", topicTable => {
    topicTable.string("slug").primary();
    topicTable.string("description").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topic tables...");
  return knex.schema.dropTable("topics");
};
