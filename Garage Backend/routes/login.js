const express = require("express");
const {handleUserLogin, handleUserLogout} = require("../controller/login");
const router = express.Router();


router.post("/login",handleUserLogin);
router.get("/logout",handleUserLogout);


module.exports = router;