if (!fetch) {
  var fetch = require("./test/node-fetch")(1);
}

/**
 * Do not change code above this line.
 * See README.md for instructions

 ******************************************************************************/

// Your code here

// const getColors = async () => {
//   const response = await fetch("/colors/1", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ color: "green" }),
//   });

//   const data = await response.json();
//   console.log(data);
// };

const getColors = () => {
  fetch("/colors/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ color: "green" }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

getColors();
