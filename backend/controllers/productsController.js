const Product = require("../models/Products");
const User = require("../models/Users");

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits." });
  }
};

exports.getSellers = async (req, res) => {
  try {
    const sellers = await User.findAll({
      where: { role: "seller" },
      attributes: ["id", "username"],
    });

    res.status(200).json({ sellers });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: "Failed to fetch sellers" });
  }
};

// Créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, image, sellerId } = req.body;

    if (!name || !price || !sellerId) {
      return res
        .status(400)
        .json({ error: "Name, price, and seller ID are required." });
    }

    const seller = await User.findByPk(sellerId);
    if (!seller || seller.role !== "seller") {
      return res.status(400).json({ error: "Invalid seller ID." });
    }

    const product = await Product.create({
      name,
      price,
      stock,
      image,
      sellerId,
    });
    res.status(201).json({ message: "Product added successfully.", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product." });
  }
};

// Modifier un produit
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Produit non trouvé." });
    product.stock = stock || product.stock;
    await product.save();

    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la modification du produit." });
  }
};
