const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ditdntn.mongodb.net/MTPM`
    );

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
