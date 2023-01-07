import { Router } from 'express';
import { getAllProcesses } from '../controllers/processesController';
import { tryCatch } from '../utils/tryCatch';

const processesRouter = Router();

processesRouter.get('/', tryCatch(getAllProcesses));
export default processesRouter;
