const { createHmac, randomBytes } = require("crypto");

// CREATE HASH
const hashPassword = async (password) => {
  try {
    const salt = process.env.SALT;

    const hashed = createHmac("sha256", salt).update(password).digest("hex");
    return hashed;
  } catch (err) {}
};


// COMPARE PASSWORD HASH
const comparePassword = async (hash, password) => {
  try {
    const userProvidedHash = await hashPassword(password);

    if (hash == userProvidedHash) {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
};

module.exports = {
  hashPassword,
  comparePassword,
};
