const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/User");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);


module.exports = router;


