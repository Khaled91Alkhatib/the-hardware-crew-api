require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;


const { Client } = require('pg');
const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const productsRoute = require("./routes/products");
const stripe = require("./routes/stripe");
const users = require("./routes/users");
const specifications = require("./routes/specifications");

app.use("/api/products", productsRoute(db));
app.use("/create-checkout-session", stripe());
app.use("/users", users(db));
app.use("/specifications", specifications(db));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
