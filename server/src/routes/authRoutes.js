const express = require("express");
const cors = require("cors");
const { register } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

module.exports = router;