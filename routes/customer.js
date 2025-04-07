const express = require("express");
const {handleCreateCustomer,handleDeleteCustomer,handleUpdateCustomerVehicle,handleUpdateCustomer,handleGetCustomer} = require("../controller/customer");
const {handleCreateJobCard, handleCancelJobCard, handleUpdateJobCardStatus} = require("../controller/jobCard");
const {handleCreateInvoice, handleUpdateInvoiceStatus} = require("../controller/invoice");
const router = express.Router();


router.post("/create",handleCreateCustomer);
router.delete("/delete/:id",handleDeleteCustomer);
router.get("/fetchAll",handleGetCustomer)
router.patch("/update/:id",handleUpdateCustomer);
router.patch("/updateVehicle/:id",handleUpdateCustomerVehicle);
router.post("/createJobCard/:cusId/vehicle/:vehId",handleCreateJobCard);
router.patch("/updateJobCardStatus/:JobCardId",handleUpdateJobCardStatus);
router.patch("/cancelJobCard/:JobCardId",handleCancelJobCard);
router.post("/createInvoice/:JobCardId",handleCreateInvoice);
router.patch("/updateInvoicePayment/:InvoiceId",handleUpdateInvoiceStatus)



module.exports = router;