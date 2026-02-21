import express from "express";

import {
  getCustomerController,
  registerCustomerController,
  loginCustomerController,
} from "../controllers/customerController.js";

import { refreshTokenController } from "../controllers/authController.js";

export const customerRouter = express.Router();

customerRouter.get("/:email", getCustomerController);
customerRouter.post("/register", registerCustomerController);
customerRouter.post("/login", loginCustomerController);
customerRouter.post("/refresh", refreshTokenController);
