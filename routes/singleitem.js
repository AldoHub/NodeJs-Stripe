const express = require("express");
const router = express.Router();
const Item = require("../models/Item");


router.get("/item/:id", (req, res, next)=>{
    let id = req.params.id;
    let item = Item.findById(id, (err, item)=>{
        if(err){
            console.log(err);
            return;
        }else{
           
            res.render("singleitem", {item: item});
        }
    });

});


module.exports = router;