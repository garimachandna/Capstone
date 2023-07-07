// index.js
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PORT = process.env.PORT || 8080;
const app = express();
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to cid app</h1>");
});

app.get("/api/uploadfile", (req, res) => {
  res.send("<h1>Uploading data</h1>");
});

app.post(
  "/api/uploadfile",
  fileUpload({ createParentPath: true }),
  (req, res) => {
    const { myFile } = req.files;
    console.log("after ", myFile);

    // Object.keys(file).forEach(function (key) {
    const filepath = path.join(__dirname, "uploads", myFile.name);
    myFile.mv(filepath, (err) => {
      if (err)
        return res.status(500).json({
          status: "error",
          message: err,
        });
    });
    // });
    return res.json({
      status: "success",
      message: myFile.toString(),
    });

    // return res.send("Successfully uploaded files");
  }
);

app.listen(PORT, () => {
  console.log(`Server started...`);
});
