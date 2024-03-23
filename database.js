const mongoose = require("mongoose");

const MONGO_URI = process.env.DATABASE_URI;


const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = { connectDB };
