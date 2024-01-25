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
      console.log(req.body);
      // {
      //   affiliate: "nasa",
      //   query: "Mars Rover!"
      // }
    }
    // Do not edit above this line
    if(req.method === 'GET' && req.url === '/static/index.css'){
        const responseBody = fs.readFileSync('index.css', 'utf-8')
        res.statusCode =  200;
        res.setHeader('Content-Type', 'text/css')
        return res.end(responseBody)
    }

    if (req.method === "GET" && req.url === "/") {
      const htmlPage = fs.readFileSync("index.html", "utf-8");

      let commentList = "";

      for (const comment of comments) {
        commentList += `<li>${comment}</li>`;
      }

      const responseBody = htmlPage.replace(
        /#{comments}/g,
        commentList ? commentList : `<li>No comments created</li> `
      );
      res.statusCode = 200;
      res.setHeader("Content-Typ", "text/html");
      return res.end(responseBody);
    }

    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;

      comments.push(comment)

      res.statusCode = 302;
      res.setHeader('Location', '/')
      return res.end()
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Page Not Found");
  });
});

const port = 5000;
server.listen(port, () => console.log(`listening to port ${port}`));
