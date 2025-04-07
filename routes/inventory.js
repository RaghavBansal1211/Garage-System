const express = require("express");
const {handleAddProduct,handleDeleteProduct,handleUpdateProduct,raisePO, handleGetLowQuantityProducts} = require("../controller/inventory");
const router = express.Router();


router.post("/add",handleAddProduct);
router.delete("/delete/:id",handleDeleteProduct);
router.patch("/update/:id",handleUpdateProduct);
router.post("/raisePO",raisePO);
router.get("/lowQuantity",handleGetLowQuantityProducts);
module.exports = router;