// Dependencies
const express = require('express');
// const multer = require('multer');
// const upload = multer({ dest: 'static/uploads' });
const path = require('path');

const cookieParser = require('cookie-parser');
const { LoginMiddleware } = require('./middleware/LoginMiddleware.js');



// Use express and port 3000
const app = express();
const PORT = 3000;

// Serve static files
app.use('/static', express.static('./src/static'));
// app.use('/static', express.static(path.join(__dirname, 'frontend/static')));
// app.use(express.static(path.join(__dirname, 'frontend/static')));



// routing
// const routes = require('../../api/src/routes.js');
app.use(express.json());
app.use(cookieParser());
// app.use('/api', routes);


// ROUTE 1: Landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

// ROUTE 2: Menu page
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/menu.html'));
});

// ROUTE 3: Generic food item template
// app.get('/food-item', LoginMiddleware, (req, res) => {
app.get('/food-item', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/food-item.html'));
});

// ROUTE 4: Preview Order page
app.get('/preview-order', LoginMiddleware, (req, res) => {
    // app.get('/preview-order', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/preview-order.html'));
});

// ROUTE 5: Order Successfully Placed page
app.get('/order-placed', LoginMiddleware, (req, res) => {
    // app.get('/order-placed', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/order-placed.html'));
});




// ROUTE 6: Log In page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/login.html'));
});

// ROUTE 7: Sign Up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/signup.html'));
});

// ROUTE 8: Offline page
app.get('/offline', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/offline.html'));
});


app.get('/serviceWorker.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/serviceWorker.js'));
});





// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
