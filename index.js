const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  //   console.log("New Request Received..");
  const log = `${Date.now()} : ${req.url} new Request received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("hello from server ");
        break;
      case "/about":
        res.end("Hello my name is Sujeet Ghodke");
        break;
      default:
        res.end("404 page not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server started !");
});
