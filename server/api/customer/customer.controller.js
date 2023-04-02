const customerModel = require("./customer.model");

const getAll = async () => {
  //here
};
const registerUser = async (userData) => {
  try {
    let user = await customerModel.findOneAndUpdate(
      { mobileNumber: userData.mobileNumber },
      { totalSeats: userData.totalSeats }
    );
    if (user) {
      return user;
    }
    let newUser = new customerModel({
      name: userData.name,
      mobileNumber: userData.mobileNumber,
      totalSeats: userData.totalSeats,
    });
    newUser.save();
    return newUser;
  } catch (error) {
    console.log(error, "error in user creation");
    return null;
  }
};

module.exports = {
  getAll,
  registerUser,
};
