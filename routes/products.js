const express = require('express');
const router = express.Router();

const { getAllProducts } = require('../db/queries/products/01_getAllProducts')

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

  return router;
};