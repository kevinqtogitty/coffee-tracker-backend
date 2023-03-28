import pool from '../db';
import { Response, Request } from 'express';
import {
  queryAddANewCoffee,
  queryDeleteACoffee,
  queryGetAllUsersCoffees,
  queryGetASingleCoffee,
  queryUpdateCoffee
} from '../queries/queries';
import { client, expiration } from '..';

const getAllCoffees = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const cachedUsersCoffees = await client.get('usersCoffees');
    if (!cachedUsersCoffees) {
      const usersCoffees = await pool.query(`${queryGetAllUsersCoffees}`, [
        userId
      ]);
      await client.setEx('cachedUsersCoffees', expiration, usersCoffees.rows);
      res.status(200).json(usersCoffees.rows);
    } else {
      res.status(200).json(JSON.parse(cachedUsersCoffees));
    }
  } catch (error) {
    console.log(error);
  }
};

const getASingleCoffee = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // check if id matches the one cached, if so return the requested coffee data
    // let cachedSingleCoffee = await client.get('singleCoffee')
    // if(cachedSingleCoffee) {
    //   cachedSingleCoffee = JSON.parse(cachedSingleCoffee)
    // }
    const coffee = await pool.query(`${queryGetASingleCoffee}`, [id]);

    res.status(200).json(coffee.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const addANewCoffee = async (req: Request, res: Response) => {
  const data = req.body;
  const { userId } = req.params;
  data.price = parseInt(data.price);

  const newCoffee = await pool.query(`${queryAddANewCoffee}`, [
    data.name,
    data.singleOrigin,
    data.price,
    data.farmer,
    data.country,
    data.roaster,
    data.process,
    data.roastLevel,
    data.notes,
    userId
  ]);

  // if (!newCoffee.ok) throw new Error(`HTTP error! status: ${newCoffee.status}`);

  res.json(newCoffee.rows[0]);
};

const deleteACoffee = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCoffee = await pool.query(`${queryDeleteACoffee}`, [id]);

  if (!deletedCoffee.ok)
    throw new Error(`HTTP error! status: ${deletedCoffee.status}`);

  res.status(200).json(deletedCoffee);
};

const updateCoffeeData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  data.price = parseInt(data.price);

  const updatedCoffee = await pool.query(`${queryUpdateCoffee}`, [
    data.name,
    data.singleOrigin,
    data.price,
    data.farmer,
    data.country,
    data.roaster,
    data.process,
    data.roastLevel,
    data.notes,
    id
  ]);

  res.status(200).json(updatedCoffee);
};

export {
  getAllCoffees,
  getASingleCoffee,
  addANewCoffee,
  deleteACoffee,
  updateCoffeeData
};
