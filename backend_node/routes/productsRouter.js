import express from "express";

import {
  getProductsController,
  getProductController,
  getProductsFromCategoryController,
} from "../controllers/productsController.js";

export const productsRouter = express.Router();

productsRouter.get("/", getProductsController);

productsRouter.get("/:productName", getProductController);

productsRouter.get("/category/:category", getProductsFromCategoryController);
