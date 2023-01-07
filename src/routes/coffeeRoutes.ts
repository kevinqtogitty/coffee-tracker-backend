import { Router } from 'express';
import {
  addANewCoffee,
  deleteACoffee,
  getAllCoffees,
  getASingleCoffee,
  updateCoffeeData
} from '../controllers/coffeeController';
import { tryCatch } from '../utils/tryCatch';

const coffeeRouter = Router();

coffeeRouter.get('/:userId', tryCatch(getAllCoffees));
coffeeRouter.get('/:id', tryCatch(getASingleCoffee));

coffeeRouter.post('/', tryCatch(addANewCoffee));
coffeeRouter.delete('/:id', tryCatch(deleteACoffee));
coffeeRouter.put('/:id/:type', tryCatch(updateCoffeeData));

export default coffeeRouter;
