const { User } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
/* async function userMiddleware(req, res, next) {
  try {
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.findOne({ username, password });

    if (user) {
      next();
    } else {
      res.status(403).json({
        msg: "User doesnt exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
} */

  function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({ msg: "token expired" });
    }
  }

module.exports = userMiddleware;
