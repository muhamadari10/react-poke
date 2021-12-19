const mongoose = require("mongoose");

const MyPokeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
});

const MyPoke = mongoose.model("MyPoke", MyPokeSchema);

module.exports = MyPoke;