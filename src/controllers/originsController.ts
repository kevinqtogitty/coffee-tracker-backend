import { Request, Response } from 'express';
import pool from '../db';

const getAllOrigins = async (req: Request, res: Response) => {
  const origins = await pool.query('SELECT * FROM origin;');
  res.status(200).json(origins.rows);
};

const getSingleOrigin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const origin = await pool.query('SELECT * FROM origin WHERE id = $1;', [id]);
  res.status(200).json(origin.rows[0]);
};

export { getAllOrigins, getSingleOrigin };
