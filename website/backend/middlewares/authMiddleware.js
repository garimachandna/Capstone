const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

//protected routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        message: "Unauthorized Access",
        success: false,
      });
    }
    next();
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    res.status(500).send({
      message: "Error in isAdmin",
      success: false,
      error: err.message,
    });
  }
};

module.exports = { requireSignIn, isAdmin };
