const { updateVotesByID, removeCommentByID } = require("../models/comments");

exports.patchCommentByID = (req, res, next) => {
  const comment_id = req.params.commentid;
  const vote_increment = req.body.vote_increment;
  updateVotesByID(comment_id, vote_increment)
    .then(updatedComment => {
      res.status(200).send({ comments: updatedComment });
    })
    .catch(next);
};

exports.deleteCommentByID = (req, res, next) => {
  const comment_id = req.params.commentid;
  removeCommentByID(comment_id)
    .then(deletedComment => {
      res.status(204).send({ deleted: deletedComment });
    })
    .catch(next);
};
