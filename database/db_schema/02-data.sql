USE teamz;

-- Command 1: Inserting users.json 
INSERT INTO Users (
    id, firstName, lastName, email, password, salt, nameOnCard, creditCardNumber, expirationDate, cvv
) VALUES (
    1, 'Stu', 'Dent', 'student@gmail.com', 
    'bce13a523e8c4b16d6b2001a12e25b04e99fcae05f2b26feeb1b6226e4cf38d5f5fe2c72c87a8ec9c7edf88d466bda9f34dca57e2cd76f4b3cb17bd310a244cd', 
    '8b72f5f17b6cec73ba3aa79bafd73305', 
    'Stu Dent', '1234123412341234', '11/25', '123'
);

-- Command 2: Inserting menus.json
INSERT INTO Menu (id, name, description, image, calories, price) VALUES
(1, 'Hibachi Chicken', 'Teriyaki-glazed grilled chicken served alongside fried rice, noodles, and a medley of grilled zucchini and onions.', 'static/images/hibachi-chicken.png', 1000, 11.50),
(2, 'Hibachi Steak', 'Teriyaki-glazed flank steak, grilled to perfection, served with a trio of fried rice, noodles, and charred vegetables.', 'static/images/hibachi-steak.png', 1100, 13.25),
(3, 'Hibachi Shrimp', 'Teriyaki-glazed grilled shrimp, paired with golden fried rice, silky noodles, and fire-roasted zucchini and onions.', 'static/images/hibachi-shrimp.png', 1200, 12.50),
(4, 'Hibachi Salmon', 'Teriyaki-glazed grilled salmon fillet, served with aromatic fried rice, tender noodles, and a charred vegetable medley.', 'static/images/hibachi-salmon.png', 1300, 14.50);

-- Command 3: Inserting carts.json:
INSERT INTO CartItems (userId, menuId, quantity) VALUES
(1, 1, 2);

-- Set auto-increment values
ALTER TABLE Users AUTO_INCREMENT = 2;
ALTER TABLE Menu AUTO_INCREMENT = 5;
ALTER TABLE CartItems AUTO_INCREMENT = 2;