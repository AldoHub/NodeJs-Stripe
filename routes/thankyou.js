const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/thankyou", (req, res, next)=>{
  res.render("thankyou");
   
});


module.exports = router;