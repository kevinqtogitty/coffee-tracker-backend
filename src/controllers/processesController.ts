import pool from '../db';
import { Response, Request } from 'express';
import { queryGetAllProcesses } from '../queries/queries';

const getAllProcesses = async (req: Request, res: Response) => {
  const coffeeProcesses = await pool.query(`${queryGetAllProcesses}`);
  if (!coffeeProcesses.ok)
    throw new Error(`HTTP error! status: ${coffeeProcesses.status}`);

  res.status(200).json(coffeeProcesses.rows);
};

export { getAllProcesses };
