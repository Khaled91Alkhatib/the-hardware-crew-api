const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../db/queries/users/01_getUsers');
const { addUsers } = require('../db/queries/users/02_addUsers');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const allUsers = getAllUsers(db);
    Promise.all([allUsers])
      .then(([data]) => {
        const users = data.rows;
        res.json({ users });
        return;
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  router.post("/", (req, res) => {
    // console.log('elyoom', req.body);
    const username = req.body.username;
    const password = req.body.password;

    addUsers(db, username, password)
      .then(data => {
        const newUser = data.rows[0];
        // console.log(newUser);
        res.json({ newUser });
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  return router;
};