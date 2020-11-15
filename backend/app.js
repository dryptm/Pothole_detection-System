const express = require("express");
const cors=require("cors");

const app = express();
app.use(cors({origin:true}));

 app.get("/",function(req,res){
   res.send("hello");
 })
app.get("/api/:lat/:long",function(req,res){
  // let bodydata=JSON.parse(req.body)
  console.log(req.params);
  var a=parseFloat(req.params.lat);
  console.log(a)
  res.send(req.params);
})

app.listen( 5000, function() {
    console.log("Server started on port 5000");
  });
  