import pool from '../db';
import { Response, Request } from 'express';
import { queryGetAllProcesses } from '../queries/queries';
import { client, expiration } from '..';

const getAllProcesses = async (req: Request, res: Response) => {
  try {
    const cachedProcesses = await client.get('processes');
    if (!cachedProcesses) {
      const coffeeProcesses = await pool.query(`${queryGetAllProcesses}`);
      await client.setEx(
        'processes',
        expiration,
        JSON.stringify(coffeeProcesses.rows)
      );
      res.status(200).json(coffeeProcesses.rows);
    } else {
      res.status(200).json(JSON.parse(cachedProcesses));
    }
  } catch (error) {
    console.log(error);
  }
};

export { getAllProcesses };
