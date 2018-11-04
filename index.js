const express = require("express");
const server = express();

const database = require("./database/connection");
//other imports
const path = require("path");
server.use(express.static( __dirname + "/public"));

const bodyParser= require("body-parser");

//body parser for the params
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

//set the view engine to PUG
server.set("views", path.join(__dirname,"views"));
server.set("view engine", "pug");

const mongoose = require("mongoose");


mongoose.connect(
    database.connection, { useNewUrlParser: true })
  .then(connection => {
    console.log("connection stablished")
  })
  .catch(error => {
    console.log(database);
    console.log({
        error : {
            name : error.name,
            message : error.message,
            errorCode: error.code,
            codeName: error.codeName
        }
    })
  });

const items = require("./routes/items");
const singleItem = require("./routes/singleitem");
const payment  = require("./routes/payment");
const thankyou = require("./routes/thankyou");


server.use("/", items);
server.use("/", singleItem);
server.use("/", payment);
server.use("/", thankyou);


const port = process.env.PORT || 3000;


//create the server
server.listen(port, ()=>{
    console.log("Server is running @ localhost:3000");
});


