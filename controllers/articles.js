const {
  fetchAllArticles,
  fetchArticleByID,
  updateVotesByID,
  fetchCommentsByArticleID,
  addCommentByArticleID
} = require("../models/articles");

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleByID = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchArticleByID(article_id)
    .then(articles => {
      const article = articles[0];

      if (!article) {
        return Promise.reject({ status: 404, msg: "No article with that ID" });
      }
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  const article_id = req.params.article_id;
  const vote_increment = req.body.vote_increment;
  updateVotesByID(article_id, vote_increment)
    .then(updatedArticles => {
      res.status(200).send({ articles: updatedArticles });
    })
    .catch(next);
};

exports.getCommentsByArticleID = (req, res, next) => {
  console.log(req.query);
  const article_id = req.params.article_id;
  fetchCommentsByArticleID(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentsByArticleID = (req, res, next) => {
  const article_id = req.params.article_id;
  const comment = req.body;
  console.log(comment);
  addCommentByArticleID(article_id, comment)
    .then(comments => {
      res.status(201).send({ comments });
    })
    .catch(next);
};
