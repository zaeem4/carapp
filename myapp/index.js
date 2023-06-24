const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGODB } = require("./config.js");
const cars = require("./controller/cars");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/cars", cars.getAll);
app.post("/car", cars.insert);
app.post("/update-car-value", cars.updateVaue);
app.get("/car/:id", cars.getById);

app.get("/", (req, res) => {
  res.send("running");
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log("Database Connected");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
