import { Request, Response } from 'express';
import pool from '../db';
import {
  queryCreateAUser,
  queryDeleteAUser,
  queryGetASingleUser,
  queryUpdateUserData
} from '../queries/queries';
import { User } from '../types/interfaces';
import { client, expiration } from '..';

const createAUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userId, email } = req.body;
  const userCreated = await pool.query(`${queryCreateAUser}`, [
    userId,
    firstName,
    lastName,
    email
  ]);

  res.status(201).json(userCreated);
};

const getASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const cachedUser = await client.get('currentUser');
    if (!cachedUser) {
      const user = await pool.query(`${queryGetASingleUser}`, [userId]);
      await client.setEx(
        'currentUser',
        expiration,
        JSON.stringify(user.rows[0])
      );
      res.status(200).json(user.rows[0]);
    } else {
      res.status(200).json(JSON.parse(cachedUser));
    }
  } catch (error) {}
};

const updateUserData = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data: User = req.body;
  const updatedUser = await pool.query(`${queryUpdateUserData}`, [
    data.firstName,
    data.lastName,
    data.email,
    userId
  ]);

  res.status(200).send(updatedUser);
};
const deleteASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userDeleted = await pool.query(`${queryDeleteAUser}`, [userId]);

  res.status(200).json(userDeleted);
};

export { getASingleUser, updateUserData, deleteASingleUser, createAUser };
