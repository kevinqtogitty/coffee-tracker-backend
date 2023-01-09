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
  res.status(200).json(coffee.rows[0]);
};

const addANewCoffee = async (req: Request, res: Response) => {
  const data: CoffeeObject = req.body;
  const newCoffee = await pool.query(`${queryAddANewCoffee}`, [
    data.coffee_name,
    data.single_origin,
    data.price,
    data.farmer_id ? data.farmer_id : null,
    data.origin_id,
    data.roaster,
    data.process_id,
    data.roast_level_id,
    data.user_id
  ]);
  res.json(newCoffee.rows[0]);
};

const deleteACoffee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCoffee = await pool.query(`${queryDeleteACoffee}`, [id]);
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
  res.status(200).json(updatedCoffee);
};

export {
  getAllCoffees,
  getASingleCoffee,
  addANewCoffee,
  deleteACoffee,
  updateCoffeeData
};
