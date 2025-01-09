const express = require("express");
const router = express.Router();
const { createOrder, updateOrderStatus } = require("../controllers/Order");

router.post("/", createOrder);

router.put("/:id", updateOrderStatus);

module.exports = router;
