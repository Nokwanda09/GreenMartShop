import mysql from "mysql2";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });

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
export async function getProducts() {
  return await pool.query("SELECT * FROM products")[0];
}

export async function getCustomer(email) {
  return await pool.query("SELECT * FROM customers WHERE email = ?", [email]);
}

export async function getProductId(name) {
  return await pool.query("SELECT * FROM products WHERE ?", [name]);
}

console.log(await getProducts());
