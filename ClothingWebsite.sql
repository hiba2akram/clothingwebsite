CREATE DATABASE Fitzo;
USE Fitzo;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM Category WHERE CategoryID = 3;
DELETE FROM Product
WHERE CategoryID = 3;

DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;

SET FOREIGN_KEY_CHECKS = 1;

DELETE FROM OrderItems;
DELETE FROM Product;
ALTER TABLE Product AUTO_INCREMENT = 1;


SET SQL_SAFE_UPDATES = 0;
-- USERS
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('Admin','Customer') DEFAULT 'Customer',
    Phone VARCHAR(20),
    HouseNum INT,
    Street VARCHAR(50),
    City VARCHAR(50),
    PostalCode VARCHAR(10)
);
select * from Users;
CREATE TABLE Category (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(50) NOT NULL,
    ParentCategoryID INT NULL,
    Description VARCHAR(255),
    FOREIGN KEY (ParentCategoryID) REFERENCES Category(CategoryID)
);
INSERT INTO Category (CategoryID, CategoryName, ParentCategoryID, Description) VALUES
(1, 'Clothing', NULL, 'All clothing items'),
(2, 'Male', 1, 'Male wear'),
(3, 'Female', 1, 'Female wear');

-- First remove products using category 4
UPDATE Product SET CategoryID = 3 WHERE CategoryID = 4;

-- Now delete category 4
DELETE FROM Category WHERE CategoryID = 4;
DELETE FROM Category WHERE CategoryID = 5;


-- Now insert correctly
INSERT INTO Category (CategoryID, CategoryName, ParentCategoryID, Description) VALUES
(4, 'Footwear', NULL, 'All footwear'),
(5, 'Kids',     1,    'Kids clothing'),
(6, 'luxury', 1, 'Luxury');

INSERT INTO Category (CategoryID, CategoryName, ParentCategoryID, Description) VALUES
(7, 'rtw' , 1,'Ready to wear');
select * from Category;


CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryID INT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    StitchType ENUM('Stitched','Unstitched','NotApplicable') DEFAULT 'NotApplicable',
    Gender ENUM('Male','Female','Unisex'),
    Brand VARCHAR(50),
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedDate DATETIME,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);
INSERT INTO Product 
(CategoryID, ProductName, Price, StitchType, Gender, Brand, IsActive, CreatedDate)
VALUES
(7, 'Cotton Suit', 2300, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(7, 'Lawn Suit', 3000, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(7, 'Dobby Suit', 3500, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW());

INSERT INTO Product 
(CategoryID, ProductName, Price, StitchType, Gender, Brand, IsActive, CreatedDate)
VALUES
(3, 'Karandi Shirt', 4500, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(3, 'Embroidered 3PC', 5200, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(3, 'Dobby 2 Piece', 6500, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(3, 'Lawn Suit', 7200, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(3, 'Embroidered Suit', 6500, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(3, 'Embroidered Suit', 7200, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW());

INSERT INTO Product 
(CategoryID, ProductName, Price, StitchType, Gender, Brand, IsActive, CreatedDate)
VALUES
(6, 'Organza Suit', 3900, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(6, 'Premium Collection', 8500, 'Unstitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(6, 'Luxury Lawn Suit', 4500, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(6, 'Embroidered 3PC', 5200, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(6, 'Festive Wear', 6500, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(6, 'Designer Suit', 7200, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW());

INSERT INTO Product 
(CategoryID, ProductName, Price, StitchType, Gender, Brand, IsActive, CreatedDate)
VALUES
(2, 'Printed Kurta',                   2500, 'Stitched', 'Male', 'FitzoBrand', TRUE, NOW()),
(2, 'Printed Cotton Suit',             2700, 'Stitched', 'Male', 'FitzoBrand', TRUE, NOW()),
(2, 'Printed Kurta ',                 2600, 'Stitched', 'Male', 'FitzoBrand', TRUE, NOW()),
(2, 'Washing Wear Suit',                     2600, 'Stitched', 'Male', 'FitzoBrand', TRUE, NOW()),
(2, 'Cotton Suit',                    2400, 'Stitched', 'Male', 'FitzoBrand', TRUE, NOW()),
(2, 'Premium Suit',                   2800, 'Stitched', 'Male', 'FitzoBrand', TRUE, NOW()),
(5, '2 piece Embroidered Cotton net Suit', 9500,  'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(5, 'Raw silk lehnga',                     10800, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(5, '3 piece Embroidered Dobby Lawn suit', 12000, 'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(5, '2 piece embroidered suit',            8500,  'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(5, '3 piece embroidered suit',            6000,  'Stitched', 'Female', 'FitzoBrand', TRUE, NOW()),
(5, '2 piece embroidered organza suit',    7500,  'Stitched', 'Female', 'FitzoBrand', TRUE, NOW());
INSERT INTO Product 
(CategoryID, ProductName, Price, StitchType, Gender, Brand, IsActive, CreatedDate)
VALUES
(4, 'Embroidered Khussa', 2500, 'NotApplicable', 'Unisex', 'FitzoBrand', TRUE, NOW()),
(4, 'Classic Khussa',     2700, 'NotApplicable', 'Unisex', 'FitzoBrand', TRUE, NOW()),
(4, 'Formal Khussa',      2600, 'NotApplicable', 'Female', 'FitzoBrand', TRUE, NOW()),
(4, 'Dailywear Khussa',   3000, 'NotApplicable', 'Female', 'FitzoBrand', TRUE, NOW());

select * from product;


CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NULL,
    FullName VARCHAR(100),
    Email VARCHAR(100),
    OrderDateTime DATETIME,
    OrderStatus ENUM('Pending','Confirmed','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2),
    DeliveryFee DECIMAL(10,2) DEFAULT 0,
    DeliveryAddress VARCHAR(255),
    City VARCHAR(50),
    PostalCode VARCHAR(10)
);
INSERT INTO Orders 
(UserID, FullName, Email, OrderDateTime, OrderStatus, TotalAmount, City)
VALUES
(1, 'Test User', 'test@gmail.com', NOW(), 'Pending', 5000, 'Lahore');

ALTER TABLE Orders 
  ADD COLUMN Phone VARCHAR(20) AFTER Email;
select * from Orders;
SELECT SUM(TotalAmount) FROM Orders;
DESCRIBE Orders;



CREATE TABLE Size (
    SizeID INT PRIMARY KEY AUTO_INCREMENT,
    SizeName VARCHAR(10) UNIQUE NOT NULL
);
INSERT INTO Size (SizeID, SizeName) VALUES
(1, 'S'),
(2, 'M');

CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    SizeID INT NULL,
    Quantity INT,
    Price DECIMAL(10,2),
    SubTotal DECIMAL(10,2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (SizeID) REFERENCES Size(SizeID)
);
select * from OrderItems;

SELECT * FROM Orders WHERE UserID = 1;
SELECT OrderID, UserID FROM Orders;
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Product;
SELECT COUNT(*) FROM Orders;

SELECT * FROM Orders ORDER BY OrderID DESC LIMIT 10;
DESCRIBE Orders;

SELECT OrderID, UserID, Email, TotalAmount FROM Orders;
UPDATE Orders 
SET UserID = 2 
WHERE Email = 'hibaakram181@gmail.com';

SELECT * FROM Orders WHERE UserID = 2;
SELECT * FROM Orders WHERE UserID = 3;

Describe Orders;


 