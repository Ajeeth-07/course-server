const express = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Router } = require("express");
const { Admin, Course } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!(username && password))
    return res.status(400).json({ msg: "username and password is required" });

  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    msg: "Admin created successfully",
  });
});

router.post("/signin", async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const admin = await Admin.find({
    username,
    password
  });
  if(admin){
    const token = jwt.sign({username}, JWT_SECRET);
    res.json({
      token
    })
  } else{
    res.status(411).json({msg : "Incorrect username and password"});
  }

})

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  console.log(newCourse);
  res
    .status(200)
    .json({ msg: "Course created successfully", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});

  res.json({
    courses: response,
  });
});

module.exports = router;
