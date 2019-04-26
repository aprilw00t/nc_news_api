const connection = require("../db/connection");

exports.updateVotesByID = (comment_id, vote_increment) => {
  console.log(vote_increment);
  if (
    vote_increment === undefined ||
    isNaN(vote_increment) ||
    vote_increment["vote_increment"] === null
  )
    return Promise.reject({
      status: 400,
      msg: "Incorrect vote increment format"
    });
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
