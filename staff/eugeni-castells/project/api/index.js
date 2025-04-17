"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const routes_1 = require("./routes");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const index_1 = __importDefault(require("./loggers/index"));
const { MONGO_URI, MONGO_DB_APP } = process.env;
const { morganMiddleware } = index_1.default;
data_1.data
    .connect(MONGO_URI, MONGO_DB_APP)
    .catch((error) => {
    process.on("exit", () => {
        console.error(error);
        process.exit(1);
    });
})
    .then(() => {
    const api = (0, express_1.default)();
    api.disable("x-powered-by");
    const PORT = process.env.PORT || 7500;
    api.use(morganMiddleware);
    api.use((0, cors_1.default)());
    api.use("/users", routes_1.userRouter);
    api.use("/vans", routes_1.vanRouter);
    api.use(errorHandler_1.default);
    api.listen(PORT, () => {
        console.log(`listening in port ${PORT}`);
    });
});
