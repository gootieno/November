const http = require('http');

const dogs = [
  {
    dogId: 1,
    name: "Fluffy",
    age: 2
  }
];

let nextDogId = 2;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // request is finished assembly the entire request body
    // Parsing the body of the request depending on the Content-Type header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ======================== ROUTE HANDLERS ======================== */

    // GET /dogs
    if (req.method === 'GET' && req.url === '/dogs') {
      // Your code here
      const responseBody = JSON.stringify(dogs)
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      return res.end(responseBody);
    }

    // GET /dogs/:dogId
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/'); // ['', 'dogs', '1']
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        // find dog by dogId
        let dog = dogs.find(dog => dog.dogId === Number(dogId))
        
        // if we dog 
        if(dog){
          // set header
          res.setHeader('Content-Type', 'application/json')
          // write body JSON.stringify(found dog)
          res.write(JSON.stringify(dog))
          res.statusCode = 200;
          // end res
          return res.end()
        }
      }
      return res.end();
    }

    // POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      const { name, age } = req.body;
      // Your code here
      // get new dogId
      const dogId = getNewDogId()
      // make a new dog pojo
      const newDog = {name, age, dogId}
      // add new dog to dogs arr
      dogs.push(newDog)
      // status code
      res.statusCode =201
      // header
      res.setHeader('Content-Type', 'application/json')
      // return str version of new dog
      return res.end(JSON.stringify(newDog));
    }

    // PUT or PATCH /dogs/:dogId
    if ((req.method === 'PUT' || req.method === 'PATCH')  && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        // find the dog 
        const foundDog = dogs.find((dog) => dog.dogId === +dogId) //Number(dogId)
        // update dog name and/or dog age
        if(foundDog){
          const {name, age}= req.body
          if(name) foundDog.name = name
          if(age) foundDog.age = age
          // set status code and header
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json') 
          // send stringify found dog
          return res.end(JSON.stringify(foundDog))
        }
      }
      return res.end();
    }

    // DELETE /dogs/:dogId
    if (req.method === 'DELETE' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here

        
        // find specific dog
        const foundDogIndex = dogs.findIndex((dog) => dog.dogId == dogId)
        console.log('found index ', foundDogIndex)
        // if dog
        if(foundDogIndex >= 0){
          // splice the found dog from the dogs arr
          dogs.splice(foundDogIndex, 1)
          // set header and status code
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200;
          // return delete message end res
          return res.end(JSON.stringify({message: "Successfully deleted"}))
        }
      }
      return res.end();
    }

    // No matching endpoint
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end('Endpoint not found');
  });

});


if (require.main === module) {
    const port = 8000;
    server.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = server;
}