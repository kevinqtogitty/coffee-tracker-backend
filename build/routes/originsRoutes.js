"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const originsController_1 = require("../controllers/originsController");
const tryCatch_1 = require("../utils/tryCatch");
const originsRouter = express_1.Router();
originsRouter.get('/', tryCatch_1.tryCatch(originsController_1.getAllOrigins));
originsRouter.get('/:id', tryCatch_1.tryCatch(originsController_1.getSingleOrigin));
exports.default = originsRouter;
