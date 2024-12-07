const db = require('./DBConnection');
// const menuItems = require('./menus.json');

// ROUTE 5: GET /menu (to get the whole menu)
function getAllMenuItems() {
    return db.query('SELECT * FROM Menu');
}

// ROUTE 6: GET /menu/:id (to get a specific menu item)
function getMenuItemById(id) {
    return db.query('SELECT * FROM Menu WHERE id = ?', [id])
        .then(rows => {
            if (rows.length === 0) {
                return Promise.reject("Menu item not found");
            }
            return rows[0];
        });
}
module.exports = {
    getAllMenuItems,
    getMenuItemById
};