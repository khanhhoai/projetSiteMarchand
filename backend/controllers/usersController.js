const User = require("../models/Users");
const { Op } = require("sequelize");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password });
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (err) {
    console.error("Error during user registration:", err);
    res
      .status(500)
      .json({
        error:
          "An error occurred while creating the account. Please try again.",
      });
  }
};

exports.updateUser = async (req, res) => {
  const { id, username, email, address, password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.email = email;
    user.address = address;

    if (password) {
      user.password = password;
    }

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
};
//////////////////////////// for admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.ne]: "admin", // Op.ne is used to exclude users with role 'admin'
        },
      },
    });
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users." });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params; // Get the user ID from the route parameter
  const { role } = req.body; // Get the role from the body (either 'seller' or 'user')

  // Log the input data for debugging
  console.log("Request received for user ID:", id);
  console.log("Requested role:", role);

  // Validate if the role is either 'seller' or 'user'
  if (!role || !["seller", "user"].includes(role)) {
    return res
      .status(400)
      .json({ error: "Invalid role. Role must be 'seller' or 'user'." });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;

    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (err) {
    console.error("Error updating user role:", err); // Log the error for debugging
    res.status(500).json({ error: "Error updating user role" });
  }
};

// Connexion
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    res.json({ message: "Connexion réussie.", user });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la connexion de l'utilisateur." });
  }
};
