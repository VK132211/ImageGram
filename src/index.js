const express = require("express");
const { default: connectDB } = require("./config/dbConfig");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.json("welcome");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
