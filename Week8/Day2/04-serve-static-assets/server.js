const http = require("http");
const fs = require("fs");

const getContentType = (ext) => {
  switch(ext){ // if(ext === 'xyz)
    case "css":
      return 'text/css'
    case "jpg":
      return 'image/jpg'
    default:  
      return 'text/plain'
  }  
}

const server = http.createServer((req, res) => {
  // Your code here
  if (req.method === "GET" && req.url === "/") {
    const responseBody = fs.readFileSync("./index.html", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(responseBody);
  }

  // replace line 7, 10, and the req.url value for css and images
  // if (req.method === "GET" && req.url === "/static/css/application.css") {
  //   const responseBody = fs.readFileSync(
  //     "./assets/css/application.css",
  //     "utf-8"
  //   );

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/css");
  //   return res.end(responseBody);
  // }

  // if (req.method === "GET" && req.url === "/static/images/dog.jpg") {
  //   const responseBody = fs.readFileSync("./assets/images/dog.jpg");

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "image/jpg");
  //   return res.end(responseBody);
  // }
  if(req.method === 'GET' && req.url.startsWith('/static')){
    console.log('req url ', req.url)

    const splitUrl = req.url.split('/static')
    console.log('split url ', splitUrl)

    const assetPath = `./assets${splitUrl[1]}`
    console.log('asset path ', assetPath)

    const responseBody = fs.readFileSync(assetPath)

    const ext = splitUrl[1].split('.')[1]
    console.log('ext ', ext)

    const contentType = getContentType(ext)

    res.statusCode= 200;
    res.setHeader('Content-Type', contentType)
    return res.end(responseBody)
  }
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
