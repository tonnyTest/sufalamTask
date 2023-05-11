const mongoose = require("mongoose");

const connectToDB = () =>
mongoose
    .connect("mongodb://localhost:27017/productMgt")
    .then(() => {
    console.log("DB CONNECTED");
    })
    .catch(() => {
    console.log("ERROR IN DB CONNECTION");
    });

module.exports = connectToDB;


