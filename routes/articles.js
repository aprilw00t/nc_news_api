const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleByID,
  patchArticleByID,
  getCommentsByArticleID,
  postCommentsByArticleID
} = require("../controllers/articles");

articlesRouter.get("/", getAllArticles); //this one is not finished
articlesRouter.get("/:article_id", getArticleByID); //cause of error
articlesRouter.patch("/:article_id", patchArticleByID);
articlesRouter.get("/:article_id/comments", getCommentsByArticleID);
articlesRouter.post("/:article_id/comments", postCommentsByArticleID);
//articlesRouter.patch("/:article_id/comments", patchCommentByArticleID);
module.exports = articlesRouter;
