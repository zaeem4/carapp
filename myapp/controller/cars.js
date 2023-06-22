const cars = require("../models/cars.js");

const getAll = async (req, res) => {
  try {
    const { sort, search, min, max } = req.body;
    const limit =
      min && max
        ? { price: { $gte: min, $lte: max } }
        : min
        ? { price: { $gte: min } }
        : max
        ? { price: { $lte: max } }
        : null;
    const query =
      search && limit
        ? { $text: { $search: search }, limit }
        : search
        ? { $text: { $search: search } }
        : limit
        ? limit
        : {};
    const sorting = sort ? { [`${sort}`]: 1 } : { _id: -1 };

    const carsData = await cars.find(query, null, { sort: sorting });
    res.json({ success: true, cars: carsData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
};

const insert = async (req, res) => {
  try {
    const carsData = await cars.create({
      name: "car",
      color: "pink",
      type: "atlas",
      value: [{ date: Date.now(), amount: 1300 }],
      price: 600,
      max_speed: 300,
      image: "car.png",
    });
    res.json({ success: true, cars: carsData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
};

const updateVaue = async (req, res) => {
  try {
    const { _id, amount } = req.body;
    const doc = await cars.findById(_id);
    doc.value.push({ date: Date.now(), amount: amount });
    await doc.save();
    const carData = await cars.findById(_id);
    res.json({ success: true, car: carData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
};

module.exports = {
  getAll,
  insert,
  updateVaue,
};
