var express = require('express');
var router = express.Router();


var jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const bcrypt = require("bcrypt");

var monk = require('monk');
var db = monk('mongodb+srv://team5_wpl:team5_wpl@cluster0.9k2tjc0.mongodb.net/flybnb');

var collection = db.get('login');

router.get('/welcome', auth.verifyToken, function (req, res) {
  res.send("Welcome!!");
});

router.post('/signup', function (req, res) {
  const username=req.body.username;
  const email=req.body.email;
  const password=req.body.password;
  const name=req.body.name;
  const userType = req.body.userType;

  if (!(username && email && password)) {
    res.send({ message: "All fields are required!" });
  } else {
    collection.findOne({ $or: [{ email: email }, { username: username }] }, function (err, user) {
      if (err) throw err;

      if (user) {
        res.send({ message: "User already exists. Please login!" });
      } else {
        bcrypt.hash(password, 10, function (err, hash) {
          let password = hash;
          let newUser = {
            username,
            email,
            password,
            name,
            userType
          }
          collection.insert(newUser, function (err, user) {
            if (err) throw err;
            
            res.send({message:"signup successful. go to Login page to login"});

          });
         });

      }
    });
  }
});

router.post('/login', function (req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.send({ message: "All fields are required!" });
  } else {

    //TODO-decrypt the password properly
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;
      if (user == null) {
        res.send({ message: "User doesn't exist" });
      } else {
        bcrypt.compare(password, user.password, function(err, result) {
          if(result) {
              var token = jwt.sign({ user_id: user._id, email }, 'secretkey');
              user.token = token;
              res.json(user);
            } else {
              res.send({ message: "User email or password is incorrect!" });
            }
        });
        
      }
    })
  }
});

module.exports = router;