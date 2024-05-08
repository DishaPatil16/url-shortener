const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./connect");
const { URL } = require("./models/url");
const {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
} = require("./middlewares/auth");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Not connected to MongoDb", err));

app.use(express.json()); // parse data into req body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); // all my ejs files are in this folder
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   //   return res.end(
//   //     //to avoid this html rendering we use templating engine EJS
//   //     `
//   //             <html>
//   //                 <head>
//   //                 </head>
//   //                 <body>
//   //                     <ol>
//   //                         ${allUrls
//   //                           .map(
//   //                             (url) =>
//   //                               `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}}</li>`
//   //                           )
//   //                           .join("")}
//   //                     </ol>
//   //                 </body>
//   //             </html>
//   //         `
//   return res.render("home", {
//     urls: allUrls,
//   });
//   //   );
// });

// app.use("/url", restrictToLoggedinUserOnly, urlRoute); // inline middleware
// app.use("/", checkAuth, staticRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
