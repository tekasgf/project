const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Получение заказов пользователя (только авторизованные)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).populate("items.product");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Создание заказа
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { items } = req.body;
        const total_price = items.reduce((acc, item) => acc + item.quantity * 10, 0);

        const order = new Order({ user: req.user.userId, items, total_price });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
