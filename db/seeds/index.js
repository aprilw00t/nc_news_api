const {
  topicData,
  userData,
  articleData,
  commentData
} = require("../data/index");

const { formatComment, formatArticle } = require("../utils/utils");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(userData)
        .into("users")
        .returning("*");
    })
    .then(returnedUserData => {
      let formattedArticleStuff = formatArticle(
        returnedUserData,
        topicData,
        articleData
      );
      return knex("articles")
        .insert(formattedArticleStuff)
        .returning("*");
    })
    .then(returnedArticleData => {
      let formattedCommentStuff = formatComment(
        userData,
        returnedArticleData,
        commentData
      );
      return knex("comments")
        .insert(formattedCommentStuff)
        .returning("*");
    });
};

//the inserting using knex, eg return knex('houses').insert(data)
//make sure to chain on a .returning('*') to use it in the then block
