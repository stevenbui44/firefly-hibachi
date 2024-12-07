const express = require('express');
const app = express();
const router = express.Router();
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

// https://github.ncsu.edu/engr-csc342/csc342-2024Fall-shbui/blob/main/ScratchPad/Day15/a/src/routes.js
// https://github.ncsu.edu/engr-csc342/csc342-2024Fall-shbui/blob/main/ScratchPad/Day15/a/src/api/APIRoutes.js

// In day 15, we had a FrontendRoutes.js and APIRoutes.js file, but we can just 
// put the backend endpoints here since the frontend endpoints are in server.js

// const accountsDAO = require('./data/AccountDAO');
// const orderDAO = require('./data/OrderDAO');
// const menuItemsDAO = require('./data/MenuItemDAO');

const userDAO = require('./data/userDAO.js');
const menuDAO = require('./data/menuDAO.js');
const cartDao = require('./data/cartDAO.js');

// FUNCTION 0: Generating the password (same as MP5)
function hashPassword(password, salt) {
    return crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex');
}

// FUNCTION 1: Generating a salt
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

// Backend route to hash a password, since crypto is unavailable on the frontend
// router.post('/hash-password', (req, res) => {
app.post('/hash-password', (req, res) => {
    const password = req.body.password;
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    res.json({
        salt: salt,
        hashedPassword: hashedPassword
    });
});

// const { loginUser, loggedInUsers } = require('./middleware/LoginMiddleware.js');




// UserDAO:

// ROUTE 1: Logging in as a user
// TODO: Look at Mini Project 5's routes.js
// {
//     "email": "student@gmail.com",
//     "password": "student"
// }
// router.post('/login', (req, res) => {
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userDAO.getUserByEmail(email)
        .then(user => {

            const hashedPassword = hashPassword(password, user.salt);

            if (user.password === hashedPassword) {
                // make a cookie called 'userId' where the value of the userId
                res.cookie('userId', user.id, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 1000 // 1 hour cookie
                });
                const sanitizedUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };
                res.json(sanitizedUser);
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        })
        .catch(() => {
            res.status(404).json({ error: "Email not found in the system" });
        });
});

// ROUTE 2: Logging out as a user
// router.post('/logout', (req, res) => {
app.post('/logout', (req, res) => {
    res.clearCookie('userId');
    res.json({ message: "Successfully logged out" });
});


// ROUTE 3: Getting the current user's information
// I just took this from MP5 to be honest
// router.get('/users/current', (req, res) => {
app.get('/users/current', (req, res) => {

    // console.log('a');
    // console.log(req.cookies);
    // console.log(req.cookies.userId);
    // console.log('b');

    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: "You are not logged in" });
    }

    // return the current user
    userDAO.getUserById(Number(userId))
        .then(user => {
            const sanitizedUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            res.json(sanitizedUser);
        })
        .catch(() => {
            res.status(404).json({ error: "User does not exist" });
        });
});


// ROUTE 4: Creating a new user
// {
//     "firstName": "Gra",
//     "lastName": "Duate",
//     "email": "graduate@gmail.com",
//     "password": "graduate",
//     "nameOnCard": "Gra Duate",
//     "creditCardNumber": "2345234523452345",
//     "expirationDate": "11/26",
//     "cvv": "234"
// }
// router.post('/users', (req, res) => {
app.post('/users', (req, res) => {
    // ALL the fields we'll need according to login.html
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const salt = req.body.salt;
    const nameOnCard = req.body.nameOnCard;
    const creditCardNumber = req.body.creditCardNumber;
    const expirationDate = req.body.expirationDate;
    const cvv = req.body.cvv;

    // Step 1: Check if the user already exists
    userDAO.getUserByEmail(email)
        .then(() => {
            res.status(400).json({ error: "Email already exists" });
        })
        .catch(() => {
            // const salt = "secret-salt";
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                salt: salt,
                nameOnCard: nameOnCard,
                creditCardNumber: creditCardNumber,
                expirationDate: expirationDate,
                cvv: cvv
            };

            userDAO.addUser(newUser)
                .then(user => {
                    const sanitizedUser = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                    res.status(201).json(sanitizedUser);
                })
                .catch(() => {
                    res.status(500).json({ error: "Could not create user" });
                });
        });
});


// ROUTE 4.5: Getting all users, FOR TESTING PURPOSES ONLY!!!
// router.get('/users', (req, res) => {
app.get('/users', (req, res) => {
    userDAO.getAllUsers()
        .then(users => {
            res.json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "Could not fetch users" });
        });
});






// MenuDAO:

// ROUTE 5: Getting the ENTIRE menu
// router.get('/menu', (req, res) => {
app.get('/menu', (req, res) => {
    menuDAO.getAllMenuItems()
        .then(items => {
            res.json(items);
        })
        .catch(() => {
            res.status(500).json({ error: "Could not get menu" });
        });
});

// ROUTE 6: Getting a specific item from the menu
// router.get('/menu/:id', (req, res) => {
app.get('/menu/:id', (req, res) => {
    menuDAO.getMenuItemById(Number(req.params.id))
        .then(item => {
            res.json(item);
        })
        .catch(() => {
            res.status(404).json({ error: "Could not find menu item" });
        });
});









// CartDao:

// ROUTE 7: Getting the current user's cart
// router.get('/cart', (req, res) => {
app.get('/cart', (req, res) => {

    // technically I should also check if userId corresponds to a valid user as well, but I'll assume that
    // if a cookie was saved with userId, it came from a valid user
    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    cartDao.getCartByUserId(Number(userId))
        .then(cart => {
            res.json(cart);
        })
        .catch(() => {
            res.status(500).json({ error: "Could not get the user's cart" });
        });
});

// ROUTE 8: Adding an item to the user's cart
// router.post('/cart/items', (req, res) => {
app.post('/cart/items', (req, res) => {

    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const menuId = req.body.menuId;
    const quantity = req.body.quantity;

    cartDao.addItemToCart(Number(userId), Number(menuId), Number(quantity))
        .then(cart => {
            res.json(cart);
        })
        .catch(() => {
            res.status(500).json({ error: "Could not add item to cart" });
        });
});

// ROUTE 9: Removing an item from the user's cart
// router.delete('/cart/items/:id', (req, res) => {
app.delete('/cart/items/:id', (req, res) => {

    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    cartDao.removeItemFromCart(Number(userId), Number(req.params.id))
        .then(cart => {
            res.json(cart);
        })
        .catch(() => {
            res.status(404).json({ error: "Could not remove item from cart" });
        });
});


// ROUTE 10: Placing an order (basically emptying the user's cart)
// NOTE: We probably do not need an OrderDAO for this. Just empty the user's cart,
// assuming a user can only have 1 cart. Assume a user can also not check up on their
// order after they place it because I am a one man team
// router.post('/orders', (req, res) => {
app.post('/orders', (req, res) => {

    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    cartDao.clearCart(Number(userId))
        .then(() => {
            res.json({ message: "Order placed successfully" });
        })
        .catch(() => {
            res.status(500).json({ error: "Could not place order" });
        });
});






const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

module.exports = router;