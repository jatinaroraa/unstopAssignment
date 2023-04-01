const mongoose = require("mongoose");
//here I used schema as name user
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  totalSeats: { type: Number },
});

module.exports = mongoose.model("user", customerSchema);
