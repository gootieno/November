// Your code here

/*
create http server
- require packages etc. 

create server instance
    - get response body
    - set headers
    - set status code
    - return res body (res.end())

open port 

listen to port
*/
const http = require("http");

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/'){
        const responseBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World!</title>
        </head>
        <body>
          <h1>Hello there!</h1>
        </body>
        </html>
      `;
    
       res.statusCode = 200; 
       res.setHeader('content-type', 'text/html')
       return res.end(responseBody)
    }
    
    res.statusCode = 404
    res.setHeader('content-type', 'text/plain')
    res.end('Page Not Found! :) ')
});

const port = 5000;
server.listen(port, () => console.log(`running on port ${port}`));
