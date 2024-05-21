const express = require("express");
const { connectToMongoDb } = require("./connect");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 4001;

connectToMongoDb("mongodb://localhost:27017/short-url").then(
  console.log("Mongodb connected :)")
);

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is Live on Port : ${PORT}`);
});
