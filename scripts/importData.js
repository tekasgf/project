require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("../models/Product");

// Подключаемся к базе данных
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Загружаем JSON-файл с товарами
const importProducts = async () => {
    try {
      await Product.deleteMany(); // Очистка базы перед загрузкой
      console.log("🗑 Old products removed");
  
      const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
      await Product.insertMany(products);
      console.log("✅ Products imported successfully!");
      
      mongoose.connection.close();
    } catch (error) {
      console.error("❌ Error importing products:", error);
      mongoose.connection.close();
    }
  };
  
importProducts();
