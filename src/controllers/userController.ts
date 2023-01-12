import { Request, Response } from 'express';
import pool from '../db';
import {
  queryCreateAUser,
  queryDeleteAUser,
  queryGetAllUsers,
  queryGetASingleUser,
  queryUpdateUserData
} from '../queries/queries';
import { User } from '../types/interfaces';

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

const getAllUsers = async (req: Request, res: Response) => {
  const users = await pool.query(`${queryGetAllUsers}`);

  res.status(200).json(users.rows);
};

const getASingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await pool.query(`${queryGetASingleUser}`, [userId]);
  res.status(200).json(user.rows[0]);
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

export {
  getASingleUser,
  getAllUsers,
  updateUserData,
  deleteASingleUser,
  createAUser
};
