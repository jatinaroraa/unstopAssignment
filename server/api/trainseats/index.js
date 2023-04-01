const express = require("express");
const app = express();
const route = express.Router();
const controller = require("./trainseats.controller");

route.get("/getAllSeats", controller.getAllSeats);
route.post("/bookSeats", controller.bookSeats);
route.post("/run", controller.seatsScript);
module.exports = route;
