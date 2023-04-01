const mongoose = require("mongoose");
//here I used schema as name user
const trainSeats = new mongoose.Schema({
  coach: {
    _id: {},
    coachNumber: {},
  },
  seatNumber: { type: Number },
  seatRow: { type: String },
  customer: {
    name: { type: String },
    _id: {},
    mobileNumber: { type: Number },
  },
  status: { type: String },
  createdOn: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("seats", trainSeats);
