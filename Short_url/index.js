const express = require("express");
const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 4001;

connectToMongoDb("mongodb://localhost:27017/short-url").then(
  console.log("Mongodb connected :)")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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
