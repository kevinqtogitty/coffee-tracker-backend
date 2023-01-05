import express, { Request, Response } from 'express';
import { getAllCoffees } from './controllers/coffeeController';
const app = express();

import coffeeRouter from './routes/coffeeRoute';
import originsRouter from './routes/originsRoutes';
import userRouter from './routes/userRoutes';

app.use(express.json());

app.use('/origins', originsRouter);
app.use('/coffee', coffeeRouter);
app.use('/user', userRouter);

app.listen('3001', (): void => {
  console.log('Server Running!');
});
