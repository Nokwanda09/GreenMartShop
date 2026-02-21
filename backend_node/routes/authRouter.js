import express from "express";

export const authRouter = express.Router();

import {
  loginCustomerController,
  refreshTokenController,
} from "../controllers/authController.js";

authRouter.post("/login", loginCustomerController);
authRouter.post("/refresh", refreshTokenController);
