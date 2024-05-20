const express = require("express");
// const users = require("./MOCK_DATA.json");
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//DB Connection
connectMongoDb("mongodb://localhost:27017/userInfo").then(() =>
  console.log("MongoDb Connected Successfully :)")
);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`);
});
