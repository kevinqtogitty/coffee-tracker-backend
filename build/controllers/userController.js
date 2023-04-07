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
exports.createAUser = exports.deleteASingleUser = exports.updateUserData = exports.getASingleUser = void 0;
const db_1 = __importDefault(require("../db"));
const queries_1 = require("../queries/queries");
const __1 = require("..");
const createAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, userId, email } = req.body;
    const userCreated = yield db_1.default.query(`${queries_1.queryCreateAUser}`, [
        userId,
        firstName,
        lastName,
        email
    ]);
    res.status(201).json(userCreated);
});
exports.createAUser = createAUser;
const getASingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const cachedUser = yield __1.client.get('currentUser');
        if (!cachedUser) {
            const user = yield db_1.default.query(`${queries_1.queryGetASingleUser}`, [userId]);
            yield __1.client.setEx('currentUser', __1.expiration, JSON.stringify(user.rows[0]));
            res.status(200).json(user.rows[0]);
        }
        else {
            res.status(200).json(JSON.parse(cachedUser));
        }
    }
    catch (error) { }
});
exports.getASingleUser = getASingleUser;
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = req.body;
    const updatedUser = yield db_1.default.query(`${queries_1.queryUpdateUserData}`, [
        data.firstName,
        data.lastName,
        data.email,
        userId
    ]);
    res.status(200).send(updatedUser);
});
exports.updateUserData = updateUserData;
const deleteASingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const userDeleted = yield db_1.default.query(`${queries_1.queryDeleteAUser}`, [userId]);
    res.status(200).json(userDeleted);
});
exports.deleteASingleUser = deleteASingleUser;
