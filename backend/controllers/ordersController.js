const Orders = require("../models/Orders");
const Users = require("../models/Users");

exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    if (!userId || !products || !totalPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("Creating order:", { userId, products, totalPrice });

    const newOrder = await Orders.create({
      userId,
      products,
      status: "pending",
      totalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Orders.findAll({ where: { userId } });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    const listOrders = [];
    for (let order of orders) {
      const { dataValues } = order;
      const listProducts = [];
      for (let product of dataValues.products) {
        const sellerId = product.id_seller;
        const seller = await Users.findOne({ where: { id: sellerId } });
        listProducts.push({
          ...product,
          sellerName: seller.username,
        });
      }
      listOrders.push({
        ...dataValues,
        products: listProducts,
      });
    }
    res.status(200).json(listOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.getSellerOrders = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const orders = await Orders.findAll();
    const listOrders = [];
    for (const order of orders) {
      const user = await Users.findOne({ where: { id: order.userId } });
      const products = order.products;
      const sellerProducts = products.filter(
        (product) => product.id_seller === parseInt(sellerId)
      );

      if (sellerProducts.length > 0) {
        listOrders.push({
          ...order.dataValues,
          products: sellerProducts,
          status: order.status,
          username: user.username,
        });
      }
    }

    if (listOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }

    res.status(200).json(listOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders for seller" });
  }
};

//update status

exports.updateProductStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, sellerId, productId } = req.body;
  try {
    const order = await Orders.findByPk(orderId);
    console.log(order);
    const newProducts = order.dataValues.products.map((product) => {
      if (
        (sellerId && product.id_seller === parseInt(sellerId)) || // validate product
        (productId && product.id_product === parseInt(productId)) // cancel product
      ) {
        
        product.status = status || "pending";
      }
      return product;
    });
    await Orders.update({
      products: newProducts,
    }, {where: {id: orderId}});

    res
      .status(200)
      .json({ success: true, message: "Product status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product status" });
  }
};
