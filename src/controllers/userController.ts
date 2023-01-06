import { Request, Response } from 'express';
import pool from '../db';
import { User } from '../types/interfaces';

const createAUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userId, email } = req.body;
  const userCreated = await pool.query(
    'INSERT INTO coffee_user (id, first_name, last_name, email) VALUES ($1, $2, $3, $4);',
    [userId, firstName, lastName, email]
  );
  res.status(200).json(userCreated);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await pool.query('SELECT * FROM coffee_user');
  res.status(200).json(users);
};

const getASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await pool.query('SELECT * FROM coffee_user WHERE id = $1', [
    userId
  ]);
  res.status(200).json(user);
};

const updateUserData = async (req: Request, res: Response) => {
  const { userId, type } = req.params;
  const data = req.body;
  let updatedUser;
  switch (type) {
    case 'email':
      updatedUser = pool.query(
        'UPDATE coffee_user SET email = $1 WHERE id = $2',
        [data.dataToChange, userId]
      );
      break;
    case 'firstName':
      updatedUser = pool.query(
        'UPDATE coffee_user SET first_name = $1 WHERE id = $2',
        [data.dataToChange, userId]
      );
      break;
    case 'lastName':
      updatedUser = pool.query(
        'UPDATE coffee_user SET lastName = $1 WHERE id = $2',
        [data.dataToChange, userId]
      );
      break;
    default:
      break;
  }
  res.status(200).send(updatedUser);
};
const deleteASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userDeleted = await pool.query(
    'DELETE FROM COFFEE WHERE id = $1 RETURN *',
    [userId]
  );
  res.status(200).json(userDeleted);
};

export {
  getASingleUser,
  getAllUsers,
  updateUserData,
  deleteASingleUser,
  createAUser
};
