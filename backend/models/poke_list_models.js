const mongoose = require("mongoose");

const PokeListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  }
});

const PokeList = mongoose.model("PokeList", PokeListSchema);

module.exports = PokeList;