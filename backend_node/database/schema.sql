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


-- Insert values to the products table
INSERT INTO products 
(name, category, price, stock, image) 
VALUES 
("banana", "fruits", 22.99, 50, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769187475/banana_lnvwy5.jpg"),
("pears", "fruits", 20.79, 60, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255999/pears_kmruto.webp"),
("oranges", "fruits", 21.69, 100, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255999/oranges_b1izxb.jpg"),
("grapes", "fruits", 19.99, 40, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255999/grapes_dinej1.jpg"),
("apples", "fruits", 25.99, 60, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255999/apples_gievhv.jpg"),
("tomato", "vegetables", 23.99, 40, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769187479/tomato_wlr799.jpg"),
("cabbage", "vegetables", 10.99, 40, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/cabbage_y4ivte.jpg"),
("carrot", "vegetables", 15.99, 40, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/carrot_ykfq2f.jpg"),
("betroot", "vegetables", 20.49, 40, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/betroot_mqtwmi.jpg"),
("rice", "grains", 45.99, 20, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769187476/rice_tvyqpf.jpg"),
("couscous", "grains", 45.99, 20, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/corscous_ewygze.jpg"),
("maize meal", "grains", 45.99, 20, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/milie_milie_kxxz9d.jpg"),
("orange juice", "bevarages", 22.99, 50, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769187475/orange_juice_nsxzpv.jpg"),
("wine", "bevarages", 46.99, 50, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769257575/wine_dwycyu.webp"),
("coca-cola", "bevarages", 12.99, 50, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769257575/coca-cola_nomu9k.webp"),
("redbull", "bevarages", 11.99, 50, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769257575/redbull_i4avyy.webp"),
("bread", "bakery", 18.89, 25, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769187479/whole_wheat_bread_sr9eq6.jpg"),
("cake", "bakery", 18.89, 10, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/cake_hm2z4o.jpg"),
("croissant", "bakery", 18.89, 10, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/crossaint_atuob9.jpg"),
("pizza", "bakery", 18.89, 10, "https://res.cloudinary.com/drtwd64vv/image/upload/v1769255998/pizza_ubpr0b.jpg");


 
