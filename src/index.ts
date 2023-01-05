import express, { Request, Response } from 'express';
import { getAllCoffees } from './controllers/coffeeController';
const app = express();

import pool from './db';
import coffeeRouter from './routes/coffeeRoute';
import originsRouter from './routes/originsRoutes';

app.use(express.json());

app.use('/origins', originsRouter);
app.use('/coffee', coffeeRouter);

app.listen('3001', (): void => {
  console.log('Server Running!');
});
