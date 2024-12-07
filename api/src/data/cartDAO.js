const db = require('./DBConnection');
// const cartItems = require('./carts.json');

// FUNCTION 7: GET /cart (to get a specific user's cart)
function getCartByUserId(userId) {
    // items: menuId and quantity
    return db.query('SELECT c.menuId, c.quantity FROM CartItems c WHERE c.userId = ?', [userId])
        .then(items => {
            return {
                userId: userId,
                items: items
            };
        });
}

// FUNCTION 8: POST /cart/items (to add to the cart)
function addItemToCart(userId, menuItemId, quantity) {
    // See if the item is already in the user's cart first
    return db.query('SELECT * FROM CartItems WHERE userId = ? AND menuId = ?', [userId, menuItemId])
        .then(rows => {
            if (rows.length > 0) {
                // CASE 1: Update the existing item
                return db.query('UPDATE CartItems SET quantity = quantity + ? WHERE userId = ? AND menuId = ?', [quantity, userId, menuItemId]);
            } else {
                // CASE 2: Add a new item
                return db.query('INSERT INTO CartItems (userId, menuId, quantity) VALUES (?, ?, ?)', [userId, menuItemId, quantity]);
            }
        })
        .then(() => getCartByUserId(userId));
}

// ROUTE 9: DELETE /cart/items/:id (to remove an item)
function removeItemFromCart(userId, menuItemId) {
    // deleting a SPECIFIC menuId
    return db.query('DELETE FROM CartItems WHERE userId = ? AND menuId = ?', [userId, menuItemId])
        .then(() => getCartByUserId(userId));
}

// ROUTE 10: POST /orders (to empty the cart after ordering)
function clearCart(userId) {
    return db.query('DELETE FROM CartItems WHERE userId = ?', [userId])
        .then(() => getCartByUserId(userId));
}

module.exports = {
    getCartByUserId,
    addItemToCart,
    removeItemFromCart,
    clearCart
};