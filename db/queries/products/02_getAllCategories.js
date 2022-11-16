const getAllCategories = (db) => {
  return db.query(`
    SELECT * FROM categories
    ORDER BY id;
  `);
};

module.exports = { getAllCategories };