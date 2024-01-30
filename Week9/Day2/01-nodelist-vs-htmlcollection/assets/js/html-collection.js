export default () => {
  const bodyChildElements = document.body.children; // HTMLCollection [div]
  console.log(bodyChildElements);

  const div = bodyChildElements[0];

  const divChildElements = Array.from(div.children); // HTMLCollection [span]
  
  for(let i = 0; i < divChildElements.length; i++){
    const span = document.createElement('span')
    span.innerText = `${i+1}`

    if(i === 1000) break
    div.appendChild(span)
  }

  const helloWorld = div.innerText; // Hello World! Yes!    <-- NOT Hello World!
  const span = divChildElements[0]; // <span>Yes!</span>
  // debugger
};