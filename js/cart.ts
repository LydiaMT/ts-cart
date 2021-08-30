'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let shoppingCart : Cart = new Cart();

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  shoppingCart = new Cart(cartItems);
}

// re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  showCart();
}

let clearLocalStorage = document.getElementById('empty-storage');
clearLocalStorage.addEventListener('click', clearCart)

function clearCart() {
  localStorage.clear()
  let tableBody = document.querySelector('tbody')
  tableBody.querySelectorAll('*').forEach(n => n.remove());
}

interface HTMLInputElement {
  "nodeType": number;
  "min": string;
  "max": string;
  "value": string;
};

function showCart() {
  let tableBody = document.querySelector('tbody')
  tableBody.querySelectorAll('*').forEach(n => n.remove());
  // Iterate over the items in the cart
  for(let item of shoppingCart.items){
    // DOM
    let tableRow = document.createElement('tr');
    tableBody.append(tableRow);
    let removeTD = document.createElement('td');
    removeTD.textContent = '✖️';
    removeTD.id = item.name
    tableRow.append(removeTD)
    let productTD = document.createElement('td');
    productTD.textContent = item.name;
    tableRow.append(productTD);
    let quantityTD = document.createElement('td');
    tableRow.append(quantityTD);
    // Give user the ability to update item quantity
    let editQuantity: HTMLInputElement = document.createElement('input')
    // editQuantity.type = 'number';
    editQuantity.min = "1";
    editQuantity.max = "100";
    editQuantity.value = `${item.quantity}`;
    editQuantity.addEventListener('change', function(event){
      item.quantity = parseInt((event.target as HTMLInputElement).value);
      shoppingCart.saveToLocalStorage();
      showCart();
    });
    quantityTD.append(editQuantity)
  }
}

function removeItemFromCart(event) {
  shoppingCart.removeItem(event)
  shoppingCart.saveToLocalStorage();
  showCart() 
}

// This will initialize the page and draw the cart on screen
renderCart();
