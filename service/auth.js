// const sessionIdToUserMap = new Map(); //here we are maintaining a state at backend
// this is diary maintained by valet at parking
const jwt = require("jsonwebtoken");
const secret = "DishantP@2131";

// function setUser(id, user){
//     sessionIdToUserMap.set(id , user);
// };
function setUser(user) {
  // ye hamare liye token banayega
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  ); // jsike pass ye secret he yahi token banayega
}

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret); // verify kiya gaya hai token ke baad usme data mil
  } catch (error) {
    return null;
  }
}

module.exports = {
  getUser,
  setUser,
};
