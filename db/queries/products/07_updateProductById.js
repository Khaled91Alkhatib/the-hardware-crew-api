const updateProductById = (db, id, product) => {
  return db.query(`
  UPDATE products
  SET category_id = $1,
      color_id = $2,
      name = $3,
      description = $4,
      image1 = $5,
      image2 = $6,
      image3 = $7,
      price = $8,
      display = $9
  WHERE id = $10
  RETURNING *;`,
    [product.category_id, product.color_id,
    product.name, product.description,
    product.image1, product.image2, product.image3,
    product.price * 100, product.display, id]);
};

module.exports = { updateProductById };