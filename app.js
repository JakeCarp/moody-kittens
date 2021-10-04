/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let cat = {
    id: generateId(),
    picture: "https://robohash.org/" + form.kittenName.value + "?set=set4",
    name: form.kittenName.value,
    mood: "Tolerant",
    affection: 5,
  }
  let filter = kittens.filter(k => k.name === cat.name)
  if (filter.length > 0) {
    return window.alert("NO CAT WIT DA SAEM NEM")
  }
  kittens.push(cat)
  saveKittens()
  loadKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  localStorage.setItem('added-kittens', JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let arr = localStorage.getItem('added-kittens')
  let parse = JSON.parse(arr)
  if (parse) {
    kittens = parse
  }
  drawKittens()
}

function deleteKittens(id) {
  let cats = kittens.filter(c => c.id != id)
  kittens = cats
  saveKittens()
  loadKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let draw = ''
  kittens.forEach(k => {

    if (k.affection <= 0) {
      draw +=
        `
        <div class = "card kitten ${k.mood}">
        <button onclick="deleteKittens('${k.id}')">X</button>
        <img class="" src = "${k.picture}">
        <div class="container">
        <h4><b>${k.name}</b></h4>
        <p>${k.mood}</p>
        </div>
        </div>
        `
    } else {

      draw +=
        `<div class = "card kitten ${k.mood}">
      <button onclick="deleteKittens('${k.id}')">X</button>
        <img class="" src = "${k.picture}">
        <div class="container">
        <h4><b>${k.name}</b></h4>
        <p>${k.mood}</p>
        <button onclick="pet('${k.id}')">Pet</button>
        <button onclick="catnip('${k.id}')">Catnip</button>
        </div>
        </div>
        `
    }
  }
  )
  document.getElementById("kittens").innerHTML = draw

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let cat = findKittenById(id)
  if (Math.floor(Math.random) > .7) {
    cat.affection += 1
  } else {
    cat.affection -= 1
  }
  setKittenMood(cat)
  saveKittens()
  loadKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let cat = findKittenById(id)
  cat.mood = "Tolerant"
  cat.affection = 5
  saveKittens()
  loadKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let num = kitten.affection
  if (num <= 0) {
    kitten.mood = "Gone"
    return
  }
  if (num <= 3) {
    kitten.mood = "Angry"
    return
  }
  if (num <= 5) {
    kitten.mood = "Tolerant"
    return
  }
  kitten.mood = "Happy"
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
loadKittens()