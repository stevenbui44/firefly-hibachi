document.addEventListener('DOMContentLoaded', function() {
    const orderItems = document.getElementById('order-items');
    const salesTaxElement = document.getElementById('sales-tax');
    const totalElement = document.getElementById('total');
    // Sales tax
    const TAX_RATE = 0.0825;

    // FUNCTION 0.5: Formatting the item, sales, and total prices
    function formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    // FUNCTION 1: Create div class="order-item"
    function createOrderItemElement(item, menuItem) {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <img src="${menuItem.image}" alt="${menuItem.name}" class="food-image">
            <div class="item-details">
                <h2>${menuItem.name}</h2>
                <span class="quantity">Quantity: ${item.quantity}</span>
            </div>
            <span class="price">${formatPrice(menuItem.price * item.quantity)}</span>
            <button class="remove-btn" data-item-id="${menuItem.id}">-</button>
        `;
        // FUNCTION 1.5: Remove from cart 
        const removeBtn = itemElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            removeFromCart(menuItem.id);
        });
        return itemElement;
    }

    // FUNCTON 2: Removing an item from the cart
    function removeFromCart(menuId) {
        // fetch(`https://csc342-526.csc.ncsu.edu/api/cart/items/${menuId}`, {
        fetch(`http://localhost:80/api/cart/items/${menuId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error removing item from cart');
            }
            return response.json();
        })
        .then(() => {
            // UPDATE the cart
            loadCart();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // FUNCTION 3: Calculating the sales tax and total
    function calculateTotals(items, menuItems) {
        let subtotal = 0;

        // Step 1: Calculate the regular items
        items.forEach(item => {
            const menuItem = menuItems.find(m => m.id === item.menuId);
            if (menuItem) {
                subtotal += menuItem.price * item.quantity;
            }
        });

        // Step 2: Calculate the sales tax
        const salesTax = subtotal * TAX_RATE;

        // Step 3: Calculate the total
        const total = subtotal + salesTax;

        salesTaxElement.textContent = formatPrice(salesTax);
        totalElement.textContent = formatPrice(total);
    }

    // FUNCTION 4: Loading/updating the user's cart
    // No lie. This is going to look mostly the same as order-placed.js
    function loadCart() {
        // Step 1: Get the entire MENU first 
        // fetch('https://csc342-526.csc.ncsu.edu/api/menu', {
        fetch('http://localhost:80/api/menu', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(menuItems => {

                // Step 2: Get the CART
                // fetch('https://csc342-526.csc.ncsu.edu/api/cart', {
                fetch('http://localhost:80/api/cart', {
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(cart => {
                        orderItems.innerHTML = '';
    
                        // Step 2.5: Check if the cart is empty
                        if (!cart.items || cart.items.length === 0) {
                            orderItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                            salesTaxElement.textContent = '$0.00';
                            totalElement.textContent = '$0.00';
                            const placeOrderLink = document.getElementById('place-order-btn');
                            placeOrderLink.href = '#';
                            return;
                        }

    
                        // Step 3: Add each cart item from the CART to the container
                        cart.items.forEach(item => {
                            const menuItem = menuItems.find(m => m.id === item.menuId);
                            if (menuItem) {
                                const itemElement = createOrderItemElement(item, menuItem);
                                orderItems.appendChild(itemElement);
                            }
                        });
    
                        // Step 4: Calculate totals
                        calculateTotals(cart.items, menuItems);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error loading menu items:', error);
            });
    }
    loadCart();
});