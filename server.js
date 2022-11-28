require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 5001 || process.env.PORT;


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

app.use("/api/products", productsRoute(db));
app.use("/create-checkout-session", stripe());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
