import express from "express";
import cors from "cors";

import { productsRouter } from "./routes/productsRouter.js";
import { customerRouter } from "./routes/customerRouter.js";
import { ordersRouter } from "./routes/orderRoutes.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/products", productsRouter);
app.use("/customer", customerRouter);
app.use("/order", ordersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
