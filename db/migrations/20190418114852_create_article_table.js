exports.up = function(knex, Promise) {
  console.log("creating article table...");
  return knex.schema.createTable("articles", articleTable => {
    articleTable.increments("article_id").primary();
    articleTable.string("title").notNullable();
    articleTable.text("body");
    articleTable
      .text("topic")
      .references("slug")
      .inTable("topics");
    //references the slug in the topic table
    articleTable
      .string("author")
      .references("username")
      .inTable("users");
    //references a user's primary key
    articleTable.integer("votes").defaultTo(0);
    //defaults to 0
    articleTable.date("created_at");
    /*
created_at defaults to the current date */
  });
};

exports.down = function(knex, Promise) {
  console.log("removing article tables...");
  return knex.schema.dropTable("articles");
};
