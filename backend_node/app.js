import express from "express";
import cors from "cors";

import { productsRouter } from "./routes/productsRouter.js";

import {
  getProducts,
  getCustomer,
  getProduct,
  getProductsFromCategory,
} from "./service/service.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/", productsRouter);

// app.get("/products", async (req, res) => {
//   console.log("Getting productssssss");

//   const products = await getProducts();
//   console.log(products);
//   res.send(products);
// });

app.get("/customer/:email", async (req, res) => {
  // const email = ;
  const customer = await getCustomer(req.params.email);
  res.send(customer);
});

app.get("/:product", async (req, res) => {
  const product = await getProduct(req.params.product);

  res.send(product);
});

app.get("/category/:category", async (req, res) => {
  const products = await getProductsFromCategory(req.params.category);

  res.send(products);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
