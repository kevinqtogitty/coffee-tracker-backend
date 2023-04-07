"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT
});
exports.default = pool;
