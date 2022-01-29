// required modules
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// setup enviroment variables
require("dotenv").config();

// DB setup
const mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app configuration
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
   // res.sendFile(path.join(__dirname, "/views/index.html"));
   res.render("index");
});

// routes
app.get("/api", (req, res) => {
   res.send("Hello API")
})

// server activation
const listener = app.listen(process.env.PORT || 3000, () => {
   console.log("Your app is listening on port " + listener.address().port);
});
