const express = require("express");
const app = express();
const route = express.Router();
var controller = require("./customer.controller");

route.get("/", controller.getAll);
