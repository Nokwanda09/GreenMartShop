import express from "express";

import { addOrderController } from "../controllers/orderController.js";

import { authenticateToken } from "../controllers/authController.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", authenticateToken, addOrderController);
