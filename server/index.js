require("dotenv").config({ debug: process.env.DEBUG });

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes.js");
const connectToDB = require("./libs/mongoose");

const app = express();
app.use(express.json());
app.use("/",express.static("./files"));
// app.use("/files",express.static("./public/files"));

connectToDB();

const PORT = process.env.PORT || 8000

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//My Routes
app.use("/", routes);

//Server Listening Port
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
