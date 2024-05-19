const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const { type } = require("os");
const app = express();

const PORT = 8000;

//DB Connection
mongoose
  .connect("mongodb://localhost:27017/userInfo")
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Mongodb error ", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("This is middleware 1");
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});
app.use((req, res, next) => {
  console.log("This is middleware 2");
  next();
});

//Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
      <ul>
          ${allDbUsers
            .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
            .join("")}
      </ul>
      `;
  res.send(html);
});

//Rest API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  // res.setHeader("X-myName", "Sujeet Ghodke");
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    //Edit the user with edit
    await User.findByIdAndUpdate(req.params.id, {
      firstName: "Captain",
      lastName: "JackSparrow",
    });
    return res.json({ status: "Success" });

    // let id = Number(req.params.id);
    // let toUpdate = users.find((el) => el.id === id);
    // let index = users.indexOf(toUpdate);
    // Object.assign(toUpdate, req.body);
    // users[index] = toUpdate;
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "Successfully update", user: toUpdate });
    // });
  })

  .delete(async (req, res) => {
    //Delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });

    // const id = Number(req.params.id);
    // const toDelete = users.find((el) => el.id === id);
    // const index = users.indexOf(toDelete);
    // // console.log(index);

    // users.splice(index, 1);

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "Successfully Deleted", id: id });
    // });
  });

app.post("/api/users", async (req, res) => {
  //To create new users
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required.." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  console.log("Result : ", result);

  return res.status(201).json({ msg: "Success" });
});

app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`);
});
