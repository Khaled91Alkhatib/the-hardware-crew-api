const addNewProduct = (db, sku, category, color, name, description, image1, image2, image3, price, display) => {
  return db.query(`
  INSERT INTO products
  (sku, category_id, color_id, name, description, image1, image2, image3, price, display)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;`, [sku, category, color,
    name, description, image1, image2,
    image3, price * 100, display]);
};

module.exports = { addNewProduct };