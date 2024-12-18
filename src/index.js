const express = require("express");
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './utils/swaggerOptions.js';
const { default: connectDB } = require("./config/dbConfig");
import apiRouter from "./routers/apiRouter.js";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json("Welcome");
});

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
