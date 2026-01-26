import mysql from "mysql2";
import path from "path";

import dotenv from "dotenv";
// dotenv.config({ path: path.resolve("../.env") });
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

export async function getCustomerFromDb(email) {
  const customer = await pool.query("SELECT * FROM customers WHERE email = ?", [
    email,
  ]);
  return customer[0];
}

export async function getProductFromDb(name) {
  const product = await pool.query("SELECT * FROM products WHERE name =  ?", [
    name,
  ]);
  return product[0][0];
}

// console.log(process.env.MYSQL_USER);
// console.log(await getCustomerFromDb("nokwa@email"));
