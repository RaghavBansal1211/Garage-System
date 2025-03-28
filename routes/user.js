const express = require("express");
const {handleCreateUser,handleDeleteUser} = require("../controller/user");
const router = express.Router();


router.post("/create",handleCreateUser);
router.delete("/delete/:id",handleDeleteUser);



module.exports = router;