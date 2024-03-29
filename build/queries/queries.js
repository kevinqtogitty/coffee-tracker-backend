"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryUpdateUserData = exports.queryGetAllRoastLevels = exports.queryGetAllProcesses = exports.queryGetSingleOrigin = exports.queryGetAllOrigins = exports.queryGetAllUsersCoffees = exports.queryGetASingleCoffee = exports.queryUpdateCoffee = exports.queryDeleteACoffee = exports.queryAddANewCoffee = exports.queryGetASingleUser = exports.queryDeleteAUser = exports.queryGetAllUsers = exports.queryCreateAUser = void 0;
// USER queries
const queryCreateAUser = 'INSERT INTO coffee_user (id, first_name, last_name, email) VALUES ($1, $2, $3, $4);';
exports.queryCreateAUser = queryCreateAUser;
const queryGetAllUsers = 'SELECT * FROM coffee_user;';
exports.queryGetAllUsers = queryGetAllUsers;
const queryGetASingleUser = 'SELECT * FROM coffee_user WHERE id = $1;';
exports.queryGetASingleUser = queryGetASingleUser;
const queryUpdateUserData = 'UPDATE coffee_user SET first_name = $1, last_name = $2, email = $3 WHERE id = $4';
exports.queryUpdateUserData = queryUpdateUserData;
const queryDeleteAUser = 'DELETE FROM coffee_user WHERE id = $1 RETURN *;';
exports.queryDeleteAUser = queryDeleteAUser;
// COFFEE queries
const queryGetAllUsersCoffees = 'SELECT coffee.id, coffee.tstz AS "timestamp", coffee.coffee_name AS "name", coffee.single_origin AS "singleOrigin", coffee.price AS "price", coffee.roaster AS "roaster", roast_levels.roast_level AS "roastLevel", processes.process_name AS "process", origin.country AS "country", coffee.notes AS "notes" FROM coffee_user INNER JOIN coffee ON coffee_user.id = coffee.user_id INNER JOIN roast_levels ON roast_levels.id = coffee.roast_level_id INNER JOIN processes ON processes.id = coffee.process_id INNER JOIN origin ON origin.id = coffee.origin_id WHERE coffee_user.id = $1 ORDER BY timestamp DESC;';
exports.queryGetAllUsersCoffees = queryGetAllUsersCoffees;
const queryGetASingleCoffee = 'SELECT * FROM coffee WHERE id = $1;';
exports.queryGetASingleCoffee = queryGetASingleCoffee;
const queryAddANewCoffee = 'INSERT INTO coffee (coffee_name, single_origin, price, farmer_id, origin_id, roaster, process_id, roast_level_id, notes, user_id, tstz) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP);';
exports.queryAddANewCoffee = queryAddANewCoffee;
const queryDeleteACoffee = 'DELETE FROM COFFEE WHERE id = $1;';
exports.queryDeleteACoffee = queryDeleteACoffee;
const queryUpdateCoffee = 'UPDATE coffee SET coffee_name = $1, single_origin = $2, price = $3, farmer_id = $4, origin_id = $5, roaster = $6, process_id = $7, roast_level_id = $8, notes = $9 WHERE id = $10';
exports.queryUpdateCoffee = queryUpdateCoffee;
// ORIGIN queries
const queryGetAllOrigins = 'SELECT * FROM origin;';
exports.queryGetAllOrigins = queryGetAllOrigins;
const queryGetSingleOrigin = 'SELECT * FROM origin WHERE id = $1;';
exports.queryGetSingleOrigin = queryGetSingleOrigin;
// PROCESSES queries
const queryGetAllProcesses = 'SELECT * FROM processes;';
exports.queryGetAllProcesses = queryGetAllProcesses;
// ROAST LEVEL queries
const queryGetAllRoastLevels = 'SELECT * FROM roast_levels;';
exports.queryGetAllRoastLevels = queryGetAllRoastLevels;
