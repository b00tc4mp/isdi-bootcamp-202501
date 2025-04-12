"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const users_1 = require("./routes/users");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const { MONGO_URI, MONGO_DB_APP } = process.env;
data_1.data
    .connect(MONGO_URI, MONGO_DB_APP)
    .then(() => {
    const api = (0, express_1.default)();
    api.disable("x-powered-by");
    const PORT = process.env.PORT || 7500;
    api.use((0, cors_1.default)());
    api.use("/users", users_1.userRouter);
    api.use(errorHandler_1.default);
    api.listen(PORT, () => {
        console.log(`listening in port ${PORT}`);
    });
})
    .catch((error) => {
    process.on("exit", () => {
        console.error(error);
        process.exit(1);
    });
});
