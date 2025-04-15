const express = require("express");
const router = express.Router();
const { handleGetAllInvoices, updateInvoiceProductAndPrice } = require("../controller/invoice");


router.get("/getAllInvoices",handleGetAllInvoices);
router.patch("/update/:InvoiceId",updateInvoiceProductAndPrice);


module.exports = router;