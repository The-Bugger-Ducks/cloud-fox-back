import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

import * as dotenv from 'dotenv'
dotenv.config();

import routes from './routes';
import { AppDataSource } from "./data-source"

// establish database connection
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })


const PORT = process.env.PORT || 3333

const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`));