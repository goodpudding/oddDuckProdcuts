"use strict";
// Global Variables
let myContainer = document.getElementById("votingBox");
let myButton = document.getElementById("resultsButton");
let image1 = document.getElementById("img1");
let image2 = document.getElementById("img2");
let image3 = document.getElementById("img3");
let numberOfMatchUps = 0;
let numberOfMatchUpsAllowed = 25;
let uniqueImageCount = 9;
let clicks = 0;

// Contructor to build my items and add them to the array allProductArray
class BetaItem {
  static allProductArray = [];
  static productQue = [];
  constructor(name, filetype = "jpg", views = 0, likes = 0) {
    this.name = name;
    this.src = `img/${name}.${filetype}`;
    this.views = views;
    this.likes = likes;
    BetaItem.allProductArray.push(this);
  }
}

// Creating a random number to pick products by random
function selectRandomProduct() {
  return Math.floor(Math.random() * BetaItem.allProductArray.length);
}

//Renders 3 images on the screen for the viewer to vote on
function renderProducts() {
  while (BetaItem.productQue.length < uniqueImageCount) {
    let randomNumber = selectRandomProduct();
    if (!BetaItem.productQue.includes(randomNumber)) {
      BetaItem.productQue.push(randomNumber);
    }
  }
  let product1 = BetaItem.productQue.shift();
  let product2 = BetaItem.productQue.shift();
  let product3 = BetaItem.productQue.shift();
  image1.src = BetaItem.allProductArray[product1].src;
  image2.src = BetaItem.allProductArray[product2].src;
  image3.src = BetaItem.allProductArray[product3].src;
  image1.alt = BetaItem.allProductArray[product1].name;
  image2.alt = BetaItem.allProductArray[product2].name;
  image3.alt = BetaItem.allProductArray[product3].name;
  BetaItem.allProductArray[product1].views++;
  BetaItem.allProductArray[product2].views++;
  BetaItem.allProductArray[product3].views++;
}

//After the user has voted 25 times, the user can see their results
function renderResults() {
  let results = document.querySelector("ul");
  for (let i = 0; i < BetaItem.allProductArray.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${BetaItem.allProductArray[i].name} had ${BetaItem.allProductArray[i].views} views and ${BetaItem.allProductArray[i].likes} likes.`;
    results.appendChild(li);
  }
  image1.remove();
  image2.remove();
  image3.remove();
  myContainer.appendChild.Chart;
  renderChart();
  myButton.removeEventListener("click", renderResults);
}


//This is to handle the clicks
function handleProductClick(event) {
  let clickedProduct = event.target.alt;
  for (let i = 0; i < BetaItem.allProductArray.length; i++) {
    if (BetaItem.allProductArray[i].name === clickedProduct) {
      BetaItem.allProductArray[i].likes++;
    }
  }
  if (numberOfMatchUps < numberOfMatchUpsAllowed) {
    renderProducts();
    numberOfMatchUps++;
  
  } else {
    myContainer.removeEventListener("click", handleProductClick);
    myButton.addEventListener("click", renderResults);
  }
  if (clicks === numberOfMatchUpsAllowed) {
    myContainer.removeEventListener("click", handleProductClick);
    myContainer.className = "no-voting";
    renderChart();
  } else {
    renderProducts();
  }
  let stringifiedPictures = JSON.stringify(BetaItem.allProductArray);
  localStorage.setItem('storedData', stringifiedPictures);
}

//This is to create the chart
function renderChart() {
  let productLikes = [];
  let productName = [];
  let productViews = [];
  
  for (let i = 0; i < BetaItem.allProductArray.length; i++) {
    productLikes.push(BetaItem.allProductArray[i].likes);
    productName.push(BetaItem.allProductArray[i].name);
    productViews.push(BetaItem.allProductArray[i].views);
  }
  
  let config = {
    type: "bar",
    data: {
      labels: productName,
      datasets: [
        {
          label: "# of Votes",
          data: productLikes,
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
        {
          label: "# of Views",
          data: productViews,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  let canvasChart = document.getElementById("myChart");
  const myChart = new Chart(canvasChart, config);
}


let storedData = localStorage.getItem('storedData');


if (storedData){
  let parsedData = JSON.parse(storedData);
  BetaItem.allProductArray = parsedData;
}else{
// Creating new instances of BetaItem
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
}
renderProducts();
//Turns the event listener on
myContainer.addEventListener("click", handleProductClick);
