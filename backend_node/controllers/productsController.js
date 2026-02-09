import {
  getProducts,
  getProduct,
  getProductsFromCategory,
} from "../service/service.js";

export const getProductsController = async (req, res) => {
  const products = await getProducts();
  res.send(products);
};

export const getProductController = async (req, res) => {
  const product = await getProduct(req.params.productName);
  res.send(product);
};

export const getProductsFromCategoryController = async (req, res) => {
  console.log(req.params.category);
  const products = await getProductsFromCategory(req.params.category);

  res.send(products);
};
