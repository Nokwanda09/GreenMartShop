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
    customers(full_name, email, phone, address, password) 
    VALUES (?, ?, ?, ?, ?
   )`,
    [
      customerInfo.fullName,
      customerInfo.emailAddress,
      customerInfo.phoneNumber,
      customerInfo.deliveryAddress,
      customerInfo.password,
    ],
  );

  return await getCustomerFromDb(customerInfo.emailAddress);
}
