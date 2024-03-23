const { verifyToken } = require("../common/validation/createToken");

const authUser = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1];

    // CHECK IF TOKEN PROVIDED
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // VERIFY TOKEN
    const user = verifyToken(token);

    // CHECK IF TOKEN VALID
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating new order",
    });
  }
};

module.exports = { authUser };
