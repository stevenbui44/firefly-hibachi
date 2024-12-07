document.addEventListener('DOMContentLoaded', function () {
    // menu-items
    const menuItemsContainer = document.querySelector('.menu-items');
    const checkoutButton = document.getElementById('checkout-button');

    // turns the name to lowercase + replaces spaces with '-'
    function getId(str) {
        return str
            .toLowerCase()
            .replace(/\s+/g, '-')
    }

    function updateCheckoutButton() {
        // fetch('https://csc342-526.csc.ncsu.edu/api/cart', {
        fetch('http://localhost:80/api/cart', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(cart => {
                // if the cart is not empty, it should NOT be disabled
                if (cart.items && cart.items.length > 0) {
                    checkoutButton.classList.remove('disabled');
                } 
                // if the cart IS empty, it SHOULD be disabled
                else {
                    checkoutButton.classList.add('disabled');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Fetch menu items from the API
    // fetch('https://csc342-526.csc.ncsu.edu/api/menu', {
    fetch('http://localhost:80/api/menu', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(menuItems => {
            menuItemsContainer.innerHTML = '';

            menuItems.forEach(item => {
                // Step 1: a href
                const menuItemElement = document.createElement('a');
                const itemId = getId(item.name);
                // menuItemElement.href = `./${itemId}`; 
                menuItemElement.href = `./food-item?id=${item.id}`;
                menuItemElement.className = 'menu-item';
                menuItemElement.id = itemId;

                // Step 2: Inner HTML
                menuItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="food-image">
                    <div class="item-details">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                    </div>
                    <span class="price">$${item.price.toFixed(2)}</span>
                `;
                menuItemsContainer.appendChild(menuItemElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    updateCheckoutButton();
});