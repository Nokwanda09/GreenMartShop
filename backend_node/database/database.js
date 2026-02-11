import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

// Pool of connections to the database
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Returns the list of products from the database
export async function getProductsFromDb() {
  const products = await pool.query("SELECT * FROM products");
  return products[0];
}

export async function getProductFromDb(name) {
  const product = await pool.query("SELECT * FROM products WHERE name =  ?", [
    name,
  ]);
  return product[0][0];
}

export async function getProductsFromSpecificCarFromDb(category) {
  const products = await pool.query(
    "SELECT * FROM products WHERE category = ?",
    [category],
  );

  return products[0];
}

export async function getCustomerFromDb(email) {
  const customer = await pool.query("SELECT * FROM customers WHERE email = ?", [
    email,
  ]);
  return customer[0];
}

export async function addCustomerToDb(customerInfo) {
  const customer = await pool.query(
    `INSERT INTO 
    customers(full_name, email, phone, address) 
    VALUES (?, ?, ?, ?
   )`,
    [
      customerInfo.full_name,
      customerInfo.email,
      customerInfo.phone_number,
      customerInfo.address,
    ],
  );

  return await getCustomerFromDb(customerInfo.email);
}

export async function addOrderToDb(customerId, total) {
  const order = await pool.query(
    "INSERT INTO orders(customer_id, total_amount) VALUES (?, ?)",
    [customerId, total],
  );

  return order;
}

export async function addOrderItem(order_id, product_id, quantity, price) {
  const orderItem = await pool.query(
    `INSERT INTO 
    order_items(order_is, product_id, quantity, price) 
    VALUES ?, ?, ?, ? `,
    order_id,
    product_id,
    quantity,
    price,
  );
}

export async function getItemPriceFromDb(itemName) {
  const price = await pool.query(
    `
    SELECT price FROM products
    WHERE name= ?`,
    itemName,
  );
  return price[0][0].price;
}
