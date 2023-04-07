"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoffeeData = exports.deleteACoffee = exports.addANewCoffee = exports.getASingleCoffee = exports.getAllCoffees = void 0;
const db_1 = __importDefault(require("../db"));
const queries_1 = require("../queries/queries");
const __1 = require("..");
const getAllCoffees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const cachedUsersCoffees = yield __1.client.get('usersCoffees');
        if (!cachedUsersCoffees) {
            const usersCoffees = yield db_1.default.query(`${queries_1.queryGetAllUsersCoffees}`, [
                userId
            ]);
            yield __1.client.setEx('cachedUsersCoffees', __1.expiration, JSON.stringify(usersCoffees.rows));
            res.status(200).json(usersCoffees.rows);
        }
        else {
            res.status(200).json(JSON.parse(cachedUsersCoffees));
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCoffees = getAllCoffees;
const getASingleCoffee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here');
    const { id } = req.params;
    const data = yield db_1.default.query(`${queries_1.queryGetASingleCoffee}`, [id]);
    res.status(200).json(data.rows[0]);
    // try {
    //   // check if id matches the one cached, if so return the requested coffee data
    //   let cachedSingleCoffee = await client.HGETALL(`singleCoffee-${id}`);
    //   if (!cachedSingleCoffee) {
    //     const coffee = data.rows[0];
    //     await client.HSET(`singleCoffee-${id}`, {
    //       id: coffee.id,
    //       coffee_name: coffee.coffee_name,
    //       single_origin: coffee.single_origin,
    //       origin_id: coffee.origin_id,
    //       roaster: coffee.roaster,
    //       process_id: coffee.process_id,
    //       roast_level_id: coffee.roast_level_id,
    //       user_id: coffee.user_id,
    //       notes: coffee.notes,
    //       tstz: coffee.tstz
    //     });
    //     res.status(200).json(coffee);
    //   } else {
    //     res.status(200).json(cachedSingleCoffee);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
});
exports.getASingleCoffee = getASingleCoffee;
const addANewCoffee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { userId } = req.params;
    data.price = parseInt(data.price);
    const newCoffee = yield db_1.default.query(`${queries_1.queryAddANewCoffee}`, [
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
    res.json(newCoffee.rows[0]);
});
exports.addANewCoffee = addANewCoffee;
const deleteACoffee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedCoffee = yield db_1.default.query(`${queries_1.queryDeleteACoffee}`, [id]);
    if (!deletedCoffee.ok)
        throw new Error(`HTTP error! status: ${deletedCoffee.status}`);
    res.status(200).json(deletedCoffee);
});
exports.deleteACoffee = deleteACoffee;
const updateCoffeeData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    data.price = parseInt(data.price);
    const updatedCoffee = yield db_1.default.query(`${queries_1.queryUpdateCoffee}`, [
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
});
exports.updateCoffeeData = updateCoffeeData;
