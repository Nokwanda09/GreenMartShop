import express from "express";

import {
  getProducts,
  getCustomer,
  getProduct,
  getProductsFromCategory,
} from "../service/service.js";

import { getProductsController } from "../controllers/controller.js";

// console.log(getProductsController);

export const productsRouter = express.Router();

// productsRouter.get("/products", async (req, res) => {
//   const products = await getProducts();
//   res.send(products);
// });

productsRouter.get("/products", getProductsController);

// export default pro/ductsRouter;
