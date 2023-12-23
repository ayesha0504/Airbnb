var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb+srv://team5_wpl:team5_wpl@cluster0.9k2tjc0.mongodb.net/flybnb');
const auth = require('./middleware/auth');
var collection = db.get('user');

router.get('/',function(req,res) {
    collection.find({},function(err,users) {
      if(err) throw err;
      res.json(users);
    });
});

router.get('/:id',function(req,res) {
    collection.find({_id: req.params.id},function(err,user) {
        if(err) throw err;
        res.json(user);
    });
})

//INSERT
router.post('/',function(req,res) {
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

//UPDATE
router.put('/:id',function(req,res) {
    collection.update({_id: req.params.id}, {$set : {
      name : req.body.name,
      email : req.body.email,
      login_id : req.body.login_id,
      favorites : req.body.favorites,
    }},
    function(err,user) {
        if(err) throw err;
        res.json(user);
      });
});

//DELETE
router.delete('/:id', function(req,res){
    collection.remove({_id : req.params.id}, function(err,user){
        if(err) throw err;
        res.json(user);
    });
});



module.exports = router;
