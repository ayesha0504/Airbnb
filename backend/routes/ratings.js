var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb+srv://team5_wpl:team5_wpl@cluster0.9k2tjc0.mongodb.net/flybnb');
const auth = require('./middleware/auth');
var collection = db.get('ratings');

router.get('/:id', function(req, res) {
	collection.find({property_id:req.params.id}, function(err, property){
		if (err) throw err;
	  	res.json(property);
	});
});

//INSERT
router.post('/:id',function(req,res) {
    collection.insert({
      comments : req.body.comments,
      ratings : req.body.ratings,
      username: req.body.username,
      property_id:req.params.id
      
    },function(err,user) {
        if(err) throw err;
        res.send({ message: " comments added succesfully" });
      });
});





module.exports = router;