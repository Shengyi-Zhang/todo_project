const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error(`Failed connect to database: ${process.env.MONGO_URI}`);
    throw new Error("Failed connect to database");
  }
};

module.exports = connectDB;
