const express = require("express");
const { Router } = require("express");
const router = express.Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middlewares/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  if (!(username && password))
    return res.status(403).json({ msg: "Username and password required" });

  //check for existing user
  const existingUser = await User.findOne({ username });

  if (existingUser)
    return res.status(400).json({ msg: "Username is already taken" });

  await User.create({
    username,
    password,
  });

  res.status(200).json({
    msg: "User created successfully",
  });
});

router.post("/signin", async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({
    username,
    password
  });
  if(user){
      const token = jwt.sign({username}, JWT_SECRET);
      res.json({
        token
      });
  }else{
    res.status(411).json({msg : "incorrect username and password"});
  }
})

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});

  res.status(200).json({
    courses: allCourses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers.username;
  const courseId = req.params.courseId;

  try {
    await User.updateOne(
      {
        username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );

    res.json({ msg: "Purchase complete" });
  } catch (err) {
    res.status(500).json({ msg: "internal server error", error: err.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;

  const user = await User.findOne({ username });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });
});

module.exports = router;
