import { User } from "../db";

async function userMiddleware(req, res, next) {
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
}

module.exports = userMiddleware;
