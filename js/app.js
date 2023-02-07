'use strict'


let myContainer = document.getElementById('votingBox');
// + is the adjacent (AKA next) sibling selector, will select any div that comes right after a section
let myButton = document.getElementById('resultsButton');

let image1 = document.getElementById('img1');
let image2 = document.getElementById('img2');
let image3 = document.getElementById('img3');


let numberOfMatchUps = 0;
let numberOfMatchUpsAllowed = 25;

// Newer way to make classes

class BetaItem {
  static allProductArray = [];
  constructor(name, filetype = 'jpg') {
    this.name = name;
    this.src = `img/${name}.${filetype}`;
    this.views = 0;
    this.likes = 0;
    BetaItem.allProductArray.push(this);
  }
  static printAllInstances() {
    console.log(BetaItem.allProductArray.length);
  }
}


// function BetaItem(name, filetype = 'jpg') {
//   this.name = name;
//   this.src = `img/${name}.${filetype}`;
//   this.views = 0;
//   this.likes = 0;
//   BetaItem.allProductArray.push(this);
// }
// BetaItem.allProductArray = []; 
// console.log(BetaItem.allProductArray.length);



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
  // The maximum is exclusive and the minimum is inclusive
}
console.log(selectRandomProduct());

function renderProducts() {
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  let product3 = selectRandomProduct();
  console.log(product1, product2);
  // seriously consider using an array here
  // remember; how do you know if an array includes soemthing?
  // google it and find out
  while (product1 === product2) {
    product2 = selectRandomProduct();
  }
  while (product1 === product3 || product2 === product3) {
    product3 = selectRandomProduct();
  }
  // change the images displayed in the DOM
  image1.src = BetaItem.allProductArray[product1].src;
  image2.src = BetaItem.allProductArray[product2].src;
  image3.src = BetaItem.allProductArray[product3].src;
  image1.alt = BetaItem.allProductArray[product1].name;
  image2.alt = BetaItem.allProductArray[product2].name;
  image3.alt = BetaItem.allProductArray[product3].name;

  BetaItem.allProductArray[product1].views++;
  BetaItem.allProductArray[product2].views++;
  BetaItem.allProductArray[product3].views++;


  // note this as an addititional match up
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
BetaItem.printAllInstances();
renderProducts();

function handleProductClick(event) {
  console.log(event.target.alt);
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