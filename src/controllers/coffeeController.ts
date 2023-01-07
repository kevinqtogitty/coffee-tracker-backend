import pool from '../db';
import { Response, Request } from 'express';
import { CoffeeObject, UpdateCoffeeObject } from '../types/interfaces';
import {
  queryAddANewCoffee,
  queryDeleteACoffee,
  queryGetAllUsersCoffees,
  queryGetASingleCoffee,
  queryUpdateCoffeeName,
  queryUpdateFarmer,
  queryUpdateOrigin,
  queryUpdatePrice,
  queryUpdateProcess,
  queryUpdateRoast,
  queryUpdateSingleOrigin
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
  const { id, type } = req.params;
  const data: UpdateCoffeeObject = req.body;
  let updated;
  console.log(data);
  switch (type) {
    case 'name':
      updated = await pool.query(`${queryUpdateCoffeeName}`, [
        data.newName,
        id
      ]);
      break;
    case 'singleOrigin':
      updated = await pool.query(`${queryUpdateSingleOrigin}`, [
        data.newSingleOrigin,
        id
      ]);
      break;
    case 'roast':
      updated = await pool.query(`${queryUpdateRoast}`, [
        data.newRoastLevel,
        id
      ]);
      break;
    case 'process':
      updated = await pool.query(`${queryUpdateProcess}`, [
        data.newProcess,
        id
      ]);
      break;
    case 'price':
      updated = await pool.query(`${queryUpdatePrice}`, [data.newPrice, id]);
      break;
    case 'farmer':
      updated = await pool.query(`${queryUpdateFarmer}`, [data.newFarmer, id]);
      break;
    case 'origin':
      updated = await pool.query(`${queryUpdateOrigin}`, [data.newOrigin, id]);
      break;
    case 'roaster':
      updated = await pool.query(`${queryUpdateRoast}`, [data.newRoaster, id]);
      break;
    default:
      break;
  }

  res.status(200).json(updated);
};

export {
  getAllCoffees,
  getASingleCoffee,
  addANewCoffee,
  deleteACoffee,
  updateCoffeeData
};
