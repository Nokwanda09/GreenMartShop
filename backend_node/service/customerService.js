import { getCustomerFromDb, addCustomerToDb } from "../models/customerModel.js";

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
