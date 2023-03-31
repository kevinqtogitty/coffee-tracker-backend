import pool from '../db';
import { Response, Request } from 'express';
import { queryGetAllRoastLevels } from '../queries/queries';
import { client, expiration } from '..';

const getAllRoastLevels = async (req: Request, res: Response) => {
  try {
    const cachedRoastLevels = await client.get('roastLevels');
    if (!cachedRoastLevels) {
      const roastLevels = await pool.query(`${queryGetAllRoastLevels}`);
      await client.setEx(
        'roastLevels',
        expiration,
        JSON.stringify(roastLevels.rows)
      );
      res.status(200).json(roastLevels.rows);
    } else {
      res.status(200).json(JSON.parse(cachedRoastLevels));
    }
  } catch (error) {
    console.log(error);
  }
};

export { getAllRoastLevels };
