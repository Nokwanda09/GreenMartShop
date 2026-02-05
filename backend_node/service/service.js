import {
  getProductsFromDb,
  getCustomerFromDb,
  getProductFromDb,
  getProductsFromSpecificCarFromDb,
  addCustomerToDb,
} from "../database/database.js";

export async function getProducts() {
  return await getProductsFromDb();
}

export async function getCustomer(email) {
  const customer = await getCustomerFromDb(email);
  return customer;
}

export async function getProduct(name) {
  return await getProductFromDb(name);
}

export async function getProductsFromCategory(category) {
  return await getProductsFromSpecificCarFromDb(category);
}

async function getCustomerId(customerInfo) {
  const existingCustomer = await getCustomer(customerInfo.email);
  if (existingCustomer.length !== 0) {
    return existingCustomer[0].id;
  } else {
    const newCustomer = await addCustomerToDb(customerInfo);
    return newCustomer[0].id;
  }
}

async function addOrder() {
  if (customerExists(email)) {
    // Add order to the order table
  } else {
    // Add customer to the database, then to the order table
  }
}

const customerId = await getCustomerId({
  full_name: "Sing",
  email: "sing@gmail.com",
  phone_number: "0345673432",
  address: "1 Sa Rd",
});

console.log(customerId);
