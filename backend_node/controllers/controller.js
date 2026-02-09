import {
  getProducts,
  getCustomer,
  getProduct,
  getProductsFromCategory,
} from "../service/service.js";

export const getProductsController = async (req, res) => {
  const products = await getProducts();
  res.send(products);
};
