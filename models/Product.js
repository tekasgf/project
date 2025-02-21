const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true }, // Индекс по названию товара
    description: String,
    price: { type: Number, required: true },
    category: { type: String, index: true }, // Индекс по категории товаров
    stock: { type: Number, required: true, default: 0 },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);

