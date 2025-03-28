const express = require("express");
const {handleAddProduct,handleDeleteProduct,handleUpdateProduct} = require("../controller/inventory");
const router = express.Router();


router.post("/add",handleAddProduct);
router.delete("/delete/:id",handleDeleteProduct);
router.patch("/update/:id",handleUpdateProduct);
module.exports = router;