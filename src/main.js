import "./style.css"
import PokeService from "./services/poke-service.js";

const service = new PokeService()

service.getData().then(data => render(data))


function prev() {
  service.previousPage()
  service.getData().then(data => render(data))
}

function next() {
  service.nextPage()
  service.getData().then(data => render(data))
}

window.prev = prev
window.next = next

function render(data) {
  const container = document.getElementById("app")
  const pokeContainer = document.createElement("div")
  pokeContainer.className = "poke-container"

  container.innerText = ''

  for (const pokemon of data) {
    const nameContainer = document.createElement("span")
    const node = document.createTextNode(pokemon.name)
    const image = document.createElement("img")
    image.src = pokemon.img

    nameContainer.appendChild(node)
    pokeContainer.appendChild(image)
    pokeContainer.appendChild(nameContainer)
    container.appendChild(pokeContainer)
  }
}