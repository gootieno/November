export const postContainer = async () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'post-container')
    document.body.appendChild(container)
    const bodyTitleContainer = await displayPosts()
    console.log('body title container ', bodyTitleContainer)
    container.appendChild(bodyTitleContainer)
}

const displayPosts = async () => {
    const data = await getPosts()
    console.log('data ', data)

    const bodyTitleContainer = document.createElement('div')

    const title = document.createElement('h2')
    const body = document.createElement('p')

    title.innerText = data.title;
    body.innerText = data.body;

    bodyTitleContainer.append(title, body)

    return bodyTitleContainer
}

const getPosts = async () => {
   const response = await  fetch('https://jsonplaceholder.typicode.com/posts/1')
  const data =  await  response.json()
  return data
}