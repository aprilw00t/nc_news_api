const connection = require("../db/connection");

exports.fetchAllArticles = ({
  sortBy = "created_at",
  order = "desc",
  author,
  topic
}) => {
  return connection
    .select(
      "author",
      "title",
      "article_id",
      "topic",
      "created_at",
      "votes"
      //"comment_count" need to finish this
    )
    .from("articles")
    .modify(query => {
      if (author) {
        query.where("author", author);
      }
      if (topic) {
        query.where("topic", topic);
      }
    })
    .orderBy(sortBy, order);
};
exports.fetchArticleByID = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: article_id });
};

exports.updateVotesByID = (article_id, vote_increment) => {
  if (vote_increment === undefined)
    return Promise.reject({ status: 400, msg: "anjjdns" });
  return connection("articles")
    .where({ article_id: article_id })
    .increment("votes", vote_increment)
    .returning("*");
};

exports.fetchCommentsByArticleID = (
  article_id,
  { sortBy = "created_at", order = "desc" }
) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id: article_id })
    .orderBy(sortBy, order);
};

exports.addCommentByArticleID = (article_id, comment) => {
  if (comment === undefined)
    return Promise.reject({ status: 400, msg: "ofhoahf" });
  let newComment = {};
  var d = new Date(Date.now());
  var formattedDate =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  let date = formattedDate;

  newComment["author"] = comment["username"];
  newComment["body"] = comment["body"];
  newComment["article_id"] = article_id;
  newComment["created_at"] = date;

  return connection("comments")
    .where({ article_id: article_id })
    .insert(newComment)
    .returning("*");
};
