import {
  getProductsFromDb,
  getProductFromDb,
  getProductsFromSpecificCarFromDb,
} from "../database/database.js";

export async function getProducts() {
  return await getProductsFromDb();
}

export async function getProduct(name) {
  return await getProductFromDb(name);
}

export async function getProductsFromCategory(category) {
  return await getProductsFromSpecificCarFromDb(category);
}
