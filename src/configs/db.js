const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose
  .connect(process.env.mongoUrl)
  .then(() => {
    console.log(`Connected to Database`);
  })
  .catch((e) => {
    console.log("Connection with DB failed");
    console.log(e);
  });
module.exports = { connection };
