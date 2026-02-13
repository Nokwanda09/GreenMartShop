import { pool } from "../config/database.js";

export async function addOrderToDb(customerId, total) {
  const order = await pool.query(
    "INSERT INTO orders(customer_id, total_amount) VALUES (?, ?)",
    [customerId, total],
  );

  return order;
}

export async function fetchLastOrderId(customer_id) {
  const order_id = await pool.query(
    `
    SELECT order_id FROM orders WHERE customer_id = ? ORDER BY order_id DESC LIMIT 1;
`,
    [customer_id],
  );

  return order_id[0][0].order_id;
}
