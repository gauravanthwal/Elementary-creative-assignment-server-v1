const { client } = require("../../../database");
const { createToken } = require("../../common/validation/createToken");
const {
  hashPassword,
  comparePassword,
} = require("../../common/validation/passwordHashed");
const { User } = require("../../models/users.model");

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    // CHECK IF EMAIL ALREADY EXISTS
    const userResult = await User.findOne({ email });

    if (userResult) {
      return res
        .status(400)
        .json({ error: true, message: "User already exist with this email" });
    }

    const user = new User({
      userName,
      email,
      password,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating user profile",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "required field are missing",
      });
    }

    // CHECK IF USER NOT REGISTERED
    const user = await User.findOne({ email });

    if (!user || user?.length == 0) {
      return res
        .status(400)
        .json({ error: true, message: "No user found with this credentials" });
    }

    // COMPARING PASSWORD HASH
    const isPasswordMatched = await comparePassword(user?.password, password);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Credentials" });
    }

    // CREATE JWT TOKEN
    const token = await createToken(user);

    // USER LOGIN SUCCESS
    return res
      .status(200)
      .json({ success: true, message: "Login success", token });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({
      error: true,
      message: "Error occured while creating user profile",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("error: ", err.message);
    res.status(400).json({ error: true, message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
