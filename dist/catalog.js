'use strict';
// Set up an empty cart for use on this page.
var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
var catalogCart = new Cart(cartItems);
function populateForm() {
    var selectElement = document.getElementById('items');
    for (var i in Product.allProducts) {
        var optionElement = document.createElement('option');
        optionElement.id = Product.allProducts[i].name;
        optionElement.textContent = Product.allProducts[i].name;
        selectElement.append(optionElement);
    }
}
function displayAllItems() {
    var productList = document.getElementById('displayCart');
    for (var i = 0; i < Product.allProducts.length; i++) {
        var productCard = document.createElement('section');
        productList.append(productCard);
        var productTitle = document.createElement('h4');
        productTitle.textContent = Product.allProducts[i].name;
        var productImg = document.createElement('img');
        productImg.src = Product.allProducts[i].filePath;
        productCard.append(productTitle, productImg);
    }
}
function handleSubmit(event) {
    event.preventDefault();
    addSelectedItemToCart(event);
    catalogCart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();
}
function addSelectedItemToCart(e) {
    var itemName = e.target.items.value;
    var itemQuantity = e.target.quantity.value;
    for (var _i = 0, _a = catalogCart.items; _i < _a.length; _i++) {
        var item = _a[_i];
        if (item.name === itemName) {
            var currentCount = parseInt(item.quantity);
            var additionalCount = parseInt(itemQuantity);
            item.quantity = currentCount + additionalCount;
            return;
        }
    }
    catalogCart.items.push({ 'name': itemName, 'quantity': itemQuantity });
}
function updateCounter() {
    var cartTotal = document.getElementById('itemCount');
    var counter = 0;
    cartTotal.textContent = "( " + counter + " )";
    for (var _i = 0, _a = catalogCart.items; _i < _a.length; _i++) {
        var item = _a[_i];
        console.log('item', item.quantity);
        counter += parseInt(item.quantity);
    }
    return cartTotal.textContent = "( " + counter + " )";
}
function updateCartPreview() {
    var cartDisplay = document.getElementById('cartContents');
    cartDisplay.querySelectorAll('*').forEach(function (n) { return n.remove(); });
    for (var i in catalogCart.items) {
        var cartItem = document.createElement('div');
        cartItem.textContent = catalogCart.items[i].name + ": " + catalogCart.items[i].quantity;
        cartDisplay.append(cartItem);
    }
}
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
populateForm();
updateCounter();
updateCartPreview();
displayAllItems();
