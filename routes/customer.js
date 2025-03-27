const express = require("express");
const {handleCreateCustomer,handleUpdateCustomer,handleDeleteCustomer} = require("../controller/customer");
const router = express.Router();


router.post("/",handleCreateCustomer);
router.delete("/delete/:id",handleDeleteCustomer);
router.patch("/update/:id",handleUpdateCustomer);


module.exports = router;