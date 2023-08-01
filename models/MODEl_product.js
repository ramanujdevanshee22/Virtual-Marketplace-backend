const MONGOOSE = require("mongoose");

const productSchema = MONGOOSE.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = MONGOOSE.model("Product", productSchema);
