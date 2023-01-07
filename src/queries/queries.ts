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
  'SELECT coffee.coffee_name AS "Name", coffee.single_origin AS "Single origin", coffee.price AS "Price", coffee.roaster AS "Roaster", roast_levels.roast_level AS "Roast level", processes.process_name AS "Process", origin.country AS "Country", coffee.notes AS "Notes" FROM coffee_user INNER JOIN coffee ON coffee_user.id = coffee.user_id INNER JOIN roast_levels ON roast_levels.id = coffee.roast_level_id INNER JOIN processes ON processes.id = coffee.process_id INNER JOIN origin ON origin.id = coffee.origin_id WHERE coffee_user.id = $1;';
const queryGetASingleCoffee = 'SELECT * FROM coffee WHERE id = $1;';
const queryAddANewCoffee =
  'INSERT INTO coffee (coffee_name, single_origin, price, farmer_id, origin_id, roaster, process_id, roast_level_id, user_id) values( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
const queryDeleteACoffee = 'DELETE FROM COFFEE WHERE id = $1;';
const queryUpdateCoffeeName =
  'UPDATE coffee SET coffee_name = $1 WHERE id = $2;';
const queryUpdateSingleOrigin =
  'UPDATE coffee SET single_origin = $1 WHERE id = $2;';
const queryUpdateRoast = 'UPDATE coffee SET roast_level_id = $1 WHERE id = $2;';
const queryUpdateProcess = 'UPDATE coffee SET process_id = $1 WHERE id = $2;';
const queryUpdatePrice = 'UPDATE coffee SET price = $1 WHERE id = $2;';
const queryUpdateFarmer = 'UPDATE coffee SET farmer_id = $1 WHERE id = $2;';
const queryUpdateOrigin = 'UPDATE coffee SET origin_id = $1 WHERE id = $2;';
const queryUpdateRoaster = 'UPDATE coffee SET roaster = $1 WHERE id = $2;';

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
  queryGetASingleCoffee,
  queryGetAllUsersCoffees,
  queryUpdateFarmer,
  queryUpdateOrigin,
  queryUpdatePrice,
  queryUpdateProcess,
  queryUpdateRoast,
  queryUpdateRoaster,
  queryUpdateSingleOrigin,
  queryUpdateCoffeeName,
  queryGetAllOrigins,
  queryGetSingleOrigin,
  queryGetAllProcesses,
  queryGetAllRoastLevels
};
