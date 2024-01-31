// Your code here

window.addEventListener('DOMContentLoaded', (e) => {
  // alert('DOM LOADED')


  // <input value="red"></input>

  // create the event on the input
  // input.value
  // if input.value === 'red'
  // input.style.backgroundColor === 'red'
  const redInput = document.getElementById('red-input')

  const changeRed = e => {
    if(redInput.value === 'red'){
      redInput.style.backgroundColor = 'red';
    } else {
      redInput.style.backgroundColor = 'transparent'
    }
  }

  redInput.addEventListener('input', changeRed);

  const addLi = e => {
    let li = document.createElement("li")
    let input = document.getElementById("list-add")
    li.innerText = input.value
    let ul = document.querySelector("ul")
    ul.appendChild(li)
  }

  let add = document.getElementById("add-item")
    add.addEventListener('click', addLi);


      const colorSelect = document.getElementById('color-select');
  const colorSel = e => {
    colorSelect.parentElement.style.backgroundColor = colorSelect.value
  }

  colorSelect.addEventListener('change', colorSel);

  const removeBtn = document.getElementById('remove-listeners');

  removeBtn.addEventListener('click', e => {
    redInput.removeEventListener('input', changeRed);
    add.removeEventListener('click', addLi);
    colorSelect.removeEventListener('change', colorSel)
  })

  const button = document.createElement('button');
  button.innerText = 'Add listeners back';
  document.body.append(button);

  button.addEventListener('click', e => {
    redInput.addEventListener('input', changeRed);
    add.addEventListener('click', addLi);
    colorSelect.addEventListener('change', colorSel);
  })

})
