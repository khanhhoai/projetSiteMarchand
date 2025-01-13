const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Inscription d'un utilisateur
router.post("/register", usersController.registerUser);

// Connexion d'un utilisateur
router.post("/login", usersController.loginUser);
router.put("/update", usersController.updateUser);
router.get("/", usersController.getAllUsers);
router.put("/:id/role", usersController.updateUserRole);

module.exports = router;
