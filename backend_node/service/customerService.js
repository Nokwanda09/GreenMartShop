import { getCustomerFromDb, addCustomerToDb } from "../models/customerModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function getCustomer(email) {
  const customer = await getCustomerFromDb(email);
  return customer;
}

export async function getCustomerId(customerInfo) {
  const existingCustomer = await getCustomer(customerInfo.email);
  if (existingCustomer.length !== 0) {
    return existingCustomer[0].id;
  } else {
    const newCustomer = await addCustomerToDb(customerInfo);
    return newCustomer[0].id;
  }
}

function generateAccessToken(payload) {
  return jwt.sign({ name: "Nokwanda" }, process.env.ACCESS_TOKEN_SECRET);
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function passwordMatches(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}

export async function createAccount(customerDetails) {
  customerDetails.password = await hashPassword(customerDetails.password);
  const newCustomer = await addCustomerToDb(customerDetails);

  return newCustomer[0];
}
