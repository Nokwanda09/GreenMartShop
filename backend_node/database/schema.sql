-- Products table, stores grocery items
CREATE TABLE products (
 product_id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 category VARCHAR(50),
 price DECIMAL(10,2) NOT NULL,
 stock INT NOT NULL,
 image VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );


--  Customers table, store customer information
CREATE TABLE customers (
 customer_id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(100) NOT NULL,
 email VARCHAR(100),
 phone VARCHAR(20),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Orders table, store order records. One-to-many relationship
CREATE TABLE orders (
 order_id INT AUTO_INCREMENT PRIMARY KEY,
 customer_id INT,
 total_amount DECIMAL(10,2),
 order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


-- Order items table, links items to orders. Many-to-many relationship
CREATE TABLE order_items (
 order_item_id INT AUTO_INCREMENT PRIMARY KEY,
 order_id INT,
 product_id INT,
 quantity INT,
 price DECIMAL(10,2),
 FOREIGN KEY (order_id) REFERENCES orders(order_id),
 FOREIGN KEY (product_id) REFERENCES products(product_id)
);




