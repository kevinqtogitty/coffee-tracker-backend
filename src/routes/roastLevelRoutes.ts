import { Router } from 'express';
import { getAllRoastLevels } from '../controllers/roastLevelController';
import { tryCatch } from '../utils/tryCatch';

const roastLevelRouter = Router();

roastLevelRouter.get('/', tryCatch(getAllRoastLevels));

export default roastLevelRouter;
