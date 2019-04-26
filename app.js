const {
  handleCustomErrors,
  handlePsqlErrors,
  ServerError500
} = require("./errors/index.js");

const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(ServerError500);

module.exports = app;

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).send({ msg: "internal server error" });
// });
