/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from "express";
import cors from "cors";
import { uuid } from "uuidv4";

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get("/products", (req, res) => {
  res.status(200).send(products);
});

app.post("/products", (req, res) => {
  const { code, description, buyPrice, sellPrice, tags } = req.body;

  const existingProduct = products.find((p) => p.code === code);

  const lov = existingProduct ? existingProduct.lovers : 0;

  const product = {
    id: uuid(),
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
    lovers: lov,
  };

  products.push(product);

  res.status(201).send(product);
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { description, buyPrice, sellPrice, tags } = req.body;

  const productIndex = products.findIndex((v) => v.id === id);

  if (productIndex !== -1) {
    products[productIndex].description = description;
    products[productIndex].buyPrice = buyPrice;
    products[productIndex].sellPrice = sellPrice;
    products[productIndex].tags = tags;

    res.status(200).send(products[productIndex]);
  } else {
    res.status(400).send({ msg: "Product not found" });
  }
});

app.delete("/products/:code", (request, response) => {
  // TODO: Implementar lógica para deletar produtos pelo código
});

app.post("/products/:code/love", (request, response) => {
  // TODO: Implementar lógica para incrementar o número de lovers de produtos pelo código
});

app.get("/products/:code", (request, response) => {
  // TODO: Implementar lógica para buscar produtos pelo código
});

export default app;
