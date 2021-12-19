const express = require("express");
const myPokeModel = require("./models/my_poke_models");
const pokeListModel = require("./models/poke_list_models");
const data = require("./data.json");
const mongo = require("mongodb");
const app = express();
var cors = require('cors');

app.post("/add_poke", cors(), async (request, response) => {
  let rowSame = 0;
  let myPoke = request.body;

  const myPokemon = await myPokeModel.find({});
  myPokemon.forEach((element) => {
    let poke = element.nickname.split("-");
    if (poke[0] == myPoke.nickname) {
      nickname = poke[0] + "-" + rowSame;
      myPokeModel.findByIdAndUpdate(
        element._id,
        { $set: { nickname: nickname } },
        { new: true }
      );
      rowSame += 1;
    }
  });

  if (rowSame > 0) {
    myPoke.nickname = myPoke.nickname + "-" + rowSame;
  }

  const addPoke = new myPokeModel(myPoke);
  try {
    await addPoke.save();
    response.send(myPokemon);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/my_poke", cors(), async (request, response) => {
  const myPoke = await myPokeModel.find({});
  try {
    response.send(myPoke);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/poke_list", cors(), async (request, response) => {
  let pokeList = await pokeListModel.find({});
  try {
    if (pokeList.length == 0) {
      data.results.forEach((element) => {
        const pokeListSave = new pokeListModel(element);
        pokeListSave.save();
      });
      pokeList = await pokeListModel.find({});
      const result = {
        count: pokeList.length,
        next: null,
        previous: null,
        results: pokeList,
      };
      response.send(result);
    } else {
      const result = {
        count: pokeList.length,
        next: null,
        previous: null,
        results: pokeList,
      };
      response.send(result);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/poke_detail/:id", cors(), async (req, response) => {
  var o_id = new mongo.ObjectID(req.params.id);
  let pokeDetail = await pokeListModel.findOne({ _id: o_id });
  try {
    let status = Math.random() * 100;
    const result = {
      statusGatcha: status > 50 ? true : false,
      data: pokeDetail,
    };
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
