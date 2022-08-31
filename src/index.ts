import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config();
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

// import "./database/connect";
import routes from './routes';

const PORT = process.env.PORT || 3333

const app = express();
app.use(express.json());
app.use(cors())
app.use(routes);


app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`));