const express = require('express');
const router = express.Router();

const { getAllProducts } = require('../db/queries/products/01_getAllProducts');
const { getProductById } = require('../db/queries/products/04_getProductById');
const { addNewProduct } = require('../db/queries/products/05_addNewProduct');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const allProducts = getAllProducts(db);

    Promise.all([allProducts])
      .then(([data]) => {
        const products = data.rows;
        res.json({ products });
        return;
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  router.get("/:id", (req, res) => {
    const currentId = req.params.id;
    const productById = getProductById(db, currentId);
    Promise.all([productById])
      .then(([data]) => {
        const product = data.rows[0];
        res.json({ product });
        return;
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  router.post("/", (req, res) => {
    console.log('new product', req.body);
    const sku = req.body.sku;
    const category = req.body.category;
    const color = req.body.color;
    const name = req.body.name;
    const description = req.body.description;
    const image1 = req.body.image1;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const price = req.body.price;
    const display = req.body.display;

    addNewProduct(db, sku, category, color, name, description, image1, image2, image3, price, display)
      .then(data => {
        console.log('data', data);
        // if (sku === "" ||
        //   category === "" ||
        //   color === "" ||
        //   name === "" ||
        //   description === "" ||
        //   image1 === null ||
        //   price === ""
        // ) {
        //   res.json({ errCode: 1001, errMsg: `Error: Please fill required fields!` });
        //   return
        // }
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  return router;
};