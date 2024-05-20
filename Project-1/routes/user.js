const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

//Routes
// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//         <ul>
//             ${allDbUsers
//               .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
//               .join("")}
//         </ul>
//         `;
//   res.send(html);
// });

//Rest API

// let id = Number(req.params.id);
// let toUpdate = users.find((el) => el.id === id);
// let index = users.indexOf(toUpdate);
// Object.assign(toUpdate, req.body);
// users[index] = toUpdate;
// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//   return res.json({ status: "Successfully update", user: toUpdate });
// });

//Delete user with id

// const id = Number(req.params.id);
// const toDelete = users.find((el) => el.id === id);
// const index = users.indexOf(toDelete);
// // console.log(index);

// users.splice(index, 1);

// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//   return res.json({ status: "Successfully Deleted", id: id });
// });
