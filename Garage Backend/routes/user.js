const express = require("express");
const {handleCreateUser,handleDeleteUser, handleGetAllUsers, handleGetMe} = require("../controller/user");
const router = express.Router();


router.post("/create",handleCreateUser);
router.delete("/delete/:id",handleDeleteUser);
router.get("/fetchAll",handleGetAllUsers);




module.exports = router;