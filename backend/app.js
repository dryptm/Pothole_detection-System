const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({
  origin: true
}));
var locations=[];
var schema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
});
var Location = mongoose.model("Location", schema);

app.get("/", function (req, res) {
  res.send("hello");
})
app.get("/api/:lat/:long", function (req, res) {
  // let bodydata=JSON.parse(req.body)
  console.log("-------------------------------------------------------");
  var a = parseFloat(req.params.lat);
  var b = parseFloat(req.params.long);
  let location1 = new Location({
    latitude: a,
    longitude: b
  });
  locations.push(location1);
  // res.send(req.params);
  console.log(locations);
})

mongoose.connect('mongodb://127.0.0.1:27017/location', {useNewUrlParser: true,useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("database connected!!!!");
});
app.listen(process.env.PORT || 5000, function () {
  console.log("Server started on port 5000");
});