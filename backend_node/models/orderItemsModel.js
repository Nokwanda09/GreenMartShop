import { pool } from "../config/database.js";

export async function addOrderItem(orderId, productId, quantity, price) {
  const orderItem = await pool.query(
    `INSERT INTO 
    order_items(order_id, product_id, quantity, price) 
    VALUES (?, ?, ?, ?) `,
    [orderId, productId, quantity, price],
  );
}
