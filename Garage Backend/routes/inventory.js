const express = require("express");
const {handleAddProduct,handleDeleteProduct,handleUpdateProduct,raisePO, handleGetLowQuantityProducts, handleGetAllProducts, handleGetAllPOs} = require("../controller/inventory");
const router = express.Router();

router.post("/add",handleAddProduct);
router.delete("/delete/:id",handleDeleteProduct);
router.patch("/update/:id",handleUpdateProduct);
router.post("/raisePO",raisePO);
router.get("/lowQuantity",handleGetLowQuantityProducts);
router.get("/fetchAll",handleGetAllProducts);
router.get("/PO/fetchAll",handleGetAllPOs);

module.exports = router;