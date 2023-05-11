const express = require("express");
let router = express.Router();

let {
  newProduct,
  deleteProduct,
  allProducts,
  updateProduct,
} = require("../controllers/controllers.js");

const upload = require("../multerConfig/storageConfig")


router.post("/addProduct",upload.single('image'), newProduct);
router.get("/allProducts", allProducts);
router.put("/updateProduct/:id",upload.single('image'), updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
