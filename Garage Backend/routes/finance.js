const express = require("express");
const router = express.Router();
const {handleUpdateProductOrders} = require("../controller/finance");
const { handleGetAllInvoices } = require("../controller/invoice");
const { handleGetAllPOs } = require("../controller/inventory");


router.patch('/updateProductOrders/:POid',handleUpdateProductOrders);
router.get("/getAllInvoices",handleGetAllInvoices);
router.get("/PO/fetchAll",handleGetAllPOs);

module.exports = router;