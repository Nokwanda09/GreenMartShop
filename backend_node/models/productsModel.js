import { pool } from "../config/database.js";

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

export async function updateStockAmount(updatedStockAmount, productName) {
  const stockAmount = await pool.query(
    `
  UPDATE products
  SET stock = ?
  WHERE name = ?;
`,
    [updatedStockAmount, productName],
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

// const products = await getProductsFromSpecificCarFromDb("fruits");
// console.log(products);
