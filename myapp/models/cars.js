const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  name: String,
  type: String,
  color: String,
  value: [{ date: { type: Date }, amount: { type: Number } }],
  price: Number,
  max_speed: Number,
  image: String,
  created_on: { type: Date, default: Date.now },
  modified_on: { type: Date, default: Date.now },
});
carsSchema.index({ name: "text", type: "text", color: "text" });
module.exports = mongoose.model("cars", carsSchema);
