const { registerUser } = require("../customer/customer.controller");
const customerModel = require("../customer/customer.model");
const trainSeats = require("./trainseats.model");

let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "k"];

const getAllSeats = async (req, res) => {
  try {
    let query = [
      {
        $sort: { seatNumber: 1 },
      },
      {
        $group: {
          _id: "$seatRow",
          seats: { $push: { seatNumber: "$seatNumber", status: "$status" } },
        },
      },

      {
        $project: {
          _id: 0,
          row: "$_id",
          seats: "$seats",
        },
      },
      {
        $sort: { row: 1 },
      },
    ];
    let seats = await trainSeats.aggregate(query);
    return res.status(200).json(seats);
  } catch (error) {
    console.log(error, "error in get all");
    return res.status(500).json(error);
  }
  //here
};
const findNearestSeat = async (seats, totalSeat) => {
  // console.log(seats, totalSeat, "total");
  for (let i = 0; i < seats.length; i++) {
    //simple case to alot in row
    if (seats[i].availableSeats >= totalSeat) return [seats[i]];
  }
  //for find two row sum
  for (let i = 0; i < seats.length - 1; i++) {
    //simple case to alot in row

    if (seats[i].availableSeats + seats[i + 1].availableSeats >= totalSeat) {
      return [seats[i], seats[i + 1]];
    }
  }
  //worst case when seats empty on too gap
  for (let i = 0; i < seats.length; i++) {
    //simple case to alot in row
    for (let j = i + 1; j < seats.length - 1; j++) {
      if (seats[i].availableSeats + seats[j].availableSeats >= totalSeat)
        return [seats[i], seats[j]];
    }
  }

  //last case
  let sum = 0;

  for (let i = 0; i < seats.length; i++) {
    sum += seats[i].availableSeats;

    if (sum >= totalSeat) {
      let data = [];
      for (let j = 0; j <= i; j++) {
        data.push(seats[j]);
      }
      return data;
    }
  }
  return null;
};
const alotEmptySeats = async (seats, user) => {
  //   let emptySeats = await trainSeats.find({ status: "available" });
  //   if (!emptySeats.length || seats > emptySeats.length) return 0;
  //set for rowwise
  let query = [
    {
      $match: {
        status: "available",
        // coachNumber: 1,
      },
    },

    {
      $group: {
        _id: "$seatRow",
        availableSeats: { $sum: 1 },
        _ids: { $push: "$_id" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];
  let data = await trainSeats.aggregate(query);
  let findSeat = await findNearestSeat(data, seats);
  console.log(findSeat, "seat available");
  // return;
  if (!findSeat) return [];
  //find and update for a user
  let ids = [];
  for (let i = 0; i < findSeat.length; i++) {
    for (let j = 0; j < findSeat[i]._ids.length; j++) {
      if (ids.length < seats) {
        ids.push(findSeat[i]._ids[j]);
      }
    }
  }

  let setUpdate = {
    customer: {
      name: user.name,
      mobileNumber: user.mobileNumber,
      _id: user._id,
    },
    status: "booked",
  };
  let findAndBook = await trainSeats.collection.updateMany(
    {
      _id: { $in: ids },
    },
    { $set: setUpdate },
    { returnDocument: "after" }
  );

  const updatedDocs = await trainSeats.collection
    .find(
      { _id: { $in: ids } }
      // { seatNumber: 1, seatRow: 1, status: 1, _id: 0 }
    )
    .toArray();
  console.log(findAndBook, updatedDocs, "aggregate");
  return updatedDocs;
};

const bookSeats = async (req, res) => {
  try {
    let body = req.body;
    console.log(body, "body");

    // let user = await customerModel.findOne({mobileNumber:body.mobileNumber})

    let user = await registerUser(body.user);

    let total = await alotEmptySeats(body.user.totalSeats, user);
    return res.status(200).json(total);
    // let bookSeats =
  } catch (error) {
    console.log(error, "error in booking seats");
    return res.status(200).json({ message: "error in bookseats" });
  }
};

//script to save seats
const seatsScript = async (req, res) => {
  try {
    // let seats = [
    //   { number: 1, status: "available" },
    //   { number: 2, status: "available" },
    //   { number: 3, status: "available" },
    //   { number: 4, status: "available" },
    //   { number: 5, status: "available" },
    //   { number: 6, status: "available" },
    //   { number: 7, status: "available" },
    // ];

    let qu = {
      seatRow: { $in: ["J"] },
      seatNumber: 2,
    };

    let result = await trainSeats.collection.updateMany(qu, {
      $set: {
        status: "available",
      },
    });
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log("error", error);
  }
};
const resetAll = async (req, res) => {
  try {
    let update = {
      $set: {
        status: "available",
      },
    };
    let result = await trainSeats.collection.updateMany({}, update);
    //i am not reset customer details as of now
    //it is just for basic assesment
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "error in reset" });
  }
};
module.exports = {
  getAllSeats,
  bookSeats,
  seatsScript,
  resetAll,
};
