/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    const url = data.message; // URL of new dog image
    console.log("url ", url);

    const urlParts = url.split("/");
    console.log("url parts ", urlParts);
    const dogBreed = urlParts[4];
    /*--------------- Get breed (Hint: Parse from URL) ---------------- */
    // Your code here

    /*------------ Create new dog card with the url above ------------- */
    /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
    // Your code here

    /* Add the new dog card as a child to the ul in the .gallery element */
    // Your code here
    /*
            <li>
                <figure>
                    <img src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg" />
                    <figcaption>hound-afghan</figcaption>
                </figure>
            </li>

            1. create/select elements

            2. manipulation
                adding inner text
                giving it an attribute
                styling it

            3. append to live element*
        */
    const container = document.querySelector("ul");

    const li = document.createElement("li");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    // img.setAttribute("src", url);
    img.src = url
    figCaption.innerText = dogBreed;

    figure.append(img, figCaption);
    li.appendChild(figure);

    container.appendChild(li);

  } catch (e) {
    console.log("Couldn't fetch dog :(");
  }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
  /*-------------------- Select the first dog card --------------------- */
  // Your code here
  /*-------------------- Remove the first dog card --------------------- */
  // Your code here
  document.querySelector("ul").children[0].remove()
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
  /*-------------------- Select the last dog card ----------------------- */
  // Your code here
  /*-------------------- Remove the last dog card ----------------------- */
  // Your code here
  const length = document.querySelector("ul").children.length;
  const last = document.querySelector("ul").children[length - 1];
  //   console.log(last);
  last.remove();
});
