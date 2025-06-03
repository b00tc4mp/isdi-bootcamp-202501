"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, printf, colorize, json } = winston_1.default.format;
const { LOG_LEVEL } = process.env;
const logger = winston_1.default.createLogger({
    level: LOG_LEVEL || "info",
    format: combine(timestamp({
        format: "DD-MM-YYYY hh:mm:ss.SSS A",
    }), printf((info) => {
        const name = info.name || "";
        return `[${info.timestamp}] ${info.level}: ${name} ${info.message}`;
    })),
    transports: [
        new winston_1.default.transports.Console({
            format: colorize({ all: true }),
        }),
        new winston_1.default.transports.File({
            format: json(),
            filename: "./logs/logs.json",
        }),
    ],
});
const morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", {
    stream: {
        write: (message) => logger.http(`[HTTP Request] ${message.trim()}`),
    },
});
const loggers = {
    logger,
    morganMiddleware,
};
exports.default = loggers;
