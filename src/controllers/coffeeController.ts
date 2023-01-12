import pool from '../db';
import { Response, Request } from 'express';
import { CoffeeObject, UpdateCoffeeObject } from '../types/interfaces';
import {
  queryAddANewCoffee,
  queryDeleteACoffee,
  queryGetAllUsersCoffees,
  queryGetASingleCoffee,
  queryUpdateCoffee
} from '../queries/queries';

const getAllCoffees = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const usersCoffees = await pool.query(`${queryGetAllUsersCoffees}`, [userId]);

  res.status(200).json(usersCoffees.rows);
};

const getASingleCoffee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const coffee = await pool.query(`${queryGetASingleCoffee}`, [id]);

  if (!coffee.ok) throw new Error(`HTTP error! status: ${coffee.status}`);

  res.status(200).json(coffee.rows[0]);
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
    data.purchaseDate,
    userId
  ]);

  if (!newCoffee.ok) throw new Error(`HTTP error! status: ${newCoffee.status}`);

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
    data.purchaseDate,
    id
  ]);

  if (!updatedCoffee.ok)
    throw new Error(`HTTP error! status: ${updatedCoffee.status}`);

  res.status(200).json(updatedCoffee);
};

export {
  getAllCoffees,
  getASingleCoffee,
  addANewCoffee,
  deleteACoffee,
  updateCoffeeData
};
