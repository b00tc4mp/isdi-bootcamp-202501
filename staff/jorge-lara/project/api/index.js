import "dotenv/config";
import express from 'express';
import cors from 'cors';

import { users } from './routes/index.js'
import { data } from "./data/index.js";

const { PORT, MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
  .catch(console.error)
  .then(() => {
    const api = express();

    api.use(cors());

    api.use("/users", users);

    api.listen(PORT, () => console.log(`API running on post ${PORT}`));
  });
