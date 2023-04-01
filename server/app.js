const express = require("express");
const app = express();
const route = express.Router();
const mongoose = require("mongoose");
const config = require("./config/development");
const bodyParser = require("body-parser");
const connection = mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("connection sucess");
  })
  .catch((err) => {
    console.log(err, "db error");
  });
app.use(bodyParser.json());

require("./routes")(app);
app.listen(3000, () => {
  console.log("lisening");
});
