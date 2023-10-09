const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = 10; // await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    process.exit(1);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
