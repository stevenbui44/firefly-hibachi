# Firefly Hibachi

## Features

- **User Registration and Authentication**: Secure user signup and login functionality with cookie-based session management for resource access control
- **Input Validation**: Client-side and server-side validation for user registration fields and payment data
- **Client-Side Dynamic Loading**: Dynamically loads/updates menu, cart, and orders with JavaScript
- **Shopping Cart System**: Allows adding items to a cart and previewing/updating cart before checkout
- **Offline Mode**: Displays custom offline screen or cached content when offline
- **Caching**: Uses a network-first caching strategy to retrieve cached content for offline access
- **Installability**: Allows users to install application and access it like a native app
- **Middleware**: Redirects unauthorized users to login page to reinforce resource access control
- **Database Integration**: Runs SQL queries to MySQL database for CRUD operations on users, menu items, and orders
- **Docker Containerization**: Packages application into Docker containers for consistent deployment
- **Responsive Design**: Implements mobile-first design principles with Bootstrap and media queries

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: JavaScript, ReactJS, HTML, CSS, Bootstrap
- **Database**: MySQL
- **Deployment**: Docker

## Installation

1. Ensure that you have the following prerequisites installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker
- MySQL Workbench

2.  Clone the repository:
```
git clone https://github.com/stevenbui44/firefly-hibachi.git
```

3. Install dependencies
```
npm install
```

4. Configure environment variables in .env
```

MYSQL_ROOT_PASSWORD=[...]
MYSQL_DATABASE=[...]
MYSQL_USER=[...]
MYSQL_PASSWORD=[...]

DB_ENGINE=mysql
DB_PORT=3306
DB_CHARSET=utf8mb4
```

5. On MySQL Workbench, create a new MySQL connection with port 3307 and the database name/user specified above

6. Run the application
```
docker compose down
docker compose up
```

## Usage

1. Open the application in localhost:3000
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/95b6ecc8-7a15-4a93-afb6-33c5458ac451">

2. Select Order Now to view the restaurant's menu
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/66e3fd61-c801-48d1-82e6-751745e10b76">

3. Sign up / log in to be able to place orders
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/23c55ac0-6830-44d0-af4c-f3b8017704b4">

4. Select any food item to review it and add to the cart
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/295554fb-2add-4c74-922d-f1c5275f4090">

5. Press Check Out to preview your order
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/213d1f30-23aa-44c2-875b-e81bfed786cd">

6. Place your order!
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/916434ac-812a-4f62-884f-aa9658d09faa">
