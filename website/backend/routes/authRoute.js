const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const {
  registerController,
  loginController,
  forgotPasswordController,
  uploadController,
  predictController,
  viewController,
  priorityController,
  deleteController,
  countController,
} = require("../controllers/authController.js");
const fileUpload = require("express-fileupload");

//router object
const router = express.Router();

//routing
//register | method POST
router.post("/register", registerController);

//login | method POST
router.post("/login", loginController);

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
  predictController
);

//view route
router.post("/viewcategory", requireSignIn, viewController);

//update priority route
router.post("/updatepriority", requireSignIn, priorityController);

//delete complaint route
router.post("/deletecomplaint", requireSignIn, deleteController);

//get complaint counts controller
router.post("/getcount", countController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
