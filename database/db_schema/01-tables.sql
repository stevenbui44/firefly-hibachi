-- Initialize the database and tables first
CREATE DATABASE IF NOT EXISTS teamz;
USE teamz;

-- Users table should have 10 fields
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(50) NOT NULL,
    nameOnCard VARCHAR(100) NOT NULL,
    creditCardNumber VARCHAR(16) NOT NULL,
    expirationDate VARCHAR(5) NOT NULL,
    cvv VARCHAR(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Menu table should have 6 fields
CREATE TABLE IF NOT EXISTS Menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    price FLOAT(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Cart table should reference User and Menu
CREATE TABLE IF NOT EXISTS CartItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    menuId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (menuId) REFERENCES Menu(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;