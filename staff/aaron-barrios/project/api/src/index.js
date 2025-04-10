"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
// import registerUserHandler from './handlers/registerUserHandler.js'
const errorHandler_js_1 = __importDefault(require("./middlewares/errorHandler.js"));
const index_js_1 = __importDefault(require("./logs/index.js"));
// import validationHandler from './middlewares/validationHandler.js'
// import {
//     registerUserSchema
// } from './data/schemas/zodSchemas.js'
const index_js_2 = require("./data/index.js");
const { morganMiddleware } = index_js_1.default;
const { MONGO_URI, MONGO_DB_NAME } = process.env;
index_js_2.data.connect(MONGO_URI, MONGO_DB_NAME)
    .catch(error => {
    process.on('exit', () => {
        console.error(error.message);
        process.exit(1);
    });
})
    .then(() => {
    const api = (0, express_1.default)();
    api.disable('x-powered-by'); //-> que era esto?
    const PORT = process.env.PORT || 7500;
    api.use(morganMiddleware);
    // const jsonBodyParser = json()
    // api.get('/', (req, res) => res.send('Hello, API!'))
    api.get("/ping", (_req, res) => {
        res.json({ message: "pong 🏓" });
    });
    api.use(errorHandler_js_1.default);
    api.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
