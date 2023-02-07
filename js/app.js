'use strict'

let myContainer = document.getElementById('votingBox');
let myButton = document.getElementById('resultsButton');
let image1 = document.getElementById('img1');
let image2 = document.getElementById('img2');
let image3 = document.getElementById('img3');
let numberOfMatchUps = 0;
let numberOfMatchUpsAllowed = 25;

class BetaItem {
  static allProductArray = [];
  constructor(name, filetype = 'jpg') {
    this.name = name;
    this.src = `img/${name}.${filetype}`;
    this.views = 0;
    this.likes = 0;
    BetaItem.allProductArray.push(this);
  }
}

let bag = new BetaItem('bag');
let banana = new BetaItem('banana');
let bathroom = new BetaItem('bathroom');
let boots = new BetaItem('boots');
let breakfast = new BetaItem('breakfast');
let bubblegum = new BetaItem('bubblegum');
let chair = new BetaItem('chair');
let cthulhu = new BetaItem('cthulhu');
let dogDuck = new BetaItem('dog-duck');
let dragon = new BetaItem('dragon');
let pen = new BetaItem('pen');
let petSweep = new BetaItem('pet-sweep');
let scissors = new BetaItem('scissors');
let shark = new BetaItem('shark');
let sweep = new BetaItem('sweep', 'png');
let tauntaun = new BetaItem('tauntaun');
let unicorn = new BetaItem('unicorn');
let waterCan = new BetaItem('water-can');
let wineGlass = new BetaItem('wine-glass');


function selectRandomProduct() {
  return Math.floor(Math.random() * BetaItem.allProductArray.length);
}

function renderProducts() {
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  let product3 = selectRandomProduct();
  while (product1 === product2) {
    product2 = selectRandomProduct();
  }
  while (product1 === product3 || product2 === product3) {
    product3 = selectRandomProduct();
  }
  image1.src = BetaItem.allProductArray[product1].src;
  image2.src = BetaItem.allProductArray[product2].src;
  image3.src = BetaItem.allProductArray[product3].src;
  image1.alt = BetaItem.allProductArray[product1].name;
  image2.alt = BetaItem.allProductArray[product2].name;
  image3.alt = BetaItem.allProductArray[product3].name;
  BetaItem.allProductArray[product1].views++;
  BetaItem.allProductArray[product2].views++;
  BetaItem.allProductArray[product3].views++;
  numberOfMatchUps++;
}

function renderResults() {
  let results = document.querySelector('ul');
  for (let i = 0; i < BetaItem.allProductArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${BetaItem.allProductArray[i].name} had ${BetaItem.allProductArray[i].views} views and ${BetaItem.allProductArray[i].likes} likes.`;
    results.appendChild(li);
  }
}
renderProducts();

function handleProductClick(event) {
  let clickedProduct = event.target.alt;
  for (let i = 0; i < BetaItem.allProductArray.length; i++) {
    if (BetaItem.allProductArray[i].name === clickedProduct) {
      BetaItem.allProductArray[i].likes++;
    }
  }
  if (numberOfMatchUps < numberOfMatchUpsAllowed) {
    renderProducts();
  } else {
    myContainer.removeEventListener('click', handleProductClick);
    myButton.addEventListener('click', renderResults);
  }
}

myContainer.addEventListener('click', handleProductClick);