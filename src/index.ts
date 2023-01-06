import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';

import coffeeRouter from './routes/coffeeRoute';
import originsRouter from './routes/originsRoutes';
import userRouter from './routes/userRoutes';
import errorHandler from './middleware/errorHandler';

app.use(express.json());
app.use(cors());

app.use('/origins', originsRouter);
app.use('/coffee', coffeeRouter);
app.use('/user', userRouter);

app.use(errorHandler);

app.listen('3001', (): void => {
  console.log('Server Running!');
});
