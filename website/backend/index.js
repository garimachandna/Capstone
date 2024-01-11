const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const cors = require("cors");
const path = require("path");

//configure env
dotenv.config();

//database config
console.log(process.env.MONGO_URL);
connectDB();

var allowCrossDomain = function (req, res, next) {
  console.log("allowCrossDomain");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    console.log("OPTIONS SUCCESS");

    res.send(200);
  } else next();
};

//rest object
const app = express();

app.use(allowCrossDomain);

//middlewares
// app.use(
//   cors()
//   //   {
//   //   origin: "https://shikayat-frontend.vercel.app",
//   //   methods: ["GET", "POST"],
//   //   credentials: true, // enable set cookie
//   //   allowedHeaders: ["Content-Type", "Authorization", "Origin", "X-Auth-Token"],

//   //   optionsSuccessStatus: 200,
//   //   maxAge: 86400, // 24 hours
//   //   exposedHeaders: ["Authorization, X-Auth-Token, Origin, Content-Type"],
//   // }
// );
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to shikayat app</h1>");
});

app.get("/api/login", (req, res) => {
  res.send("<h1>Welcome to shikayat login page</h1>");
});

//port
const port = process.env.PORT || 8080;

//listen
app.listen(port, () => {
  console.log(
    `Server started on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
