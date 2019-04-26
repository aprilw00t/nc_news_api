exports.up = function(knex, Promise) {
  console.log("creating comment table...");
  return knex.schema.createTable("comments", commentTable => {
    commentTable.increments("comment_id").primary();
    commentTable
      .string("author")
      .references("username")
      .inTable("users");
    //references users primary key
    commentTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles");
    //references article primary key
    commentTable.integer("votes").defaultTo(0);
    //defaults to 0
    commentTable.date("created_at");
    commentTable.text("body").notNullable();
  });
};
/* */

exports.down = function(knex, Promise) {
  console.log("removing comment tables...");
  return knex.schema.dropTable("comments");
};
