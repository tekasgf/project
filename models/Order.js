const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, // Индекс по user_id
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total_price: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Shipped", "Delivered", "Cancelled"], index: true }, // Индекс по статусу заказа
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);

