const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb+srv://e-commerce:48KvZhHLojUJTw8V@e-commerce.wt21bzu.mongodb.net/ecommerce")

    console.log("connect to DB ");
}

module.exports = connectDB;