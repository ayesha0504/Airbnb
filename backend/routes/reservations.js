var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://team5_wpl:team5_wpl@cluster0.9k2tjc0.mongodb.net/flybnb");
var collection = db.get('reservations');
var collection_prop=db.get('property');

/*
4 Api End Points are listed below:
*/

//1. List all reservations using user_id in query parameter of URL
router.get('/', function(req, res) {
collection.find({username:req.headers.username}, function(err, reservations){
	if (err) throw err;
	res.json(reservations);
})
});

// 2. Show individual reservation based on object id
router.get('/:id', function(req, res) {
collection.find({ _id: req.params.id }, function(err, reservation){
if (err) throw err;
  res.json(reservation);
});
});

// 3. Add individual reservation passing user_id from URL query parameter
router.post('/:id', function(req, res) {

collection.find({property_id:req.params.id},
	{$match:{  
		$or:[
		{start_date:{
            $lt: new Date(req.body.startdate)}},
		{end_date:{
			$lt:new Date(req.body.startdate)}}]
		}}, 
	function(err,there){
		if(err) throw err
		if(!there){
			console.log(there);
 
			res.send({ message: " dates are unavailable" });
		}
		else{
			collection.insert({
				property_id: req.params.id,
				start_date:  new Date(req.body.startdate),
				end_date: new Date(req.body.enddate),
				username: req.body.username
				}, function(err, reservation){
				if (err) throw err;
				// if insert is successfull, it will return newly inserted object
				   res.send({ message: " booked succesfully" });
				});

		}
	})

});


router.delete('/', function(req,res){

	collection.findOne({_id:req.headers.object_id},function(err,users){
	  if(err)  throw err;

	 var user_reserved_date = new Date(users.start_date)
	 
	  var calc = new Date()
	  var Difference_In_Time = user_reserved_date.getTime() - calc.getTime();
	  console.log("Difference_In_Time" + Difference_In_Time)
  
	  // Difference  between the days
	  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	  console.log("Difference_In_Days"+Difference_In_Days)
	  
	  if(Difference_In_Days > 2){
	  collection.remove({_id:req.headers.object_id}, function(err,user){
		if(err) throw err;
		res.send({ message: "Cancelled reservation successfully "});
	  });
	}else{
	  res.send({ message: "Sorry you can't cancel your reservation"});
	}
	   
  });
  
  });
  


module.exports = router;