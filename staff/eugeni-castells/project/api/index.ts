import "dotenv/config";
import express from "express";
import cors from "cors";
import { data } from "./data";
import { userRouter, vanRouter } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import loggers from "./loggers/index";
import { tripRouter } from "./routes/trips";
import { chatRouter } from "./routes/chats";

const { MONGO_URI, MONGO_DB_APP } = process.env;

const { morganMiddleware } = loggers;

data
  .connect(MONGO_URI!, MONGO_DB_APP!)
  .catch((error) => {
    process.on("exit", () => {
      console.error(error);

      process.exit(1);
    });
  })
  .then(() => {
    const api = express();

    api.disable("x-powered-by");

    const PORT = process.env.PORT || 7500;

    api.use(morganMiddleware);

    api.use(cors());

    api.use("/users", userRouter);

    api.use("/vans", vanRouter);

    api.use("/trips", tripRouter);

    api.use("/chats", chatRouter);

    api.use(errorHandler);

    api.listen(PORT, () => {
      console.log(`listening in port ${PORT}`);
    });
  });
