const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/check-session", authController.checkSession);

module.exports = router;
