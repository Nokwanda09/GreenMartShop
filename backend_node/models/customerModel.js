import { pool } from "../config/database.js";

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
      customerInfo.fullName,
      customerInfo.email,
      customerInfo.phoneNumber,
      customerInfo.address,
    ],
  );

  return await getCustomerFromDb(customerInfo.email);
}
