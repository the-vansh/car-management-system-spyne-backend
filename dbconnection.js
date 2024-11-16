const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vansh123:VANSH_CAR@cluster0.k3ixs.mongodb.net/");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
