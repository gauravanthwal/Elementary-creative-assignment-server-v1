const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProductById,
  deleteProductById,
} = require("./product.controller");
const { authUser } = require("../../middleware/authUser");
const router = Router();

// CREATE NEW PRODUCT
router.post("/new", authUser, createProduct);

// GET ALL PRODCTS
router.get("/all", getAllProducts);

// GET PRODUCTS BY ID
router.get("/getById/:productId", getProductsById);

// UPDATE PRODUCT BY ADMIN
router.put("/updateProductById/:productId", authUser, updateProductById)

// DELETE PRODUCT BY ADMIN
router.delete("/deleteProductById/:productId", authUser, deleteProductById)


module.exports = router;
