document.addEventListener('DOMContentLoaded', function () {
    // container to put items
    const itemsContainer = document.getElementById('items-container');
    // pickup-time
    const pickupTime = document.getElementById('pickup-time');

    // FUNCTION 1: Pickup time of the order (30 minutes)
    function calculatePickupTime() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        });
    }

    // FUNCTION 2: Creating a div class="item"
    function createItemElement(item, menuItem) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <img src="${menuItem.image}" alt="${menuItem.name}" class="food-image">
            <div class="item-details">
                <h3>${menuItem.name}</h3>
                <span class="quantity">Quantity: ${item.quantity}</span>
            </div>
        `;
        return itemDiv;
    }
    pickupTime.textContent = calculatePickupTime();

    // Fetch the user's cart
    // No lie. This is going to look mostly same as preview-order.js
    // Step 1: Get the entire MENU first 
    // fetch('https://csc342-526.csc.ncsu.edu/api/menu', {
    fetch('http://localhost:80/api/menu', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(menuItems => {
            const menuMap = {};

            // Step 2: Add each item from the menu into a MAP for the cart
            menuItems.forEach(item => {
                menuMap[item.id] = item;
            });

            // Step 3: Get the CART
            // return fetch('https://csc342-526.csc.ncsu.edu/api/cart', {
            return fetch('http://localhost:80/api/cart', {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(cart => {
                    itemsContainer.innerHTML = '';

                    // Step 4: Add each cart item from the MAP to itemsContainer
                    cart.items.forEach(cartItem => {
                        const menuItem = menuMap[cartItem.menuId];
                        const itemElement = createItemElement(cartItem, menuItem);
                        itemsContainer.appendChild(itemElement);
                    });

                    // Step 5: Clear the order
                    // return fetch('https://csc342-526.csc.ncsu.edu/api/orders', { 
                    return fetch('http://localhost:80/api/orders', { 
                        method: 'POST',
                        credentials: 'include'
                    });
                });
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/menu';
        });
});