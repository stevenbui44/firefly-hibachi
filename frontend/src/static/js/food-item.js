document.addEventListener('DOMContentLoaded', function() {
    // get the food item ID from the search param
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    // if there is no ID, go to /menu instead of an empty template
    if (!itemId) {
        window.location.href = '/menu';
        return;
    }

    const foodImage = document.getElementById('food-image');
    const foodName = document.getElementById('food-name');
    const foodCalories = document.getElementById('food-calories');
    const foodPrice = document.getElementById('food-price');
    const foodDescription = document.getElementById('food-description');
    const quantityInput = document.getElementById('quantity');
    const addToOrderBtn = document.querySelector('.add-to-order-btn');

    // fetch(`https://csc342-526.csc.ncsu.edu/api/menu/${itemId}`, {
    fetch(`http://localhost:80/api/menu/${itemId}`, {
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Item not found');
            }
            return response.json();
        })
        .then(item => {
            document.title = `${item.name}`;
            foodImage.src = item.image;
            foodImage.alt = item.name;
            foodName.textContent = item.name;
            foodCalories.textContent = item.calories;
            // they wouldn't let me just have something like '$11.50'
            foodPrice.textContent = item.price.toFixed(2);
            foodDescription.textContent = item.description;
            addToOrderBtn.dataset.itemId = item.id;
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/menu';
        });

    // FUNCTION 1: Subtracting
    document.querySelector('.minus').addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // FUNCTION 2: Adding
    document.querySelector('.plus').addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // FUNCTION 3: Manually changing quantity input
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        // if negative OR non-numerical input (ex. 'e')
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 10) {
            this.value = 10;
        }
    });

    // FUNCTION 4: Adding to the cart
    addToOrderBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        const menuId = itemId;

        // fetch('https://csc342-526.csc.ncsu.edu/api/cart/items', {
        fetch('http://localhost:80/api/cart/items', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                menuId: menuId,
                quantity: quantity
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding to cart');
            }
            return response.json();
        })
        .then(() => {
            window.location.href = '/menu';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});