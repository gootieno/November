window.addEventListener("DOMContentLoaded", async () => {
  await getComments();
  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const commentInput = document.getElementById("comment");
    const comment = commentInput.value;
    console.log("comment after submit ", comment);

    const response = await fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    const data = await response.json();
    console.log("data after response ", data);

    commentInput.value = "";
    addComment(data.comment);
  });
});
const addComment = (comment) => {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = comment;
  ul.appendChild(li);
};
const getComments = async () => {
  const response = await fetch("/comments");
  const { comments } = await response.json();

  for (const comment of comments) {
    addComment(comment);
  }
};
