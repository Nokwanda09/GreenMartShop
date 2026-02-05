import {
  getProductsFromDb,
  getCustomerFromDb,
  getProductFromDb,
  getProductsFromSpecificCarFromDb,
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

async function customerExists(email) {
  const customer = getCustomer(email);
  if (customer) return true;
  return false;
}

async function addOrder() {
  if (customerExists(email)) {
    // Add order to the order table
  } else {
    // Add customer to the database, then to the order table
  }
}

console.log(getCustomer("nokwa@email"));
