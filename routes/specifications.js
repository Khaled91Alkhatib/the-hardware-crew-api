const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../db/queries/products/02_getAllCategories');
const { getAllColors } = require('../db/queries/products/03_getAllColors');

module.exports = (db) => {

  router.get('/', (req, res) => {
    const categories = getAllCategories(db);
    const colors = getAllColors(db);

    Promise.all([categories, colors])
      .then(([data1, data2]) => {
        const colors = data2.rows;
        const categories = data1.rows;
        res.json({ colors, categories });
        return;
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  return router;
};