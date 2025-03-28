const express = require("express");
const {handleUserLogin} = require("../controller/login");
const router = express.Router();


router.post("/login",handleUserLogin);


module.exports = router;