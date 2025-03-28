const express = require("express");
const {handleCreateCustomer,handleDeleteCustomer,handleUpdateCustomerVehicle,handleUpdateCustomer} = require("../controller/customer");
const {handleCreateJobCard} = require("../controller/jobCard");
const router = express.Router();


router.post("/create",handleCreateCustomer);
router.delete("/delete/:id",handleDeleteCustomer);
router.patch("/update/:id",handleUpdateCustomer);
router.patch("/updateVehicle/:id",handleUpdateCustomerVehicle);
router.post("/createJobCard/:cusId/vehicle/:vehId",handleCreateJobCard);


module.exports = router;