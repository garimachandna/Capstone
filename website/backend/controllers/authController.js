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
const { count } = require("console");
const csv = require("fast-csv");

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
    const { email, newpassword } = req.body;
    // console.log("req.body: ", req.body);
    // console.log("email: ", email);
    // console.log("newPassword: ", newPassword);
    //validations
    if (!email) {
      return res.status(400).send({
        message: "Please enter email",
        success: false,
      });
    }
    if (!newpassword) {
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

    const hashed = await hashPassword(newpassword);
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

    data = myFile.data.toString("utf8");
    data = data.split("\n");

    csv
      .parseString(myFile.data, { headers: true })
      .on("data", async (row) => {
        // Extract fields from the CSV row
        const details = Object.values(row);

        // Display the individual fields
        var name = details[1];
        var address = details[2];
        var phone = details[3];
        var complaint = details[4];
        console.log("details\n ", details);
        const complaintData = {
          complaintText: complaint,
          name: name,
          address: address,
          phone: phone,
        };

        const user = req.user;

        console.log("complaintData\n ", complaintData);

        await predictController(
          {
            user: user,
            body: { complaintData },
          },
          res
        );
      })
      .on("end", () => {
        console.log("CSV string successfully processed.");
        res.status(200).send({
          success: true,
          message: "File uploaded successfully",
        });
      })
      .on("error", (error) => {
        console.error("Error parsing CSV:", error.message);
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
    // return res.status(200).send({
    //   message: "Complaint categorized successfully",
    //   success: true,
    // });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    // res.status(500).send({
    //   success: false,
    //   message: "Something went wrong",
    //   error: err.message,
    // });
  }
};

const directPredictController = async (req, res) => {
  try {
    await predictController(req, res);

    res.status(200).send({
      message: "Prediction successful",
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: e.message,
    });
  }
};

const predictController = async (req, res) => {
  const { spawn } = require("child_process");
  // console.log("req ", req);
  // console.log(req.body);
  const inputData = req.body.complaintData.complaintText;
  const inputName = req.body.complaintData.name;
  const inputaddress = req.body.complaintData.address;
  const inputphone = req.body.complaintData.phone;

  const user = req.user._id;
  // console.log("user: ", user);
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

  try {
    setTimeout(async () => {
      console.log("predictionVal: ", predictionVal);
      // convert string to int
      let index = predictionVal - "0";
      console.log("index: ", index);

      // call complaintController here
      await complaintController(
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
    }, 15000);
  } catch (e) {
    console.log("error in predict controller ", e);
  }

  // Use the model to make predictions from our inputData
  // const prediction = model.predict(inputData);
  // res.json({ prediction });

  // Send back the prediction as a response
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
  //store all the complaints where priority = false in complaints, true in prioritycomplaints
  const complaints = await cidcomplaints
    .find({ priority: false })
    .sort({ _id: -1 });
  const prioritycomplaints = await cidcomplaints
    .find({ priority: true })
    .sort({ _id: -1 });
  console.log(complaints);
  console.log(prioritycomplaints);
  res.status(200).send({
    complaints: complaints,
    prioritycomplaints: prioritycomplaints,
    success: true,
  });
};

const priorityController = async (req, res) => {
  const { category, id } = req.body;
  console.log("printing here ", category, id);
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

  try {
    const originalcomplaint = await cidcomplaints.findOne({ _id: id });
    // console.log("original complaint ", originalcomplaint);
    console.log("original priority: ", originalcomplaint.priority);

    let complaint = await cidcomplaints.findOneAndUpdate({ _id: id }, [
      { $set: { priority: { $not: "$priority" } } },
    ]);

    complaint = await cidcomplaints.findOne({ _id: id });

    // console.log("changed complaint, ", complaint);
    console.log("changed priority: ", complaint.priority);

    console.log("priority update successfully");
    res.status(200).send({
      complaint: complaint,
      success: true,
    });
  } catch (error) {
    console.log("Couldnot update priority, ", error);
  }
};

const deleteController = async (req, res) => {
  const { category, id } = req.body;
  console.log("printing here ", category, id);
  const models = {
    accident: accidentModel,
    murder: murderModel,
    kidnap: kidnapModel,
    rape: rapeModel,
    theft: theftModel,
  };

  const model = models[category];
  const cidcomplaints = model.Complaint;

  try {
    await cidcomplaints.deleteOne({ _id: id });
    console.log("Deleted Successfully");
    res.status(200).send({
      success: true,
      message: "Complaint deleted from database",
    });
  } catch (e) {
    console.log("Deleted Unsuccessful");
    res.status(400).send({
      success: false,
      message: "Complaint not deleted",
    });
  }
};

const countController = async (req, res) => {
  let counts = [0, 0, 0, 0, 0];
  const models = {
    accident: accidentModel,
    murder: murderModel,
    kidnap: kidnapModel,
    rape: rapeModel,
    theft: theftModel,
  };

  try {
    let model = models["accident"];
    let cidcomplaints = model.Complaint;
    counts[0] = await cidcomplaints.count();

    model = models["kidnap"];
    cidcomplaints = model.Complaint;
    counts[1] = await cidcomplaints.count();

    model = models["murder"];
    cidcomplaints = model.Complaint;
    counts[2] = await cidcomplaints.count();

    model = models["rape"];
    cidcomplaints = model.Complaint;
    counts[3] = await cidcomplaints.count();

    model = models["theft"];
    cidcomplaints = model.Complaint;
    counts[4] = await cidcomplaints.count();
    res.status(200).send({
      success: true,
      message: "Complaint count fetched",
      count: counts,
    });
  } catch (e) {
    console.log("couldnot fetch complaints count");
    res.status(400).send({
      success: false,
      message: "Complaint count not fetched",
    });
  }
};

const searchController = async (req, res) => {
  const { keyword, category, ispriority, sortOption, filterType, filter } =
    req.body;
  console.log(
    "printing here ",
    category,
    keyword,
    ispriority,
    sortOption,
    filterType,
    filter
  );
  const models = {
    accident: accidentModel,
    murder: murderModel,
    kidnap: kidnapModel,
    rape: rapeModel,
    theft: theftModel,
  };

  const model = models[category];
  const cidcomplaints = model.Complaint;
  try {
    let complaints = [];
    if (sortOption === "newest") {
      if (filterType === "name") {
        complaints = await cidcomplaints
          .find({
            $and: [
              { complaint: { $regex: keyword, $options: "i" } },
              { name: { $regex: filter, $options: "i" } },
              // { address: { $regex: filter, $options: "i" } },
            ],

            priority: ispriority,
          })
          .sort({ _id: -1 });
      } else {
        complaints = await cidcomplaints
          .find({
            $and: [
              { complaint: { $regex: keyword, $options: "i" } },
              // { name: { $regex: filter, $options: "i" } },
              { address: { $regex: filter, $options: "i" } },
            ],

            priority: ispriority,
          })
          .sort({ _id: -1 });
      }
    } else {
      if (filterType === "name") {
        complaints = await cidcomplaints
          .find({
            $and: [
              { complaint: { $regex: keyword, $options: "i" } },
              { name: { $regex: filter, $options: "i" } },
              // { address: { $regex: keyword, $options: "i" } },
            ],

            priority: ispriority,
          })
          .sort({ _id: 1 });
      } else {
        complaints = await cidcomplaints
          .find({
            $and: [
              { complaint: { $regex: keyword, $options: "i" } },
              // { name: { $regex: filter, $options: "i" } },
              { address: { $regex: filter, $options: "i" } },
            ],

            priority: ispriority,
          })
          .sort({ _id: 1 });
      }
    }
    //if sortOption= newest , sort in descending order of id else ascending
    console.log(complaints);

    console.log("Found Complaints Successfully");
    res.status(200).send({
      success: true,
      message: "Complaint retrieved from database",
      complaints: complaints,
    });
  } catch (err) {
    console.log("Search Unsuccessful");
    res.status(400).send({
      success: false,
      message: "Complaint could not be found",
      error: err,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  uploadController,
  directPredictController,
  predictController,
  complaintController,
  viewController,
  priorityController,
  deleteController,
  countController,
  searchController,
};
