const { getUser } = require("../service/auth");
// ye middleware tabhi chalega if req is on /url route

function checkForAuthentication(req, res, next) {
  //AUTHENTICATION
  // const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
  if (!tokenCookie) return next();

  // const token = authorizationHeaderValue.split("Bearer ")[1];
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

//admin ,
function restrictTo(roles) {
  //AUTHORIZATION
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1]; // "Bearer [23irenaier24]"
//   // const user = getUser(userUid);
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid; // jwt token is taken from cookies
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1]; // "Bearer [23irenaier24]"

//   // const user = getUser(userUid);
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

// module.exports = { restrictToLoggedinUserOnly, checkAuth };

module.exports = {
  checkForAuthentication,
  restrictTo,
};
