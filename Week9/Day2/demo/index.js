import { postContainer as createPostContainer } from "./posts.js"

const initializePage = () => {
    // calls containers
    createPostContainer()
}

window.onload = initializePage