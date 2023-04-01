const Coach = require("./traincoach.model");

const getAll = async (req, res) => {
  //here
  let find = await Coach.find({});
  return res.json(find);
};
const create = async (req, res) => {
  try {
    let body = req.body;

    //for testing purpose
    let trainData = new Coach({
      trainName: "unstop",
      trainNumber: 1234,
      coachNumber: 1,
    });

    trainData.save();
    return res.json("saved");
  } catch (error) {
    return res.status(404).json(error);
  }
};
module.exports = {
  getAll,
  create,
};
