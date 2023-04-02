const { Router } = require("express");
const express = require("express");
const app = express();
const route = express.Router();
const controller = require("./trainseats.controller");

route.get("/getAllSeats", controller.getAllSeats);
route.get("/resetAll", controller.resetAll);

route.post("/bookSeats", controller.bookSeats);
route.post("/run", controller.seatsScript);
// route.get("/resetAll", controller.resetAll);
module.exports = route;
