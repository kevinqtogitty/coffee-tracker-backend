import { Router } from 'express';
import {
  getAllOrigins,
  getSingleOrigin
} from '../controllers/originsController';
import { tryCatch } from '../utils/tryCatch';

const originsRouter = Router();

originsRouter.get('/', tryCatch(getAllOrigins));
originsRouter.get('/:id', tryCatch(getSingleOrigin));

export default originsRouter;
