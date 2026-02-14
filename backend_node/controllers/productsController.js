import {
  getProducts,
  getProduct,
  getProductsFromCategory,
} from "../service/productService.js";

export const getProductsController = async (req, res) => {
  const products = await getProducts();
  res.status(201).json({ products: products });
};

export const getProductController = async (req, res) => {
  const productName = req.params.productName;

  if (!productName) res.status(401).json({ error: "Product name is missing" });

  const product = await getProduct(productName);
  res.status(201).json({ product: product });
};

export const getProductsFromCategoryController = async (req, res) => {
  const category = req.params.category;

  if (!category) res.status(400).json({ error: "Product category is missing" });

  const products = await getProductsFromCategory(req.params.category);

  res.status(201).json({ products: products });
};
