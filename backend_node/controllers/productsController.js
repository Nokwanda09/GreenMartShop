import {
  getProducts,
  getProduct,
  getProductsFromCategory,
} from "../service/productService.js";

export const getProductsController = async (req, res) => {
  const products = await getProducts();
  if (products) {
    res.status(201).json({ products: products });
  } else {
    res.status(404).json({ error: "Products Not Found" });
  }
};

export const getProductController = async (req, res) => {
  const productName = req.params.productName;

  if (!productName) res.status(400).json({ error: "Product name is missing" });

  const product = await getProduct(productName);
  if (product) {
    res.status(201).json({ product: product });
  } else {
    res.status(404).json({ error: "Product Not Found" });
  }
};

export const getProductsFromCategoryController = async (req, res) => {
  const category = req.params.category;

  if (!category) res.status(400).json({ error: "Product category is missing" });

  const products = await getProductsFromCategory(req.params.category);

  if (products) {
    res.status(201).json({ products: products });
  } else {
    res.status(201).json({ products: products });
  }
};
