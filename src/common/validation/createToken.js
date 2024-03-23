const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  try {
    const secret = process.env.JWT_SECRET;

    const payload = {
      _id: user?._id,
      email: user?.email,
    };

    const token = jwt.sign(payload, secret);
    return token;
  } catch (err) {}
};

const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;

    const payload = jwt.verify(token, secret);

    return payload;
  } catch (err) {}
};

module.exports = { createToken, verifyToken };
