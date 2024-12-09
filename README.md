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
- **Frontend**: JavaScript, HTML, CSS, Bootstrap
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
