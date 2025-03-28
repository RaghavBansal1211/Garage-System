const express = require("express");
const {handleCreateCustomer,handleDeleteCustomer,handleUpdateCustomerVehicle,handleUpdateCustomer} = require("../controller/customer");
const router = express.Router();


router.post("/create",handleCreateCustomer);
router.delete("/delete/:id",handleDeleteCustomer);
router.patch("/update/:id",handleUpdateCustomer);
router.patch("/updateVehicle/:id",handleUpdateCustomerVehicle);


module.exports = router;