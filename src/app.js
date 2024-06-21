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

  // if(existingProduct){
  //   return res.status(400).send({msg: 'Nao é possivel adicionar um produto igual a outro'})
  // }
  
  const lov = existingProduct ? existingProduct.lovers : 0;

  let product = {
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

  const p = products.findIndex((v) => v.id === id);

  if (p !== -1) {
    products[p].description = description;
    products[p].buyPrice = buyPrice;
    products[p].sellPrice = sellPrice;
    products[p].tags = tags;

    res.status(200).send(products[p]);
  } else {
    res.status(400).send({ msg: "Product not found" });
  }
});

app.delete("/products/:code", (req, res) => {
  const { code } = req.params;

  const index = products.findIndex((v) => v.code == code);

  if (index === -1) {
    return res.status(400).send({ msg: "nao encontrado" });
  }

  products = products.filter((v) => v.code != code);
  res.status(200).send({ msg: "produto deletado com sucesso" });
});

app.post("/products/:code/love", (req, res) => {
  // TODO: Implementar lógica para incrementar o número de lovers de produtos pelo código
});

app.get("/products/:code", (req, res) => {
  // TODO: Implementar lógica para buscar produtos pelo código
});

export default app;
