const commentsRouter = require("express").Router();
const {
  patchCommentByID,
  deleteCommentByID
} = require("../controllers/comments");

commentsRouter.patch("/:commentid", patchCommentByID);
commentsRouter.delete("/:commentid", deleteCommentByID);
module.exports = commentsRouter;
