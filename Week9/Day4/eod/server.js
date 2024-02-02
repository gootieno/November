const http = require("http");
const fs = require("fs");

const comments = [];

const server = http.createServer((req, res) => {
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      // affiliate=nasa&query=Mars+Rover%21
      if (req.headers["content-type"] === "application/json") {
        req.body = JSON.parse(reqBody);
      } else {
        req.body = reqBody
          .split("&") // [affiliate=nasa,query=Mars+Rover%21]
          .map((keyValuePair) => keyValuePair.split("=")) // [[affiliate,nasa],[query,Mars+Rover%21]]
          .map(([key, value]) => [key, value.replace(/\+/g, " ")]) // [[affiliate,nasa],[query,Mars Rover%21]]
          .map(([key, value]) => [key, decodeURIComponent(value)]) // [[affiliate,nasa],[query,Mars Rover!]]
          .reduce((acc, [key, value]) => {
            // [[affiliate,nasa],[query,Mars Rover!]]
            acc[key] = value;
            return acc;
          }, {});
      }
      console.log(req.body);
      // {
      //   affiliate: "nasa",
      //   query: "Mars Rover!"
      // }
    }
    // Do not edit above this line
    if (req.method === "GET" && req.url === "/static/index.css") {
      const responseBody = fs.readFileSync("index.css", "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/static/index.js") {
      const responseBody = fs.readFileSync("index.js", "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/") {
      const responseBody = fs.readFileSync("index.html", "utf-8");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/comments") {
      const responseBody = comments;

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ comments: responseBody }));
    }

    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;

      comments.push(comment);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ comment }));
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Page Not Found");
  });
});

const port = 5000;
server.listen(port, () => console.log(`listening to port ${port}`));
