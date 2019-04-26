const { fetchUserByID } = require("../models/users");

exports.getUserByID = (req, res, next) => {
  fetchUserByID(req.params.username)
    .then(user => {
      if (!user[0]) {
        return Promise.reject({ status: 404, msg: "No user with that ID" });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
