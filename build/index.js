"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiration = exports.client = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const coffeeRoutes_1 = __importDefault(require("./routes/coffeeRoutes"));
const originsRoutes_1 = __importDefault(require("./routes/originsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const processesRoutes_1 = __importDefault(require("./routes/processesRoutes"));
const roastLevelRoutes_1 = __importDefault(require("./routes/roastLevelRoutes"));
exports.client = redis_1.createClient();
exports.expiration = 3600;
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/roastLevels', roastLevelRoutes_1.default);
app.use('/processes', processesRoutes_1.default);
app.use('/origins', originsRoutes_1.default);
app.use('/coffee', coffeeRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use(errorHandler_1.default);
app.listen('3001', () => {
    console.log('Server Running!');
});
exports.client.connect().then(() => {
    console.log('connected');
});
exports.client.on('error', (err) => {
    console.log('Error ' + err);
});
