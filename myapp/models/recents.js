const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema({
  value: Number,
  car: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
  created_on: { type: Date, default: Date.now },
  modified_on: { type: Date, default: Date.now },
});
module.exports = mongoose.model("recents", recentSchema);
