const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const cors = require("cors");
const {
  registerController,
  loginController,
  forgotPasswordController,
  uploadController,
  // predictController,
  viewController,
  priorityController,
  deleteController,
  countController,
  searchController,
  directPredictController,
} = require("../controllers/authController.js");
const fileUpload = require("express-fileupload");

//router object
const router = express.Router();

//routing
//register | method POST
router.post("/register", registerController);

// login | method options
router.options("*", cors());

//login | method POST
router.post("/login", (req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log("!OPTIONS");
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = "86400"; // 24 hours
    headers["Access-Control-Allow-Headers"] =
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
  } else {
    // Process to send this data via email
    // and also save in data base(only for learning)
    console.log("ELSE");
    loginController(req, res, next);
  }
});

//forgot password | method POST
router.post("/forgot-password", forgotPasswordController);

//test route
router.post(
  "/uploadfile",
  requireSignIn,
  fileUpload({ createParentPath: true }),
  uploadController
);

//predict route
router.post(
  "/predict",
  requireSignIn,
  fileUpload({ createParentPath: true }),
  directPredictController
);

//view route
router.post("/viewcategory", requireSignIn, viewController);

//update priority route
router.post("/updatepriority", requireSignIn, priorityController);

//delete complaint route
router.post("/deletecomplaint", requireSignIn, deleteController);

//get complaint counts controller
router.post("/getcount", countController);

//get complaints based on keyword
router.post("/findcomplaints", requireSignIn, searchController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
