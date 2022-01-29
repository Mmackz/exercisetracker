const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "/views/index.html"));
});

const listener = app.listen(process.env.PORT || 3000, () => {
   console.log("Your app is listening on port " + listener.address().port);
});
