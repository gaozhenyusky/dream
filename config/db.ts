import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'gao',
  database: process.env.DB_NAME || 'dream',
  port: Number(process.env.DB_PORT) || 3306,
}; 