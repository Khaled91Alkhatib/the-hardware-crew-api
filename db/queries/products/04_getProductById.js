const getProductById = (db, id) => {
  return db.query(`
  SELECT
  products.id as id,
  products.sku as sku,
  categories.id as category_id,
  categories.category as category,
  colors.id as color_id,
  colors.color as color,
  products.name as name,
  products.description as description,
  products.image1 as image1,
  products.image2 as image2,
  products.image3 as image3,
  products.price as price,
  products.display as display

  FROM products
  JOIN categories ON category_id = categories.id
  JOIN colors ON color_id = colors.id
  WHERE products.id = $1`, [id]
  );
};

module.exports = { getProductById }; 