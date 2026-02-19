import express from "express";

import {
  getCustomerController,
  getCustomerIdController,
  registerCustomerController,
  loginCustomerController,
} from "../controllers/customerController.js";

export const customerRouter = express.Router();

customerRouter.get("/:email", getCustomerController);
customerRouter.post("/", getCustomerIdController);
customerRouter.post("/register", registerCustomerController);
customerRouter.post("/login", loginCustomerController);
