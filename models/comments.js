const connection = require("../db/connection");

exports.updateVotesByID = (comment_id, vote_increment) => {
  if (vote_increment === undefined)
    return Promise.reject({ status: 400, msg: "anjjdns" });
  return connection("comments")
    .where({ comment_id: comment_id })
    .increment("votes", vote_increment)
    .returning("*");
};

exports.removeCommentByID = comment_id => {
  return connection("comments")
    .where({ comment_id: comment_id })
    .del();
};
