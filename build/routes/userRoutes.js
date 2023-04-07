"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const tryCatch_1 = require("../utils/tryCatch");
const userRouter = express_1.Router();
userRouter.post('/', tryCatch_1.tryCatch(userController_1.createAUser)); // create a user
userRouter.get('/:userId', tryCatch_1.tryCatch(userController_1.getASingleUser)); // get single user
userRouter.put('/:userId', tryCatch_1.tryCatch(userController_1.updateUserData)); // update user data
userRouter.delete('/:userId', tryCatch_1.tryCatch(userController_1.deleteASingleUser)); // delete single user
exports.default = userRouter;
