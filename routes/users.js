const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../db/queries/users/01_getUsers');
const { addUsers } = require('../db/queries/users/02_addUsers');
const { findUserByName } = require('../db/queries/users/03_findUserByName');

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

    findUserByName(db, username)
      .then((data) => {
        // console.log("dtata1")
        if (!data.rows[0]) {
          addUsers(db, username, password)
            .then(data => {
              // console.log("data")
              const newUser = data.rows[0];
              // console.log(newUser);
              res.json({ newUser });
            });
        } else {
          res.json({ errCode: 1002, errMsg: 'Username Already Taken!' });
        }
      })
      .catch(err => {
        res.status(500).json(`error: ${err.message}`);
      });
  });

  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
      "SELECT * FROM users WHERE name = $1 AND password = $2", [username, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }

        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Invalid Credentials!" });
        }
      }
    );
  });

  return router;
};