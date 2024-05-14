const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();

const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

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
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit the user with edit
    return res.join({ status: "Pending" });
  })
  .delete((req, res) => {
    //Delete user with id
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  //To create new users
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`);
});
