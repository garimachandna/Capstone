const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const cors = require("cors");

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(
  cors({
    origin: ["https://shikayat.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true, // enable set cookie
  })
);
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
  // const customers=[
  //     {id:1,firstName:'John',lastName:'Doe'},
  //     {id:2,firstName:'Brad',lastName:'Traversy'},
  //     {id:3,firstName:'Mary',lastName:'Swanson'}
  // ];
  // res.json(customers);
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

// index.js
// const express = require("express");
// const fileUpload = require("express-fileupload");
// const path = require("path");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// const PORT = process.env.PORT || 8080;
// const app = express();
// var cors = require("cors");

// app.use(cors()); // Use this after the variable declaration
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to cid app</h1>");
// });

// app.get("/api/uploadfile", (req, res) => {
//   res.send("<h1>Uploading data</h1>");
// });

// app.post(
//   "/api/uploadfile",
//   fileUpload({ createParentPath: true }),
//   (req, res) => {
//     const { myFile } = req.files;
//     console.log("after ", myFile);

//     // Object.keys(file).forEach(function (key) {
//     const filepath = path.join(__dirname, "uploads", myFile.name);
//     myFile.mv(filepath, (err) => {
//       if (err)
//         return res.status(500).json({
//           status: "error",
//           message: err,
//         });
//     });
//     // });
//     return res.json({
//       status: "success",
//       message: myFile.toString(),
//     });

//     // return res.send("Successfully uploaded files");
//   }
// );

// app.listen(PORT, () => {
//   console.log(`Server started...`);
// });
