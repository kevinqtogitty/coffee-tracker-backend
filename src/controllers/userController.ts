import { Request, Response } from 'express';
import pool from '../db';
import {
  queryCreateAUser,
  queryDeleteAUser,
  queryGetAllUsers,
  queryGetASingleUser,
  queryUpdateUserEmail,
  queryUpdateUserFirstName,
  queryUpdateUserLastName
} from '../queries/queries';

const createAUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userId, email } = req.body;
  const userCreated = await pool.query(`${queryCreateAUser}`, [
    userId,
    firstName,
    lastName,
    email
  ]);

  if (!userCreated.ok)
    throw new Error(`HTTP error! status: ${userCreated.status}`);

  res.status(201).json(userCreated);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await pool.query(`${queryGetAllUsers}`);
  if (!users.ok) throw new Error(`HTTP error! status: ${users.status}`);

  res.status(200).json(users.rows);
};

const getASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await pool.query(`${queryGetASingleUser}`, [`${userId}`]);
  if (!user.ok) throw new Error(`HTTP error! status: ${user.status}`);

  res.status(200).json(user.rows[0]);
};

const updateUserData = async (req: Request, res: Response) => {
  const { userId, type } = req.params;
  const data = req.body;
  let updatedUser;
  switch (type) {
    case 'email':
      updatedUser = pool.query(`${queryUpdateUserEmail}`, [
        data.dataToChange,
        userId
      ]);
      break;
    case 'firstName':
      updatedUser = pool.query(`${queryUpdateUserFirstName}`, [
        data.dataToChange,
        userId
      ]);
      break;
    case 'lastName':
      updatedUser = pool.query(`${queryUpdateUserLastName}`, [
        data.dataToChange,
        userId
      ]);
      break;
    default:
      break;
  }
  if (!updatedUser.ok)
    throw new Error(`HTTP error! status: ${updatedUser.status}`);

  res.status(200).send(updatedUser);
};
const deleteASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userDeleted = await pool.query(`${queryDeleteAUser}`, [userId]);
  if (!userDeleted.ok)
    throw new Error(`HTTP error! status: ${userDeleted.status}`);

  res.status(200).json(userDeleted);
};

export {
  getASingleUser,
  getAllUsers,
  updateUserData,
  deleteASingleUser,
  createAUser
};
