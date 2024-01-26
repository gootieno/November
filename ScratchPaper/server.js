const http = require("http");
const fs = require("fs");

const users = ["john", "jane"];

const server = http.createServer((req, res) => {
  // Do not edit above this line
  if (req.method === "GET" && req.url === "/static/scratch.js") {
    const responseBody = fs.readFileSync("scratch.js", "utf-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/javascript");
    return res.end(responseBody);
  }

  if (req.method === "GET" && req.url === "/") {
    const responseBody = fs.readFileSync("scratch.html", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Typ", "text/html");
    return res.end(responseBody);
  }

  if (req.method === "GET" && req.url === "/users") {
    const responseBody = JSON.stringify({ users });

    res.statusCode = 200;
    res.setHeader("Content-Typ", "text/html");
    return res.end(responseBody);
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  return res.end("Page Not Found");
});

const port = 5000;
server.listen(port, () => console.log(`listening to port ${port}`));
