import "dotenv/config";
import { data } from "./data/index.js";
import express from "express";
import cors from "cors";
import { errorHandler } from "./handlers/index.js";
import { users, posts } from "./routes/index.js";

const { PORT, MONGO_URL, MONGO_DB } = process.env;

data
  .connect(MONGO_URL, MONGO_DB)
  .catch((error) => console.error(error))
  .then(() => {
    const api = express();

    api.use(cors());

    api.use("/users", users);
    api.use("/posts", posts);

    api.use(errorHandler);

    api.listen(PORT, () => console.log(`api listening in port ${PORT}`));
  });
