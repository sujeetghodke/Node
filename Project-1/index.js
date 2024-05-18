const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();

const PORT = 8000;

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
app.get("/users", (req, res) => {
  const html = `
      <ul>
          ${users.map((users) => `<li> ${users.first_name}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

//Rest API
app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Sujeet Ghodke");
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit the user with edit
    let id = Number(req.params.id);
    let toUpdate = users.find((el) => el.id === id);
    let index = users.indexOf(toUpdate);
    Object.assign(toUpdate, req.body);

    users[index] = toUpdate;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Successfully update", user: toUpdate });
    });
  })

  .delete((req, res) => {
    //Delete user with id
    const id = Number(req.params.id);
    const toDelete = users.find((el) => el.id === id);
    const index = users.indexOf(toDelete);
    // console.log(index);

    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Successfully Deleted", id: id });
    });
  });

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`);
});
