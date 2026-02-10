import express from "express";

import { addOrderController } from "../controllers/orderController.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", addOrderController);
