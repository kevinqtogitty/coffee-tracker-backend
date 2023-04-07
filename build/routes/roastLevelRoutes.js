"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roastLevelController_1 = require("../controllers/roastLevelController");
const tryCatch_1 = require("../utils/tryCatch");
const roastLevelRouter = express_1.Router();
roastLevelRouter.get('/', tryCatch_1.tryCatch(roastLevelController_1.getAllRoastLevels));
exports.default = roastLevelRouter;
