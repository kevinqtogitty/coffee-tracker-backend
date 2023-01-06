import { Router } from 'express';
import {
  createAUser,
  deleteASingleUser,
  getAllUsers,
  getASingleUser,
  updateUserData
} from '../controllers/userController';
import { tryCatch } from '../utils/tryCatch';

const userRouter = Router();

userRouter.post('/', tryCatch(createAUser)); // create a user
userRouter.get('/', tryCatch(getAllUsers)); // get all users
userRouter.get('/id', tryCatch(getASingleUser)); // get single user
userRouter.put('/:id/:type', tryCatch(updateUserData)); // update user data
userRouter.delete('/:id', tryCatch(deleteASingleUser)); // delete single user

export default userRouter;
