var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride= require("method-override");

mongoose.connect("mongodb://localhost/testdata");

var testSchema = new mongoose.Schema({
    name : String,
    age : Number
});

var Test = mongoose.model("Test", testSchema);



/* GET home page. */

router.get('/', function(req, res) {
    Test.find({}, function(err, tests){
        if(err){
            console.log(err);
        } else {
            res.render("index", {tests: tests})
        }

    });
});


router.post('/', function(req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var newTest = {name: name, age: age}

    Test.create(newTest, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});


router.get('/delete/:id', function(req, res) {
    Test.remove({_id:req.params.id}, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }

    });
});



module.exports = router;
