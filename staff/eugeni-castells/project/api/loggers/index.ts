import "dotenv/config";
import morgan from "morgan";
import winston from "winston";
const { combine, timestamp, printf, colorize, json } = winston.format;

const { LOG_LEVEL } = process.env;

const logger = winston.createLogger({
  level: LOG_LEVEL || "info",
  format: combine(
    timestamp({
      format: "DD-MM-YYYY hh:mm:ss.SSS A",
    }),
    printf((info) => {
      const name = info.name || "";
      return `[${info.timestamp}] ${info.level}: ${name} ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: colorize({ all: true }),
    }),
    new winston.transports.File({
      format: json(),
      filename: "./logs/logs.json",
    }),
  ],
});

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message: string) =>
        logger.http(`[HTTP Request] ${message.trim()}`),
    },
  }
);

const loggers = {
  logger,
  morganMiddleware,
};

export default loggers;
