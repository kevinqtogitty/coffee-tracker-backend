import pool from '../db';
import { Response, Request } from 'express';
import { queryGetAllRoastLevels } from '../queries/queries';

const getAllRoastLevels = async (req: Request, res: Response) => {
  const roastLevels = await pool.query(`${queryGetAllRoastLevels}`);

  res.status(200).json(roastLevels.rows);
};

export { getAllRoastLevels };
