import "dotenv/config";
import express from "express";
import cors from "cors";
import { data } from "./data";
import { userRouter } from "./routes/users";
import errorHandler from "./middlewares/errorHandler";

const { MONGO_URI, MONGO_DB_APP } = process.env;

data
  .connect(MONGO_URI!, MONGO_DB_APP!)
  .then(() => {
    const api = express();

    api.disable("x-powered-by");

    const PORT = process.env.PORT || 7500;

    api.use(cors());

    api.use("/users", userRouter);

    api.use(errorHandler);

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
