const express = require("express");
const bodyParser = require("bodyP-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json()); //middleware for parsing request bodies
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
