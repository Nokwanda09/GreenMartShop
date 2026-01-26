import express from "express";
import cors from "cors";

import { getProducts, getCustomer, getProduct } from "./service/service.js";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/products", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

app.get("/customer/:email", async (req, res) => {
  // const email = ;
  const customer = await getCustomer(req.params.email);
  res.send(customer);
});

app.get("/:product", async (req, res) => {
  const product = await getProduct(req.params.product);

  res.send(product);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
