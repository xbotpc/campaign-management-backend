import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application } from "express";
import { dbConnect } from "./database/init";
import { router } from "./endpoints";

configDotenv();
await dbConnect();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));