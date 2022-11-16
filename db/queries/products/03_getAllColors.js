const getAllColors = (db) => {
  return db.query(`
    SELECT * FROM colors
    ORDER BY id;
  `);
};

module.exports = { getAllColors };