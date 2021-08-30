'use strict';
// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var shoppingCart = new Cart();
function loadCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    shoppingCart = new Cart(cartItems);
}
// re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
    loadCart();
    showCart();
}
var clearLocalStorage = document.getElementById('empty-storage');
clearLocalStorage.addEventListener('click', clearCart);
function clearCart() {
    localStorage.clear();
    var tableBody = document.querySelector('tbody');
    tableBody.querySelectorAll('*').forEach(function (n) { return n.remove(); });
}
;
function showCart() {
    var tableBody = document.querySelector('tbody');
    tableBody.querySelectorAll('*').forEach(function (n) { return n.remove(); });
    var _loop_1 = function (item) {
        // DOM
        var tableRow = document.createElement('tr');
        tableBody.append(tableRow);
        var removeTD = document.createElement('td');
        removeTD.textContent = '✖️';
        removeTD.id = item.name;
        tableRow.append(removeTD);
        var productTD = document.createElement('td');
        productTD.textContent = item.name;
        tableRow.append(productTD);
        var quantityTD = document.createElement('td');
        tableRow.append(quantityTD);
        // Give user the ability to update item quantity
        var editQuantity = document.createElement('input');
        // editQuantity.type = 'number';
        editQuantity.min = "1";
        editQuantity.max = "100";
        editQuantity.value = "" + item.quantity;
        editQuantity.addEventListener('change', function (event) {
            item.quantity = parseInt(event.target.value);
            shoppingCart.saveToLocalStorage();
            showCart();
        });
        quantityTD.append(editQuantity);
    };
    // Iterate over the items in the cart
    for (var _i = 0, _a = shoppingCart.items; _i < _a.length; _i++) {
        var item = _a[_i];
        _loop_1(item);
    }
}
function removeItemFromCart(event) {
    shoppingCart.removeItem(event);
    shoppingCart.saveToLocalStorage();
    showCart();
}
// This will initialize the page and draw the cart on screen
renderCart();
