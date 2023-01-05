import { Request, Response } from 'express';
import pool from '../db';

const getAllOrigins = async (req: Request, res: Response) => {
  try {
    const origins = await pool.query('SELECT * FROM origin;');
    res.json(origins.rows);
    console.log(origins.rows);
  } catch (error) {
    console.log(error);
  }
};

const getSingleOrigin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const origin = await pool.query('SELECT * FROM origin WHERE id = $1;', [
      id
    ]);
    res.json(origin.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export { getAllOrigins, getSingleOrigin };
