import pool from '../db';
import { Response, Request } from 'express';
import { CoffeeObject, UpdateCoffeeObject } from '../types/interfaces';

const getAllCoffees = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const usersCoffees = await pool.query(
    'SELECT * FROM coffee WHERE user_id = $1;',
    [userId]
  );
  res.status(200).json(usersCoffees.rows);
};

const getASingleCoffee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const coffee = await pool.query('SELECT * FROM coffee WHERE id = $1;', [id]);
  res.status(200).json(coffee.rows[0]);
};

const addANewCoffee = async (req: Request, res: Response) => {
  const data: CoffeeObject = req.body;
  const newCoffee = await pool.query(
    'INSERT INTO coffee (coffee_name, single_origin, price, farmer_id, origin_id, roaster, process_id, roast_level_id, user_id) values( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      data.coffee_name,
      data.single_origin,
      data.price,
      data.farmer_id ? data.farmer_id : null,
      data.origin_id,
      data.roaster,
      data.process_id,
      data.roast_level_id,
      data.user_id
    ]
  );
  res.json(newCoffee.rows[0]);
};

const deleteACoffee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCoffee = await pool.query('DELETE FROM COFFEE WHERE id = $1', [
    id
  ]);
  res.status(200).json(deletedCoffee);
};

const updateCoffeeData = async (req: Request, res: Response) => {
  const { id, type } = req.params;
  const data: UpdateCoffeeObject = req.body;
  let updated;
  console.log(data);
  switch (type) {
    case 'name':
      updated = await pool.query(
        'UPDATE coffee SET coffee_name = $1 WHERE id = $2',
        [data.newName, id]
      );
      break;
    case 'singleOrigin':
      updated = await pool.query(
        'UPDATE coffee SET single_origin = $1 WHERE id = $2',
        [data.newSingleOrigin, id]
      );
      break;
    case 'roast':
      updated = await pool.query(
        'UPDATE coffee SET roast_level_id = $1 WHERE id = $2',
        [data.newRoastLevel, id]
      );
      break;
    case 'process':
      updated = await pool.query(
        'UPDATE coffee SET process_id = $1 WHERE id = $2',
        [data.newProcess, id]
      );
      break;
    case 'price':
      updated = await pool.query('UPDATE coffee SET price = $1 WHERE id = $2', [
        data.newPrice,
        id
      ]);
      break;
    case 'farmer':
      updated = await pool.query(
        'UPDATE coffee SET farmer_id = $1 WHERE id = $2',
        [data.newFarmer, id]
      );
      break;
    case 'origin':
      updated = await pool.query(
        'UPDATE coffee SET origin_id = $1 WHERE id = $2',
        [data.newOrigin, id]
      );
      break;
    case 'roaster':
      updated = await pool.query(
        'UPDATE coffee SET roaster = $1 WHERE id = $2',
        [data.newRoaster, id]
      );
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
