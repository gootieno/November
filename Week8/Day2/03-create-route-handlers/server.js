const http = require('http');

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";// affiliate=nasa&query=Mars+Rover%21
  req.on("data", (data) => { 
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => { 
    // Parsing the body of the request
    if (reqBody) { // affiliate=nasa&query=Mars+Rover%21
      req.body = reqBody
        .split("&") // [affiliate=nasa,query=Mars+Rover%21]
        .map((keyValuePair) => keyValuePair.split("=")) // [[affiliate,nasa],[query,Mars+Rover%21]]
        .map(([key, value]) => [key, value.replace(/\+/g, " ")]) // [[affiliate,nasa],[query,Mars Rover%21]]
        .map(([key, value]) => [key, decodeURIComponent(value)]) // [[affiliate,nasa],[query,Mars Rover!]]
        .reduce((acc, [key, value]) => { // [[affiliate,nasa],[query,Mars Rover!]]
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

    // define route handlers here
    if(req.method === "GET" && req.url === '/'){
      /*
        get res body
        set status code
        set header
        return res body
      */
      const responseBody = 'Dog Club'
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')
      return res.end(responseBody)
    }

    if(req.method === 'GET' && req.url.startsWith('/dogs')){
      const dogUrl = req.url
      console.log('dog url ', dogUrl)
      const splitUrl = dogUrl.split('/')
      console.log('split url ', splitUrl)
      const dogId = splitUrl[splitUrl.length - 1] // possible bug here

      const responseBody = `Dog details for dogId: ${dogId}`

      res.statusCode = 200;
      res.setHeader('content-type', 'text/plain')
      return res.end(responseBody)
    }

    if(req.method === "GET" && req.url === '/dogs'){
      /*
        get res body
        set status code
        set header
        return res body
      */
      const responseBody = 'Dog Index'
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')
      return res.end(responseBody)
    }

    if(req.method === "POST" && req.url === '/dogs'){
      const dogId = getNewDogId()

      res.statusCode = 302;
      res.setHeader('location', `/dogs/${dogId}`)
      return res.end()
    }

    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('No matching route handler found for this endpoint');
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));