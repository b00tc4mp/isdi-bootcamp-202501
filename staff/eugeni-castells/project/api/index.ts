import "dotenv/config";
import express from "express";
import cors from "cors";

const { MONGO_URI, MONGO_DB_APP } = process.env;

const api = express();

api.use(cors());
