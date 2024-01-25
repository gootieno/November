/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============================== Phase 1 ================================ */
/*
  Make a request with fetch request to GET /posts and print the response
  components to the console.
*/

// Your code here
const getPosts = () => {
  return fetch("/posts")
    .then((res) => res.json())
    .then((resBody) => console.log(resBody));
};

getPosts()(async function () {
  const res = await fetch("/posts");
  const body = await res.json();
  console.log(body);
})();

/* =============================== Phase 2 ================================ */
/*
  Make a request with fetch request to POST /posts and print the response
  components to the console.
*/
const createPost = async () => {
  const response = await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "New Post!",
    }),
  });

  const data = await response.json();
  console.log(data);
};

createPost()
