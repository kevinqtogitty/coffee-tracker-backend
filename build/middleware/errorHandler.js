"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    res.status(500).send('ERRROOOORRR');
};
exports.default = errorHandler;
