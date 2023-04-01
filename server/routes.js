module.exports = function (app) {
  app.use("/traincoach", require("./api/Traincoach"));
  app.use("/trainSeats", require("./api/trainseats"));
};
