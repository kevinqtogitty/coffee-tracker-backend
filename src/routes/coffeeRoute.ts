import { Router } from 'express';
import {
  addANewCoffee,
  deleteACoffee,
  getAllCoffees,
  getASingleCoffee,
  updateCoffeeData
} from '../controllers/coffeeController';

const coffeeRouter = Router();

coffeeRouter.get('/', getAllCoffees);
coffeeRouter.get('/:id', getASingleCoffee);

coffeeRouter.post('/', addANewCoffee);
coffeeRouter.delete('/:id', deleteACoffee);
coffeeRouter.put('/:id/:type', updateCoffeeData);

export default coffeeRouter;
