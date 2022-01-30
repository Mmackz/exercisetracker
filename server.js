// required modules
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// setup enviroment variables
require("dotenv").config();

// DB setup
const mongoDB = "mongodb+srv://MsCluster:MsCluster@cluster0.eejrd.mongodb.net/exercisetracker?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app configuration
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// DB controllers
const user_controller = require("./controllers/userController");

// routes
app.get("/", (req, res) => {
   res.render("index")
});

app.post("/api/users", user_controller.user_create_post);

// server activation
const listener = app.listen(process.env.PORT || 3000, () => {
   console.log("Your app is listening on port " + listener.address().port);
});
