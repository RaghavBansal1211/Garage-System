const express = require("express");
const { handleGetMe } = require("../controller/reload");
const router = express.Router();

router.get("/me",handleGetMe)

module.exports = router;