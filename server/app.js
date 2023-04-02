const express = require("express");
const app = express();
const route = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/development");
const bodyParser = require("body-parser");
const path = require("path");
const connection = mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("connection sucess");
  })
  .catch((err) => {
    console.log(err, "db error");
  });
app.use(cors());
app.use(bodyParser.json());

require("./routes")(app);

app.use(express.static(__dirname + "/unstopProject"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/unstopProject/index.html"));
});
route.get("/", (req, res) => {
  console.log("hit home");
});
app.listen(3000, () => {
  console.log("lisening");
});
