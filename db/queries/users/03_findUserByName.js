const findUserByName = (db, username) => {
  return db.query(`
  SELECT * FROM users WHERE name = $1`, [username]
  );
};

module.exports = { findUserByName };