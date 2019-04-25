const { fetchAllTopics } = require("../models/topics");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics(req.query)
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
