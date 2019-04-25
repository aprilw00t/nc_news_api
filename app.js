const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

// app.use((err, req, res, next) => {
//   if (err.status) res.status(err.status).send({ msg: err.msg });
//   else next(err);
// });
