mongoose = require("mongoose");
colors = require("colors");
path = require("path");
dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const connectDB = async () => {
  try {
    console.log(
      "connecting to database",
      path.resolve(__dirname, "../.env"),
      process.env
    );
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify:false
    });
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
