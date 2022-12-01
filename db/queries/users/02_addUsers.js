const addUsers = (db, username, password) => {
  return db.query(`
  INSERT INTO users
  (name, password)
  VALUES ($1, $2)
  RETURNING *;`, [username, password]);
};

module.exports = { addUsers };