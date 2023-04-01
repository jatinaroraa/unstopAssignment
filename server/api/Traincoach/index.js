const { Router } = require("express");
const express = require("express");
const app = express();
const route = express.Router();
const controller = require("./traincoach.controller");

route.get("/getAll", controller.getAll);
route.post("/create", controller.create);

module.exports = route;
