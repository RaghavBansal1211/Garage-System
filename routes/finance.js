const express = require("express");
const router = express.Router();
const {handleUpdateProductOrders} = require("../controller/finance");
const { handleGetAllInvoices } = require("../controller/invoice");


router.patch('/updateProductOrders/:POid',handleUpdateProductOrders);
router.get("/getAllInvoices",handleGetAllInvoices);

module.exports = router;