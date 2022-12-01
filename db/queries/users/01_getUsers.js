const getAllUsers = (db) => {
  return db.query(`
    SELECT
    users.id as id,
    users.name as name,
    users.password as password

    FROM users
    ORDER BY users.id;
  `);
};

module.exports = { getAllUsers }