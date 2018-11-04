const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", (req, res, next)=>{
  
      const items = Item.find({}, (err, items)=>{
           if(err){
               console.log(err);
           }else{
               res.render("items", {items: items});
           }
      })
    
   
});


module.exports = router;