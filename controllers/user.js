const { User } = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  const token = setUser(user); // jwt token
  // res.cookie("uid", sessionId);
  // res.cookie("uid", token , www.google.com); we can pass domain here else current domain le lega
  // res.cookie("uid", token , .google.com); can visit any subdomian of google

  res.cookie("token", token);
  return res.redirect("/");
  // return res.json({ token });
}

module.exports = { handleUserSignup, handleUserLogin };
