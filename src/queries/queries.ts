// USER queries
const queryCreateAUser =
  'INSERT INTO coffee_user (id, first_name, last_name, email) VALUES ($1, $2, $3, $4);';
const queryGetAllUsers = 'SELECT * FROM coffee_user;';
const queryGetASingleUser = 'SELECT * FROM coffee_user WHERE id = $1;';
const queryUpdateUserEmail = 'UPDATE coffee_user SET email = $1 WHERE id = $2;';
const queryUpdateUserFirstName =
  'UPDATE coffee_user SET first_name = $1 WHERE id = $2;';
const queryUpdateUserLastName =
  'UPDATE coffee_user SET lastName = $1 WHERE id = $2;';
const queryDeleteAUser = 'DELETE FROM COFFEE WHERE id = $1 RETURN *;';

// COFFEE queries
const queryGetAllUsersCoffees =
  'SELECT coffee.id, coffee.coffee_name AS "name", coffee.single_origin AS "singleOrigin", coffee.price AS "price", coffee.roaster AS "roaster", roast_levels.roast_level AS "roastLevel", processes.process_name AS "process", origin.country AS "country", coffee.notes AS "notes" FROM coffee_user INNER JOIN coffee ON coffee_user.id = coffee.user_id INNER JOIN roast_levels ON roast_levels.id = coffee.roast_level_id INNER JOIN processes ON processes.id = coffee.process_id INNER JOIN origin ON origin.id = coffee.origin_id WHERE coffee_user.id = $1;';
const queryGetASingleCoffee = 'SELECT * FROM coffee WHERE id = $1;';
const queryAddANewCoffee =
  'INSERT INTO coffee (coffee_name, single_origin, price, farmer_id, origin_id, roaster, process_id, roast_level_id, notes, purchase_date, user_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
const queryDeleteACoffee = 'DELETE FROM COFFEE WHERE id = $1;';
const queryUpdateCoffee =
  'UPDATE coffee SET coffee_name = $1, single_origin = $2, price = $3, farmer_id = $4, origin_id = $5, roaster = $6, process_id = $7, roast_level_id = $8, notes = $9, purchase_date = $10 WHERE id = $11';

// ORIGIN queries
const queryGetAllOrigins = 'SELECT * FROM origin;';
const queryGetSingleOrigin = 'SELECT * FROM origin WHERE id = $1;';

// PROCESSES queries
const queryGetAllProcesses = 'SELECT * FROM processes;';

// ROAST LEVEL queries
const queryGetAllRoastLevels = 'SELECT * FROM roast_levels;';

export {
  queryCreateAUser,
  queryGetAllUsers,
  queryDeleteAUser,
  queryGetASingleUser,
  queryUpdateUserEmail,
  queryUpdateUserFirstName,
  queryUpdateUserLastName,
  queryAddANewCoffee,
  queryDeleteACoffee,
  queryUpdateCoffee,
  queryGetASingleCoffee,
  queryGetAllUsersCoffees,
  queryGetAllOrigins,
  queryGetSingleOrigin,
  queryGetAllProcesses,
  queryGetAllRoastLevels
};
