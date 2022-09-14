import 'dotenv/config'

import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  "type": "postgres",
  "host": process.env.DB_HOST || 'localhost',
  "port": parseInt(process.env.DB_PORT),
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": [
    "src/app/entities/*.ts"
  ],
  "migrations": [
    "src/database/migrations/*.ts"
  ],
  synchronize: false,
  logging: false,
  subscribers: [],
  ssl: process.env.DB_SSL === 'true'
});