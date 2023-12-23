var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb+srv://team5_wpl:team5_wpl@cluster0.9k2tjc0.mongodb.net/flybnb');
const auth = require('./middleware/auth');
var collection_prop = db.get('property');
var collection = db.get('login');


router.get('/',function(req,res) {
    collection.findOne({username:req.headers.username},function(err,users){
        collection_prop.find({property_id:{$in: users.favourites}},function(err,docs) {
            if(err) throw err;
            res.json(docs);
          });
   });
    
});

router.post('/', function(req, res) {
    
	collection.findOneAndUpdate({ username:req.headers.username },{
        $push: {favourites: req.headers.property_id}
    }, function (err, user) {
        if(err) throw err;
        res.send({message:"added successfully"});
      });
});

/*
//INSERT
router.post('/',function(req,res) {
    collection.findOne({ username: req.body.property_id }, function (err, user) {
		if (err) throw err;
    collection.insert({
      name : req.body.name,
      email : req.body.email,
      login_id : req.body.login_id,
      favorites : req.body.favorites,
    },function(err,user) {
        if(err) throw err;
        res.json(user);
      });
});
*/


//DELETE
router.delete('/:id', function(req,res){
    collection.findOneAndUpdate({username:req.headers.username},
        {$pull: {favourites: req.params.id}},
         function(err,doc){
        if(err) throw err;
        res.send({message:"deleted successfully"});
    });
});


module.exports = router;