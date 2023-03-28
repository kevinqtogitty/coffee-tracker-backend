import pool from '../db';
import { Request, Response } from 'express';
import { queryGetAllOrigins, queryGetSingleOrigin } from '../queries/queries';
import { client, expiration } from '..';

const getAllOrigins = async (req: Request, res: Response) => {
  try {
    // Check if we have it cached
    const cachedOrigins = await client.get('origins');
    if (!cachedOrigins) {
      // If it doesnt exist, get it from the db, and cache it
      const origins = await pool.query(`${queryGetAllOrigins}`);
      await client.setEx('origins', expiration, JSON.stringify(origins.rows));
      console.log('Not cached yet');
      res.status(200).json(origins.rows);
    } else {
      // If it already exists
      res.status(200).json(JSON.parse(cachedOrigins));
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleOrigin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cachedSingleOrigin = await client.get('singleOrigin');
    if (!cachedSingleOrigin) {
      const origin = await pool.query(`${queryGetSingleOrigin}`, [id]);
      await client.setEx(
        'singleOrigin',
        expiration,
        JSON.stringify(origin.rows[0])
      );
      res.status(200).json(origin.rows[0]);
    } else {
      res.status(200).json(cachedSingleOrigin);
    }
  } catch (error) {
    console.log(error);
  }
};

export { getAllOrigins, getSingleOrigin };
