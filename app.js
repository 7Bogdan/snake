const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const sanitize = require("mongo-sanitize");
let bcrypt = require("bcrypt");

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useUnifiedTopology: true,
});

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("usersdb").collection("logins");
  app.listen(3030, function () {
    console.log("Сервер ожидает подключения...");
  });
});

app.get("/api/users", function (req, res) {
  let collection = req.app.locals.collection;
  collection
    .find({})
    .sort({ score: -1 })
    .limit(10)
    .toArray(function (err, users) {
      if (err) return console.log(err);
      res.send(users);
    });
});

app.get("/api/user?:id", function (req, res) {
  let id = new objectId(req.params.id);
  let collection = req.app.locals.collection;
  collection.findOne({ _id: id }, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.post("/api/users", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let user = req.body;
  let userName = sanitize(user.name);
  let userToken = hash(user.name);
  let userList = {
    name: userName,
    token: userToken,
    score: 0,
    lvl:0
  };

  let collection = req.app.locals.collection;
  collection.insertOne(userList, function (err, result) {
    if (err) return console.log(err);
    res.send(userList);
  });
});

app.put("/api/user", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let user = req.body;
  let _id = new objectId(user._id);
  let userName = sanitize(user.name);
  let userScore = sanitize(user.score);
  let userToken = sanitize(user.token);
  let userLvl = sanitize(user.lvl);

  let collection = req.app.locals.collection;
  collection.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        name: userName,
        score: userScore,
        token: userToken,
        lvl: userLvl,
      },
    },
    { returnOriginal: false },
    function (err, result) {
      if (err) return console.log(err);
      let userList = result.value;
      res.send(userList);
    }
  );
});

function hash(obj) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(obj, salt);
  return hash;
}

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
