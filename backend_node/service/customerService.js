import { getCustomerFromDb, addCustomerToDb } from "../models/customerModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function getCustomer(email) {
  const customer = await getCustomerFromDb(email);
  return customer;
}

export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
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
