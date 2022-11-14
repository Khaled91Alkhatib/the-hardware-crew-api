const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = 5001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
