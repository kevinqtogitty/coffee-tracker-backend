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
exports.getSingleOrigin = exports.getAllOrigins = void 0;
const db_1 = __importDefault(require("../db"));
const queries_1 = require("../queries/queries");
const __1 = require("..");
const getAllOrigins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if we have it cached
        const cachedOrigins = yield __1.client.get('origins');
        if (!cachedOrigins) {
            // If it doesnt exist, get it from the db, and cache it
            const origins = yield db_1.default.query(`${queries_1.queryGetAllOrigins}`);
            yield __1.client.setEx('origins', __1.expiration, JSON.stringify(origins.rows));
            console.log('Not cached yet');
            res.status(200).json(origins.rows);
        }
        else {
            // If it already exists
            res.status(200).json(JSON.parse(cachedOrigins));
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllOrigins = getAllOrigins;
const getSingleOrigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cachedSingleOrigin = yield __1.client.get('singleOrigin');
        if (!cachedSingleOrigin) {
            const origin = yield db_1.default.query(`${queries_1.queryGetSingleOrigin}`, [id]);
            yield __1.client.setEx('singleOrigin', __1.expiration, JSON.stringify(origin.rows[0]));
            res.status(200).json(origin.rows[0]);
        }
        else {
            res.status(200).json(cachedSingleOrigin);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleOrigin = getSingleOrigin;
