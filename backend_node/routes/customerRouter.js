import express from "express";

import {
  getCustomerController,
  getCustomerIdController,
} from "../controllers/customerController.js";

export const customerRouter = express.Router();

customerRouter.get("/:email", getCustomerController);
customerRouter.post("/", getCustomerIdController);
