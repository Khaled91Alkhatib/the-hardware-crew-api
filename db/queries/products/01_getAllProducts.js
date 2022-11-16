const getAllProducts = (db) => {
  return db.query(`
    SELECT
    products.id as id,
    categories.id as category_id,
    categories.category as category,
    colors.id as color_id,
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
    ORDER BY products.id;
  `);
};

module.exports = { getAllProducts };