import pool from '../db';
import { Request, Response } from 'express';
import { queryGetAllOrigins, queryGetSingleOrigin } from '../queries/queries';

const getAllOrigins = async (req: Request, res: Response) => {
  const origins = await pool.query(`${queryGetAllOrigins}`);
  if (!origins.ok) throw new Error(`HTTP error! status: ${origins.status}`);
  res.status(200).json(origins.rows);
};

const getSingleOrigin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const origin = await pool.query(`${queryGetSingleOrigin}`, [id]);
  if (!origin.ok) throw new Error(`HTTP error! status: ${origin.status}`);
  res.status(200).json(origin.rows[0]);
};

export { getAllOrigins, getSingleOrigin };
