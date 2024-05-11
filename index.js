const http = require("http");

const myServer = http.createServer((req, res) => {
  //   console.log("New Request Received..");
  console.log(req.headers);
  res.end("hello from server ");
});

myServer.listen(8000, () => {
  console.log("Server started !");
});
