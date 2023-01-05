import { Router } from 'express';
import {
  getAllOrigins,
  getSingleOrigin
} from '../controllers/originsController';

const originsRouter = Router();

originsRouter.get('/', getAllOrigins);
originsRouter.get('/:id', getSingleOrigin);

export default originsRouter;
