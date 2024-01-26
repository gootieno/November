const button = document.getElementById("click-me");

const getUsers = async () => {
  const response = await fetch("/users"); // method && url

  console.log(response.status);

  const { users } = await response.json();

  return users;
};

button.addEventListener("click", async () => {
  const users = await getUsers();

  for (const user of users) {
    const username = document.createElement("p");
    username.innerText = user;
    document.body.append(username);
  }
});
