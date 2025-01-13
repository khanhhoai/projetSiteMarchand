const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getAllProducts);
router.get("/sellers", productsController.getSellers);
router.post("/create", productsController.createProduct);
router.put("/:id", productsController.updateStock);

module.exports = router;
