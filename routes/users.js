const usersRouter = require("express").Router();
const { getUserByID } = require("../controllers/users");

usersRouter.get("/:username", getUserByID);
module.exports = usersRouter;
