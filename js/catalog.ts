'use strict';

// Set up an empty cart for use on this page.
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const catalogCart: Cart = new Cart(cartItems);

function populateForm() {
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionElement = document.createElement('option');
    optionElement.id = Product.allProducts[i].name;
    optionElement.textContent = Product.allProducts[i].name;
    selectElement.append(optionElement);
  }
}

function displayAllItems(){
  const productList = document.getElementById('displayCart')
  for(let i = 0; i < Product.allProducts.length; i++){
    let productCard = document.createElement('section');
    productList.append(productCard)
    let productTitle = document.createElement('h4');
    productTitle.textContent = Product.allProducts[i].name;
    let productImg = document.createElement('img');
    productImg.src = Product.allProducts[i].filePath;
    productCard.append(productTitle, productImg);
  }
}

function handleSubmit(event) {
  event.preventDefault()
  addSelectedItemToCart(event);
  catalogCart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

function addSelectedItemToCart(e) {
  let itemName = e.target.items.value
  let itemQuantity = e.target.quantity.value
  for(let item of catalogCart.items){
    if(item.name === itemName){
      let currentCount = item.quantity;
      let additionalCount = parseInt(itemQuantity);
      item.quantity = currentCount + additionalCount;
      return;
    }
  }
  catalogCart.items.push({'name': itemName, 'quantity': itemQuantity})
}

function updateCounter() {
  let cartTotal = document.getElementById('itemCount');
  let counter = 0;
  cartTotal.textContent = `( ${counter} )`;
  for( let item of catalogCart.items ){
    console.log('item', item.quantity)
    counter += item.quantity;
  }
  return cartTotal.textContent = `( ${counter} )`;
}

function updateCartPreview() {
  let cartDisplay = document.getElementById('cartContents');
  cartDisplay.querySelectorAll('*').forEach(n => n.remove());
  for( let i in catalogCart.items){
    let cartItem = document.createElement('div');
    cartItem.textContent = `${catalogCart.items[i].name}: ${catalogCart.items[i].quantity}`;
    cartDisplay.append(cartItem);
  }
}

const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

populateForm();
updateCounter();
updateCartPreview();
displayAllItems()
