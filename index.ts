import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application, Response } from "express";
import { dbConnect } from "./databse/init";

configDotenv();
await dbConnect();

const app: Application = express();
app.use(cors());
app.use(express.json());

const port = 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));

app.get('/', (_req, res: Response) => { res.status(200).json({ message: 'OK' }) });
