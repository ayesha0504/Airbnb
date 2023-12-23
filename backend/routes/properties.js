
var express = require('express');
var router = express.Router();
const auth = require('./middleware/auth');

/*
	5 Api End Points are listed below:
*/


var monk = require('monk');
var db = monk('mongodb+srv://team5_wpl:team5_wpl@cluster0.9k2tjc0.mongodb.net/flybnb');
var collection = db.get('property');

//1. list all properties
router.get('/', function(req, res) {
	collection.find({available:true}, function(err, property){
		if (err) throw err;
	  	res.json(property);
	});
});

//list my properties
router.get('/my', function(req, res) {
	collection.find({username:req.headers.username}, function(err, property){
		if (err) throw err;
	  	res.json(property);
	});
});

//2. Show one property by Object ID
router.get('/:id', function(req, res) {
	collection.find({ _id: req.params.id }, function(err, property){
		if (err) throw err;
	  	res.json(property);
	});
});

//3. Add new property
router.post('/', function(req, res) {
	//req.body is used to read form input
	collection.findOne({ property_id: req.body.property_id }, function (err, user) {
		if (err) throw err;
  
		if (user) {
		  res.send({ message: "already exists. change properrty id" });
		} else {
	collection.insert({ 
		title: req.body.title,
		category: req.body.category,
		location:req.body.location,
		description: req.body.description,
		price: req.body.price,
		bedrooms: req.body.bedrooms,
		amenities: req.body.amenities,
		//cancellation_policy: req.body.cancellation_policy,
		//Hostrules: req.body.Hostrules,
		username: req.body.username,
		property_id: req.body.property_id,
		cleaning_fee: req.body.cleaning_fee,
		img1:req.body.img1,
		available: true

	}, function(err, property){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.send({message:"added successfully. go to Home page to see changes"});
	});}
});
});

//4. Update existing Property by its Object ID
router.put('/:id', function(req, res) {
	//req.body is used to read form input
	collection.update({property_id: req.body.property_id },
		{ $set: {
			title: req.body.title,
			category: req.body.category,
			location:req.body.location,
			description: req.body.description,
			price: req.body.price,
			bedrooms: req.body.bedrooms,
			amenities: req.body.amenities,
			cleaning_fee: req.body.cleaning_fee

		 }
	}, function(err, property){
		if (err) throw err;
		// if update is successfull, it will return updated object
		res.send({message:"updated successfully. go to Myproperties page to see changes"});
	});
});

//5. Delete existing Property by its Object ID
router.delete('/:id', function(req, res) {
	collection.update({ property_id: req.params.id },
		{ $set: {
			available:false
		 }
	}, function(err, property){
		if (err) throw err;
	  	res.send('delete successful');
	});
});


module.exports = router;