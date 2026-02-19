import { getCustomerFromDb, addCustomerToDb } from "../models/customerModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function getCustomer(email) {
  const customer = await getCustomerFromDb(email);
  return customer;
}

// export async function getCustomerId(customerInfo) {
//   const existingCustomer = await getCustomer(customerInfo.email);
//   return existingCustomer[0].id;
// }

export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function passwordMatches(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}

export async function createAccount(customerDetails) {
  customerDetails.password = await hashPassword(customerDetails.password);
  const newCustomer = await addCustomerToDb(customerDetails);

  return newCustomer[0];
}

// export async function loginUser(credentials, customer) {
//   return generateAccessToken({
//     id: customer.id,
//     fullName: customer.full_name,
//   });
// }

// const i = {
//   id: 27,
//   full_name: "Nokwanda Mpungose",
//   email: "nokwandampu@gmail.com",
//   phone: "0632498956",
//   created_at: "2026-02-19T15:42:11.000Z",
//   address: "10 Mfula Rd",
//   password: "$2b$10$xco9K3B3MdbYy5TsCnnvle8tVyDyo1fS4JvJkZ8uryGqLgGhJsmfy",
// };

// const c = {
//   emailAddress: "nokwandampu@gmail.com",
//   password: "nokwanda123",
// };

// console.log(await loginUser(c, i));
