import express from "express";

import { getCustomerController } from "../controllers/customerController.js";

export const customerRouter = express.Router();

customerRouter.get("/:email", getCustomerController);
