const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../controllers/Product");

router.get("/", getAllProducts);

router.post("/", addProduct);

module.exports = router;
