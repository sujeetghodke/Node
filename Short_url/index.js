const express = require("express");
const { connectToMongoDb } = require("./connect");
const path = require("path");

const URL = require("./models/url");

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const PORT = 4001;

connectToMongoDb("mongodb://localhost:27017/short-url").then(
  console.log("Mongodb connected :)")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is Live on Port : ${PORT}`);
});
