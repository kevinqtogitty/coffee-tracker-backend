"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const processesController_1 = require("../controllers/processesController");
const tryCatch_1 = require("../utils/tryCatch");
const processesRouter = express_1.Router();
processesRouter.get('/', tryCatch_1.tryCatch(processesController_1.getAllProcesses));
exports.default = processesRouter;
