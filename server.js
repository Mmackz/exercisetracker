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
app.use(bodyParser.urlencoded({ extended: false }));

// DB controllers
const user_controller = require("./controllers/userController");
const exercise_controller = require("./controllers/exerciseController");

// routes
app.get("/", (req, res) => {
   res.render("index");
});

app.get("/api/users", user_controller.user_get);

app.post("/api/users", user_controller.user_create_post);

app.post("/api/users/:id/exercises", exercise_controller.exercise_create_post);

app.get("/api/users/:id/logs", exercise_controller.exercise_logs_get);

// server activation
const listener = app.listen(process.env.PORT || 3000, () => {
   console.log("Your app is listening on port " + listener.address().port);
});
