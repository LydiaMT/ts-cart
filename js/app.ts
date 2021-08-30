'use strict';

interface Cart {
  items: [{ 
    name: string;
    quantity: number | string;
  }],
  typeCheck?: (product: string, quantity: string) => string,
  addItem?: (product: string, quantity: string) => string,
  saveToLocalStorage?: () => void,
  removeItem?: (product: string) => string,
}

// Cart constructor
const Cart = function(items: [] = []) {
  this.items = items;
};

Cart.prototype.addItem = function(product, quantity) {
  const myCartItem = new CartItem(product, quantity);
  this.items.push(myCartItem);
};

Cart.prototype.saveToLocalStorage = function() {
  let localStorageData: string = JSON.stringify(this.items)
  localStorage.setItem('cart', localStorageData);
};

Cart.prototype.removeItem = function(product) {
  for(let i = 0; i < shoppingCart.items.length; i++){
    if(shoppingCart.items[i].name === product.target.id){
      shoppingCart.items.splice(i, 1)
    }
  }
};

const CartItem = function(product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

// Product contructor
const Product = function(filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function generateCatalog() {
  new Product('assets/bag.jpg', 'Bag');
  new Product('assets/banana.jpg', 'Banana');
  new Product('assets/bathroom.jpg', 'Bathroom');
  new Product('assets/boots.jpg', 'Boots');
  new Product('assets/breakfast.jpg', 'Breakfast');
  new Product('assets/bubblegum.jpg', 'Bubblegum');
  new Product('assets/chair.jpg', 'Chair');
  new Product('assets/cthulhu.jpg', 'Cthulhu');
  new Product('assets/dog-duck.jpg', 'Dog-Duck');
  new Product('assets/dragon.jpg', 'Dragon');
  new Product('assets/pen.jpg', 'Pen');
  new Product('assets/pet-sweep.jpg', 'Pet Sweep');
  new Product('assets/scissors.jpg', 'Scissors');
  new Product('assets/shark.jpg', 'Shark');
  new Product('assets/sweep.png', 'Sweep');
  new Product('assets/tauntaun.jpg', 'Taun-Taun');
  new Product('assets/unicorn.jpg', 'Unicorn');
  new Product('assets/water-can.jpg', 'Water Can');
  new Product('assets/wine-glass.jpg', 'Wine Glass');
}

// Initialize the app by creating the big list of products with images and names
generateCatalog();
