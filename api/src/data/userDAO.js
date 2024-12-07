const db = require('./DBConnection');
// const users = require('./users.json');

// ROUTE 1: POST /login (to log in with email)
// ROUTE 4: POST /users (check if user exists before creating)
function getUserByEmail(email) {
    return db.query('SELECT * FROM Users WHERE email = ?', [email])
        .then(rows => {
            if (rows.length === 0) {
                return Promise.reject("User not found");
            }
            // there should only be 1 user
            return rows[0];
        });
}


// ROUTE 3: GET /users/current
function getUserById(id) {
    return db.query('SELECT * FROM Users WHERE id = ?', [id])
        .then(rows => {
            if (rows.length === 0) {
                return Promise.reject("User not found");
            }
            // there should only be 1 user
            return rows[0];
        });
}

// ROUTE 4: POST /users (to create the user)
function addUser(user) {
    return db.query(`INSERT INTO Users 
                        (firstName, lastName, email, password, salt, nameOnCard, creditCardNumber, expirationDate, cvv)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            user.firstName, 
            user.lastName, 
            user.email, 
            user.password, 
            user.salt, 
            user.nameOnCard, 
            user.creditCardNumber,
            user.expirationDate, 
            user.cvv
        ])
        .then(result => getUserById(result.insertId));
}


// ROUTE 4.5: GET /users (testing function)
function getAllUsers() {
    return db.query('SELECT * FROM Users');
}

module.exports = {
    getUserByEmail,
    getUserById,
    addUser,
    getAllUsers
};