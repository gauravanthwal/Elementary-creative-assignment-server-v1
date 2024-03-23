const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  loginUser,
} = require("./user.controller");
const router = Router();

// CREATE USER
router.post("/signup", createUser);

// LOGIN USER
router.post("/login", loginUser);


//-------------- TO-DO --------------//

// UDATE USER INFO

////////////////////////////// ROUTES JUST FOR TESTING ///////////////////////////////////

router.get("/all", getAllUsers);

module.exports = router;
