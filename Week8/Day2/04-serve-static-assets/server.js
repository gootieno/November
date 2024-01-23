const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  if(req.method === 'GET' && req.url === '/'){
    const responseBody = fs.readFileSync('./index.html', 'utf-8')

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    return res.end(responseBody)
  }

  // replace line 7, 10, and the req.url value for css and images
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));