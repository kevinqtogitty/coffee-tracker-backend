import { Router } from 'express';
import {
  createAUser,
  deleteASingleUser,
  getAllUsers,
  getASingleUser,
  updateUserData
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/', createAUser); // create a user
userRouter.get('/', getAllUsers); // get all users
userRouter.get('/id', getASingleUser); // get single user
userRouter.put('/:id/:type', updateUserData); // update user data
userRouter.delete('/:id', deleteASingleUser); // delete single user

export default userRouter;
