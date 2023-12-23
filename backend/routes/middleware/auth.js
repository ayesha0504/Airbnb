const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token  || req.headers["x-access-token"];

    if(!token) {
        res.send("Token is required for authentication");
    } else {
        try {
            var decoded = jwt.verify(token, 'secretkey');
            req.user=decoded;
            console.log(decoded);
            return next();
        } catch(err) {
            return res.send("Invalid token!!")

        }
    }
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.user_id === req.params.id || req.user.isHost) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isHost) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };

module.exports = {verifyToken, verifyUser, verifyAdmin};