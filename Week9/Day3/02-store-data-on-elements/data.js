// Your code here

window.addEventListener('DOMContentLoaded', () => {

  const input = document.getElementById('name');
  const type = document.getElementById('type');
  const addBtn = document.getElementById('add');
  const list = document.getElementById('shopping-list');


  addBtn.addEventListener('click', e => {
    e.preventDefault();

    const name = input.value;
    const category = type.value;


    const li = document.createElement('li');

    li.innerText = name;
    li.setAttribute('data-type', category);

    list.append(li);
    input.value = '';
  })


})
