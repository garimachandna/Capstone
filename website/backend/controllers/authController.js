const userModel = require("../models/userModel.js");
const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");
const path = require("path");
const complaintModel = require("../models/userComplaints.js");
const accidentModel = require("../models/accident.js");
const kidnapModel = require("../models/kidnap.js");
const murderModel = require("../models/murder.js");
const rapeModel = require("../models/rape.js");
const theftModel = require("../models/theft.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //validations
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Please enter all fields",
        success: false,
      });
    }

    const users = userModel.User;
    //check user
    const existingUser = await users.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //register user
    const user = await users.create({
      name,
      email,
      password: hashedPassword,
      role: role,
    });

    //send response
    return res.status(201).send({
      message: "User registered successfully",
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    res.status(500).send({
      message: "Error in registering user",
      success: false,
      error: err.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
      return res.status(400).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    const users = userModel.User;
    //check user
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User does not exist",
        success: false,
      });
    }

    //check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        message: "Invalid Password",
        success: false,
      });
    }

    //create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      message: "User logged in successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    res.status(500).send({
      message: "Error in login",
      success: false,
      error: err.message,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    //validations
    if (!email) {
      return res.status(400).send({
        message: "Please enter email",
        success: false,
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        message: "Please enter new password",
        success: false,
      });
    }

    //check
    const users = userModel.User;
    const user = await users.findOne({ email });

    //validation
    if (!user) {
      return res.status(400).send({
        message: "Invalid email or answer",
        success: false,
      });
    }

    const hashed = await hashPassword(newPassword);
    await users.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const uploadController = async (req, res) => {
  try {
    var myFile = req.files.myFile;
    console.log("after\n ", myFile);

    // Object.keys(file).forEach(function (key) {

    //add file to the database | complaint model | complaintSchema corresponding to the specific user
    const complaints = complaintModel.Complaint;

    // add this complaint to the complaint array of the user
    const result = await complaints.findOneAndUpdate(
      { user: req.user._id },
      { $push: { complaint: myFile } },
      { new: true }
      //   (err, result) => {
      //     if (err) {
      //       return res.status(422).json({ error: err });
      //     } else {
      //       return res.json(result);
      //     }
      //   }
    );

    if (!result) {
      const complaint = await complaints.create({
        user: req.user._id,
        complaint: myFile,
      });
    }
    //send response
    // alert("File uploaded successfully");
    return res.status(200).send({
      message: "Complaint registered successfully",
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const complaintController = async (req, res) => {
  try {
    var myComplaint = req.complaint;
    var category = req.category;
    var user = req.user;
    var name = req.name;
    var address = req.address;
    var phone = req.phone;

    console.log("name\n ", name);
    console.log("address\n ", address);
    console.log("phone\n ", phone);
    console.log("complaint\n ", myComplaint);
    console.log("category\n ", category);

    // Object.keys(file).forEach(function (key) {

    //add file to the database | complaint model | complaintSchema corresponding to the specific user
    const models = {
      accident: accidentModel,
      murder: murderModel,
      kidnap: kidnapModel,
      rape: rapeModel,
      theft: theftModel,
    };

    const model = models[category];
    const complaints = model.Complaint;

    const complaint = await complaints.create({
      user: user,
      complaint: myComplaint,
      name: name,
      address: address,
      phone: phone,
    });

    //send response
    // alert("File uploaded successfully");
    return res.status(200).send({
      message: "Complaint categorized successfully",
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const predictController = async (req, res) => {
  const { spawn } = require("child_process");
  console.log(req.body);
  const inputData = req.body.complaintData.complaintText;
  const inputName = req.body.complaintData.name;
  const inputaddress = req.body.complaintData.address;
  const inputphone = req.body.complaintData.phone;

  const user = req.user._id;
  console.log("input data to predict controller", inputData);

  let predictionVal = "";
  const predictedCategory = ["theft", "accident", "kidnap", "murder", "rape"];
  const child = spawn("python", ["predict.py", inputData]);

  child.stdout.on("data", (data) => {
    console.log("python data: ", data.toString());
    predictionVal = data.toString()[1];
  });
  child.stderr.on("data", (data) => {
    console.error(`child stderr:\n${data}`);
  });
  child.on("close", (code, signal) =>
    console.log(`process closed: code ${code} and signal ${signal}`)
  );
  child.on("exit", function (code, signal) {
    console.log(
      "child process exited with " + `code ${code} and signal ${signal}`
    );
  });

  setTimeout(() => {
    console.log("predictionVal: ", predictionVal);
    // convert string to int
    let index = predictionVal - "0";
    console.log("index: ", index);

    // call complaintController here
    complaintController(
      {
        user: user,
        prediction: predictionVal,
        category: predictedCategory[index],
        complaint: inputData,
        name: inputName,
        address: inputaddress,
        phone: inputphone,
      },
      res
    );

    // res.status(200).send({
    //   message: "Prediction successful",
    //   success: true,
    //   user: user,
    //   prediction: predictionVal,
    //   category: predictedCategory[index],
    //   complaint: inputData,
    // });
  }, 7000);

  // Use the model to make predictions from our inputData
  // const prediction = model.predict(inputData);

  // Send back the prediction as a response
  // res.json({ prediction });
};

const viewController = async (req, res) => {
  const { category } = req.body;
  console.log(category);

  const models = {
    accident: accidentModel,
    murder: murderModel,
    kidnap: kidnapModel,
    rape: rapeModel,
    theft: theftModel,
  };

  const model = models[category];
  const cidcomplaints = model.Complaint;

  // store all complaints from the database in this variable

  const complaints = await cidcomplaints.find();
  console.log(complaints);
  res.status(200).send({
    complaints: complaints,
    success: true,
  });
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  uploadController,
  predictController,
  complaintController,
  viewController,
};
