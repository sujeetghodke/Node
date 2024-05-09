const fs = require("fs");

// fs.writeFileSync("./test.txt", "Hey there !");

// fs.writeFile("./test2.txt", "hey this is async !", (err) => {});

// const result = fs.readFileSync("./hello.txt", "utf-8");
// console.log(result);

// fs.readFile("./hello.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// fs.appendFileSync("./hello.txt", "This is node environment\n");

// fs.cpSync("./hello.js", "copy.txt");

// fs.unlinkSync("./test2.txt");

// console.log(fs.statSync("./copy.txt"));
console.log(fs.statSync("./copy.txt").isFile());
