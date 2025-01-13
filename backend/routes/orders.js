const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Créer une commande
router.post('/', ordersController.createOrder);

// Obtenir les commandes d'un utilisateur
router.get('/:userId', ordersController.getUserOrders);
router.get('/seller/:sellerId', ordersController.getSellerOrders)
router.put('/:orderId/status', ordersController.updateProductStatus)

module.exports = router;