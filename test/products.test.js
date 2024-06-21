import request from "supertest";

import app from "../src/app";
import { response } from "express";

let products;

beforeEach(() => {
  products = [
    {
      code: 12,
      description: "descriaçao valida",
      buyPrice: 4000,
      sellPrice: 8000,
      tags: ["tec", "cui", "apple"],
    },
    {
      code: 12,
      description: "descrdsadsdiaçao valida",
      buyPrice: 400333330,
      sellPrice: 803333300,
      tags: ["te33333c", "cu3333i", "app33333le"],
    },
  ];
});

test("Deve ser possivel adicionar um novo produto", async () => {
  const response = await request(app).post("/products").send(products[0]);
  expect(response.status).toBe(201);
  expect(response.body).toMatchObject({
    ...products[0],
    lovers: 0,
  });
});

test("Não deve ser possível adicionar um produto igual a outro", async () => {
  const response0 = await request(app).post("/products").send(products[0]);
  const response1 = await request(app).post("/products").send(products[0]);

  expect(response0.status).toBe(201)
  expect(response1.status).toBe(400)

});

test("Deve ser possivel listar os produtos", async () => {
  await request(app).post("/products").send(products[0]);
  await request(app).post("/products").send(products[1]);

  const response = await request(app).get("/products");

  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining(products[0]),
      expect.objectContaining(products[1]),
    ])
  );
});

test("Deve ser possível atualizar um produto", async () => {
  const obj = await request(app).post("/products").send(products[0]);

  const objUp = {
    ...products[0],
    description: "samsungo",
  };

  const response = await request(app)
    .put(`/products/${obj.body.id}`)
    .send(objUp);

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(objUp);
});

test("Não deve ser possível editar um produto que nao existe", async () => {
  const response = await request(app).put(`/products/1212312`);
  expect(response.status).toBe(400);
});

test("Deletar produto", async () => {
  const obj = await request(app).post("/products").send(products[0]);
  const response = await request(app).delete(`/products/${obj.body.code}`);
  expect(response.status).toBe(200);
});

test("Não deve ser possivel deletar um produto que não existe", async () => {
  const response = await request(app).delete("/products/1212312");
  expect(response.status).toBe(400);
});
