const trainSeats = require("./trainseats.model");

let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "k"];

const getAllSeats = async (req, res) => {
  try {
    let query = [
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
  for (let i = 0; i < seats.length; i++) {
    //simple case to alot in row
    if (seats[i].availableSeats >= totalSeat) return seats[i];
  }
  //for find two row sum
  for (let i = 0; i < seats.length - 1; i++) {
    //simple case to alot in row
    if (seats[i].availableSeats + seats[i + 1].availableSeats >= totalSeat)
      return seats[i];
  }
  //worst case when seats empty on too gap
  for (let i = 0; i < seats.length; i++) {
    //simple case to alot in row
    for (let j = i; j < seats.length; j++) {
      if (seats[i].availableSeats + seats[j].availableSeats >= totalSeat)
        return seats[i];
    }
  }
};
const alotEmptySeats = async (seats) => {
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
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];
  let data = await trainSeats.aggregate(query);
  let findSeat = await findNearestSeat(data, seats);
  console.log(findSeat, "aggregate");
  return data;
};

const bookSeats = async (req, res) => {
  try {
    let body = req.body;
    console.log(body, "body");
    let total = await alotEmptySeats(body.totalSeats);
    return res.json(total);
    // let bookSeats =
  } catch (error) {
    console.log(error, "error in booking seats");
  }
};

//script to save seats
const seatsScript = async (req, res) => {
  try {
    let seats = [
      { number: 1, status: "available" },
      { number: 2, status: "available" },
      { number: 3, status: "available" },
      { number: 4, status: "available" },
      { number: 5, status: "available" },
      { number: 6, status: "available" },
      { number: 7, status: "available" },
    ];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < seats.length; j++) {
        let saveData = new trainSeats({
          coach: {
            _id: "64289fcc2c64cdf60a11d3e8",
            coachNumber: 1,
          },
          seatNumber: seats[j].number,
          seatRow: rows[i],
          customer: {},
          createdOn: Date.now(),
          status: seats[j].status,
        });
        await saveData.save();
        console.log(saveData.seatNumber, saveData.seatRow, "saved");
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = {
  getAllSeats,
  bookSeats,
  seatsScript,
};
