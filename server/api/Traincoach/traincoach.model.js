const mongoose = require("mongoose");
//here I used schema as name user
const trainCoach = new mongoose.Schema({
  trainName: { type: String },
  trainNumber: { type: Number },
  coachNumber: { type: Number },
});

module.exports = mongoose.model("tainCoach", trainCoach);
