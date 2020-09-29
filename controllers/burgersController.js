let express = require("express");

let router = express.Router();

let burger = require("../models/burger.js");

router.get("/", function(req, res){
    burger.all(function(data){
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
console.log(req)
burger.create([
    "name", "eaten"
], [
    req.body.name, false
], function(result){

    res.json({ id: result.insertId});
});
});

router.put("/api/burger/:id", function(req, res){
    let condition = "id" + req.params.id;

    console.log("condition", condition);

    burger.update({
        eaten: req.body.eaten
    }, condition, function(result){
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    let condition = "id" + req.params.id;

    burger.delete(condition, function(result){
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;