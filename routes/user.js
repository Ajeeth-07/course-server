const express = require("express");
import userMiddleware  from "../middlewares/user";
import { User } from "../db";
const router = express.Router();

module.exports = router;