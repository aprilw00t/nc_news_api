const { fetchUserByID } = require("../models/users");

exports.getUserByID = (req, res, next) => {
  fetchUserByID(req.params.username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};
